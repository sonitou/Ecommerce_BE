import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import {
  CreatePermissionBodyType,
  GetPermissionsQueryType,
  GetPermissionsResType,
  PermissionType,
  UpdatePermissionBodyType,
} from './permission.model'

@Injectable()
export class PermissionRepo {
  constructor(private prismaService: PrismaService) {}

  async listRepo(pagination: GetPermissionsQueryType): Promise<GetPermissionsResType> {
    const skip = (pagination.page - 1) * pagination.limit
    const take = pagination.limit
    const [totalItems, data] = await Promise.all([
      this.prismaService.permission.count({
        where: {
          deletedAt: null,
        },
      }),
      this.prismaService.permission.findMany({
        where: {
          deletedAt: null,
        },
        skip,
        take,
      }),
    ])
    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    }
  }

  findById(id: number): Promise<PermissionType | null> {
    return this.prismaService.permission.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    })
  }

  createRepo({
    createdById,
    data,
  }: {
    createdById: number | null
    data: CreatePermissionBodyType
  }): Promise<PermissionType> {
    return this.prismaService.permission.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  updateRepo({
    id,
    data,
    updatedById,
  }: {
    id: number
    data: UpdatePermissionBodyType
    updatedById: number | null
  }): Promise<PermissionType> {
    return this.prismaService.permission.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...data,
        updatedById,
      },
    })
  }

  deleteRepo(
    {
      id,
      deletedById,
    }: {
      id: number
      deletedById: number
    },
    isHard?: boolean,
  ): Promise<PermissionType> {
    return isHard
      ? this.prismaService.permission.delete({
          where: {
            id,
          },
        })
      : this.prismaService.permission.update({
          where: {
            id,
            deletedAt: null,
          },
          data: {
            deletedAt: new Date(),
            deletedById,
          },
        })
  }
}
