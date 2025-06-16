import { Injectable } from '@nestjs/common'
import { CategoryTranslationRepo } from './category-translation.repo'
import { NotFoundRecordException } from 'src/shared/error'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { CreateCategoryTranslationBodyType, UpdateCategoryTranslationBodyType } from './category-translation.model'
import { CategoryTranslationAlreadyExistsException } from './category-translation.error'

@Injectable()
export class CategoryTranslationService {
  constructor(private readonly categoryTranslationRepo: CategoryTranslationRepo) {}

  async findByIdCategoryTranslationService(id: number) {
    const categoryTranslation = await this.categoryTranslationRepo.findByIdCategoryTranslationRepo(id)
    if (!categoryTranslation) {
      throw NotFoundRecordException
    }
    return categoryTranslation
  }

  async createCategoryTranslationService({
    createdById,
    data,
  }: {
    createdById: number
    data: CreateCategoryTranslationBodyType
  }) {
    try {
      return await this.categoryTranslationRepo.createCategoryTranslationRepo({
        createdById,
        data,
      })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw CategoryTranslationAlreadyExistsException
      }
      throw error
    }
  }

  async updateCategoryTranslationService({
    id,
    updatedById,
    data,
  }: {
    id: number
    updatedById: number
    data: UpdateCategoryTranslationBodyType
  }) {
    try {
      const categoryTranslation = await this.categoryTranslationRepo.updateCategoryTranslationRepo({
        id,
        updatedById,
        data,
      })
      return categoryTranslation
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw CategoryTranslationAlreadyExistsException
      }
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }

  async deleteBrandTranslationService({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.categoryTranslationRepo.deleteCategoryTranslationRepo({
        id,
        deletedById,
      })
      return { message: 'Category translation deleted successfully' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }
}
