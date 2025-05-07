import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  CreatePermissionBodyDTO,
  GetPermissionDetailResDTO,
  GetPermissionParamsDTO,
  GetPermissionsQueryDTO,
  GetPermissionsResDTO,
  UpdatePermissionBodyDTO,
} from './permission.dto'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ZodSerializerDto(GetPermissionsResDTO)
  listPermission(@Query() query: GetPermissionsQueryDTO) {
    return this.permissionService.list({
      page: query.page,
      limit: query.limit,
    })
  }

  @Get(':permissionId')
  @ZodSerializerDto(GetPermissionDetailResDTO)
  findByIdPermission(@Param() params: GetPermissionParamsDTO) {
    return this.permissionService.findById(params.permissionId)
  }

  @Post()
  @ZodSerializerDto(GetPermissionDetailResDTO)
  createPermission(@Body() body: CreatePermissionBodyDTO, @ActiveUser('userId') userId: number) {
    return this.permissionService.create({
      data: body,
      createdById: userId,
    })
  }

  @Post(':permissionId')
  @ZodSerializerDto(GetPermissionDetailResDTO)
  updatePermission(
    @Body() body: UpdatePermissionBodyDTO,
    @Param() params: GetPermissionParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.permissionService.update({
      data: body,
      id: params.permissionId,
      updatedById: userId,
    })
  }

  @Post(':permissionId')
  @ZodSerializerDto(MessageResDTO)
  deletePermission(@Param() params: GetPermissionParamsDTO, @ActiveUser('userId') userId: number) {
    return this.permissionService.delete({
      id: params.permissionId,
      deletedById: userId,
    })
  }
}
