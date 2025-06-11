import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import {
  BrandTranslationType,
  CreateBrandTranslationBodyType,
  GetBrandTranslationDetailResType,
  UpdateBrandTranslationBodyType,
} from './brand-translation.model'

@Injectable()
export class BrandTranslationRepo {
  constructor(private readonly prismaService: PrismaService) {}

  findByIdBrandTranslationRepo(id: number): Promise<GetBrandTranslationDetailResType | null> {
    return this.prismaService.brandTranslation.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    })
  }

  createBrandTranslationRepo({
    createdById,
    data,
  }: {
    createdById: number
    data: CreateBrandTranslationBodyType
  }): Promise<BrandTranslationType> {
    return this.prismaService.brandTranslation.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  updateBrandTranslationRepo({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateBrandTranslationBodyType
  }): Promise<BrandTranslationType> {
    return this.prismaService.brandTranslation.update({
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

  deleteBrandTranslationRepo(
    {
      id,
      deletedById,
    }: {
      id: number
      deletedById: number
    },
    isHard?: boolean,
  ): Promise<BrandTranslationType> {
    return isHard
      ? this.prismaService.brandTranslation.delete({
          where: {
            id,
          },
        })
      : this.prismaService.brandTranslation.update({
          where: {
            id,
            deletedAt: null,
          },
          data: {
            deletedById,
            deletedAt: new Date(),
          },
        })
  }
}
