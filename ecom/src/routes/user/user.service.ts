import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserRepository } from './user.repo'
import { HashingService } from 'src/shared/services/hashing.service'
import { SharedUserRepository } from 'src/shared/repositories/shared-user-repo'
import { SharedRoleRepository } from 'src/shared/repositories/shared-role.repo'
import { CreateUserBodyType, GetUsersQueryType, UpdateUserBodyType } from './user.model'
import { NotFoundRecordException } from 'src/shared/error'
import { CannotUpdateOrDeleteYourselfException, RoleNotFoundException, UserAlreadyExistsException } from './user.error'
import {
  isForeignKeyConstraintPrismaError,
  isNotFoundPrismaError,
  isUniqueConstraintPrismaError,
} from 'src/shared/helpers'
import { RoleName } from 'src/shared/constants/role.constants'

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private hashingService: HashingService,
    private sharedUserRepository: SharedUserRepository,
    private sharedRoleRepository: SharedRoleRepository,
  ) {}

  listUsersService(pagination: GetUsersQueryType) {
    return this.userRepo.listUsersRepo(pagination)
  }

  async findByIdUserService(id: number) {
    const user = await this.sharedUserRepository.findUniqueIncludeRolePermissions({ id })
    if (!user) {
      throw NotFoundRecordException
    }
    return user
  }

  async createUserService({
    data,
    createdById,
    createdByRoleName,
  }: {
    data: CreateUserBodyType
    createdById: number
    createdByRoleName: string
  }) {
    try {
      // Chỉ có admin agent mới có quyền tạo user với role là admin
      await this.verifyRole({
        roleNameAgent: createdByRoleName,
        roleIdTarget: data.roleId,
      })
      // Hash the password
      const hashedPassword = await this.hashingService.hash(data.password)

      const user = await this.userRepo.createUserRepo({
        createdById,
        data: {
          ...data,
          password: hashedPassword,
        },
      })
      return user
    } catch (error) {
      if (isForeignKeyConstraintPrismaError(error)) {
        throw RoleNotFoundException
      }

      if (isUniqueConstraintPrismaError(error)) {
        throw UserAlreadyExistsException
      }
      throw error
    }
  }

  /**
   * Function này kiểm tra xem người thực hiện có quyền tác động đến người khác không.
   * Vì chỉ có người thực hiện là admin role mới có quyền sau: Tạo admin user, update roleId thành admin, xóa admin user.
   * Còn nếu không phải admin thì không được phép tác động đến admin
   */
  private async verifyRole({ roleNameAgent, roleIdTarget }) {
    // Agent là admin thì cho phép
    if (roleNameAgent === RoleName.Admin) {
      return true
    } else {
      // Agent không phải admin thì roleIdTarget phải khác admin
      const adminRoleId = await this.sharedRoleRepository.getAdminRoleId()
      if (roleIdTarget === adminRoleId) {
        throw new ForbiddenException()
      }
      return true
    }
  }

  async updateUserService({
    id,
    data,
    updatedById,
    updatedByRoleName,
  }: {
    id: number
    data: UpdateUserBodyType
    updatedById: number
    updatedByRoleName: string
  }) {
    try {
      // k thể truy cập vào chính mình
      this.verifyYourself({ userIdAgent: updatedById, userIdTarget: id })
      // Lấy roleId ban đầu của người được update để kiểm tra xem liệu người update có quyền update không
      // Không dùng data.roleId vì dữ liệu này có thể bị cố tình truyền sai
      const roleIdTarget = await this.getRoleIdByUserId(id)
      await this.verifyRole({
        roleNameAgent: updatedByRoleName,
        roleIdTarget,
      })
      // Hash the password
      const hashedPassword = await this.hashingService.hash(data.password)
      const updatedUser = await this.sharedUserRepository.update(
        { id },
        {
          ...data,
          updatedById,
          password: hashedPassword,
        },
      )
      return updatedUser
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      if (isForeignKeyConstraintPrismaError(error)) {
        throw RoleNotFoundException
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw UserAlreadyExistsException
      }
      throw error
    }
  }

  private async getRoleIdByUserId(userId: number) {
    const currentUser = await this.sharedUserRepository.findUnique({ id: userId })
    if (!currentUser) {
      throw NotFoundRecordException
    }
    return currentUser.roleId
  }

  private verifyYourself({ userIdAgent, userIdTarget }: { userIdAgent: number; userIdTarget: number }) {
    if (userIdAgent === userIdTarget) {
      throw CannotUpdateOrDeleteYourselfException
    }
  }

  async deleteUserService({
    id,
    deletedById,
    deletedByRoleName,
  }: {
    id: number
    deletedById: number
    deletedByRoleName: string
  }) {
    try {
      // k thể xoá chính mình
      this.verifyYourself({ userIdAgent: deletedById, userIdTarget: id })
      // Lấy roleId ban đầu của người được xóa để kiểm tra xem liệu người xóa có quyền xóa không
      const roleIdTarget = await this.getRoleIdByUserId(id)
      await this.verifyRole({
        roleNameAgent: deletedByRoleName,
        roleIdTarget,
      })
      await this.userRepo.deleteUserRepo({
        id,
        deletedById,
      })
      return { message: 'User deleted successfully' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }
}
