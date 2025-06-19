import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import {
  CreateProductTranslationBodyType,
  GetProductTranslationDetailResType,
  UpdateProductTranslationBodyType,
} from './product-translation.model'
import { ProductTranslationType } from 'src/shared/models/shared-product-translation.model'

@Injectable()
export class ProductTranslationRepo {
  constructor(private prismaService: PrismaService) {}
  findByIdProductTranslation(id: number): Promise<GetProductTranslationDetailResType | null> {
    return this.prismaService.productTranslation.findUnique({
      where: { id, deletedAt: null },
    })
  }

  createProductTranslation({
    createdById,
    data,
  }: {
    createdById: number
    data: CreateProductTranslationBodyType
  }): Promise<ProductTranslationType> {
    return this.prismaService.productTranslation.create({
      data: {
        ...data,
        createdById,
      },
    })
  }

  async updateProductTranslation({
    updatedById,
    id,
    data,
  }: {
    updatedById: number
    id: number
    data: UpdateProductTranslationBodyType
  }): Promise<ProductTranslationType> {
    return this.prismaService.productTranslation.update({
      where: { id, deletedAt: null },
      data: {
        ...data,
        updatedById,
      },
    })
  }

  deleteProductTranslation(
    { id, deletedById }: { id: number; deletedById: number },
    isHard?: boolean,
  ): Promise<ProductTranslationType> {
    return isHard
      ? this.prismaService.productTranslation.delete({
          where: { id, deletedAt: null },
        })
      : this.prismaService.productTranslation.update({
          where: { id, deletedAt: null },
          data: {
            deletedById,
            deletedAt: new Date(),
          },
        })
  }
}
