import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { RoleService } from './role.service'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  CreateRoleBodyDTO,
  CreateRoleResDTO,
  GetRoleDetailResDTO,
  GetRoleParamsDTO,
  GetRolesQueryDTO,
  GetRolesResDTO,
  UpdateRoleBodyDTO,
} from './role.dto'
import { isPublic } from 'src/shared/decorators/auth.decorators'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @isPublic()
  @ZodSerializerDto(GetRolesResDTO)
  listRoleController(@Query() query: GetRolesQueryDTO) {
    return this.roleService.listRoleService({
      page: query.page,
      limit: query.limit,
    })
  }

  @Get(':roleId')
  @isPublic()
  @ZodSerializerDto(GetRoleDetailResDTO)
  findByIdRoleController(@Param() params: GetRoleParamsDTO) {
    return this.roleService.findByIdRoleService(params.roleId)
  }

  @Post()
  @ZodSerializerDto(CreateRoleResDTO)
  createRoleController(@Body() body: CreateRoleBodyDTO, @ActiveUser('userId') userId: number) {
    return this.roleService.createRoleService({
      data: body,
      createdById: userId,
    })
  }

  @Put(':roleId')
  @ZodSerializerDto(GetRoleDetailResDTO)
  updateRoleController(
    @Param() params: GetRoleParamsDTO,
    @Body() body: UpdateRoleBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.roleService.updateRoleService({
      data: body,
      id: params.roleId,
      updatedById: userId,
    })
  }

  @Delete(':roleId')
  @ZodSerializerDto(MessageResDTO)
  deleteRoleController(@Param() params: GetRoleParamsDTO, @ActiveUser('userId') userId: number) {
    return this.roleService.deleteRoleService({
      id: params.roleId,
      deletedById: userId,
    })
  }
}
