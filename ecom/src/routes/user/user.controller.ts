import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  CreateUserBodyDTO,
  CreateUserResDTO,
  GetUsersParamsDTO,
  GetUsersQueryDTO,
  GetUsersResDTO,
  UpdateUserBodyDTO,
} from './user.dto'
import { GetUserProfileResDTO, UpdateProfileResDTO } from 'src/shared/dtos/shared-user.dto'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { ActiveRolePermissions } from 'src/shared/decorators/active-role-permissions.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ZodSerializerDto(GetUsersResDTO)
  listController(@Query() query: GetUsersQueryDTO) {
    return this.userService.listUsersService({
      page: query.page,
      limit: query.limit,
    })
  }

  @Get(':userId')
  @ZodSerializerDto(GetUserProfileResDTO)
  findByIdUserController(@Param() param: GetUsersParamsDTO) {
    return this.userService.findByIdUserService(param.userId)
  }

  @Post()
  @ZodSerializerDto(CreateUserResDTO)
  createUserController(
    @Body() body: CreateUserBodyDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.userService.createUserService({
      createdById: userId,
      data: body,
      createdByRoleName: roleName,
    })
  }

  @Put(':userId')
  @ZodSerializerDto(UpdateProfileResDTO)
  updateUserController(
    @Body() body: UpdateUserBodyDTO,
    @ActiveUser('userId') userId: number,
    @Param() param: GetUsersParamsDTO,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.userService.updateUserService({
      id: param.userId,
      data: body,
      updatedById: userId,
      updatedByRoleName: roleName,
    })
  }

  @Delete(':userId')
  @ZodSerializerDto(MessageResDTO)
  deleteController(
    @Param() param: GetUsersParamsDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.userService.deleteUserService({
      id: param.userId,
      deletedById: userId,
      deletedByRoleName: roleName,
    })
  }
}
