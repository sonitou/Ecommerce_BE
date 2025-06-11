import { Injectable } from '@nestjs/common'
import { BrandTranslationRepo } from './brand-translation.repo'
import { NotFoundRecordException } from 'src/shared/error'
import { CreateBrandTranslationBodyType, UpdateBrandTranslationBodyType } from './brand-translation.model'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { BrandTranslationAlreadyExistsException } from './brand-translation.error'

@Injectable()
export class BrandTranslationService {
  constructor(private readonly brandTranslationRepo: BrandTranslationRepo) {}

  async findByIdBrandTranslationService(id: number) {
    const brandTranslation = await this.brandTranslationRepo.findByIdBrandTranslationRepo(id)
    if (!brandTranslation) {
      throw NotFoundRecordException
    }
    return brandTranslation
  }

  async createBrandTranslationService({
    createdById,
    data,
  }: {
    createdById: number
    data: CreateBrandTranslationBodyType
  }) {
    try {
      return await this.brandTranslationRepo.createBrandTranslationRepo({
        createdById,
        data,
      })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw BrandTranslationAlreadyExistsException
      }
      throw error
    }
  }

  async updateBrandTranslationService({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateBrandTranslationBodyType
  }) {
    try {
      const brandTranslation = await this.brandTranslationRepo.updateBrandTranslationRepo({
        id,
        updatedById,
        data,
      })
      return brandTranslation
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw BrandTranslationAlreadyExistsException
      }
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }

  async deleteBrandTranslationService({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.brandTranslationRepo.deleteBrandTranslationRepo({
        id,
        deletedById,
      })
      return { message: 'Brand translation deleted successfully' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }
}
