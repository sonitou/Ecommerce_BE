import { Injectable } from '@nestjs/common'
import { ProductTranslationRepo } from './product-translation.repo'
import { NotFoundRecordException } from 'src/shared/error'
import { CreateProductTranslationBodyType, UpdateProductTranslationBodyType } from './product-translation.model'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { ProductTranslationAlreadyExistsException } from './product-translation.error'

@Injectable()
export class ProductTranslationService {
  constructor(private productTranslationRepo: ProductTranslationRepo) {}

  async findByIdProductTranslation(id: number) {
    const productTranslation = await this.productTranslationRepo.findByIdProductTranslation(id)
    if (!productTranslation) {
      throw NotFoundRecordException
    }
    return productTranslation
  }

  async createProductTranslation({
    createdById,
    data,
  }: {
    createdById: number
    data: CreateProductTranslationBodyType
  }) {
    try {
      return await this.productTranslationRepo.createProductTranslation({
        createdById,
        data,
      })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw ProductTranslationAlreadyExistsException
      }
      throw error
    }
  }

  async updateProductTranslation({
    updatedById,
    id,
    data,
  }: {
    updatedById: number
    id: number
    data: UpdateProductTranslationBodyType
  }) {
    try {
      const productTranslation = await this.productTranslationRepo.updateProductTranslation({
        updatedById,
        id,
        data,
      })
      return productTranslation
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw ProductTranslationAlreadyExistsException
      }
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }

  async deleteProductTranslation({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.productTranslationRepo.deleteProductTranslation({ id, deletedById })
      return { message: 'Product translation deleted successfully' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }
}
