import { Inject, Injectable } from '@nestjs/common'
import { RoleRepo } from './role.repo'
import { CreateRoleBodyType, GetRolesQueryType, UpdateRoleBodyType } from './role.model'
import { NotFoundRecordException } from 'src/shared/error'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { ProhibitedActionOnBaseRoleException, RoleAlreadyExistsException } from './role.error'
import { RoleName } from 'src/shared/constants/role.constants'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class RoleService {
  constructor(
    private roleRepo: RoleRepo,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async listRoleService(pagination: GetRolesQueryType) {
    const data = await this.roleRepo.listRoleRepo(pagination)
    return data
  }

  async findByIdRoleService(id: number) {
    const role = await this.roleRepo.findByIdRoleRepo(id)
    if (!role) {
      throw NotFoundRecordException
    }
    return role
  }

  async createRoleService({ data, createdById }: { data: CreateRoleBodyType; createdById: number }) {
    try {
      const role = await this.roleRepo.createRoleRepo({
        createdById,
        data,
      })
      return role
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw RoleAlreadyExistsException
      }
      throw error
    }
  }

  /**
   * Kiểm tra xem role có phải là 1 trong 3 role cơ bản không
   */
  private async verifyRole(roleId: number) {
    const role = await this.roleRepo.findByIdRoleRepo(roleId)
    if (!role) {
      throw NotFoundRecordException
    }
    const baseRoles: string[] = [RoleName.Admin, RoleName.Client, RoleName.Seller]

    if (baseRoles.includes(role.name)) {
      throw ProhibitedActionOnBaseRoleException
    }
  }

  async updateRoleService({ data, id, updatedById }: { data: UpdateRoleBodyType; id: number; updatedById: number }) {
    try {
      await this.verifyRole(id)
      const updatedRole = await this.roleRepo.updateRoleRepo({
        id,
        updatedById,
        data,
      })
      // Xoá cache sau khi update thành công
      await this.cacheManager.del(`role${id}`)
      return updatedRole
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw RoleAlreadyExistsException
      }
      throw error
    }
  }

  async deleteRoleService({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.verifyRole(id)
      await this.roleRepo.deleteRoleRepo({
        id,
        deletedById,
      })
      // Xoá cache sau khi update thành công
      await this.cacheManager.del(`role${id}`)
      return { message: 'Delete role successfully' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }
}
