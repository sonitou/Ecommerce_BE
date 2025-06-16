import { Injectable } from '@nestjs/common'
import { NotFoundRecordException } from 'src/shared/error'
import { isNotFoundPrismaError } from 'src/shared/helpers'
import { I18nContext } from 'nestjs-i18n'
import { CategoryRepo } from './category.repo'
import { CreateCategoryBodyType, UpdateCategoryBodyType } from './category.model'

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepo: CategoryRepo,
    // private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async findAllCategoriesService(parentCategoryId?: number | null) {
    // console.log(I18nContext.current()?.lang)
    // console.log(this.i18n.t('error.NOT_FOUND', { lang: I18nContext.current()?.lang }))
    return this.categoryRepo.findAllCategoriesRepo({
      parentCategoryId,
      languageId: I18nContext.current()?.lang as string,
    })
  }

  async findByIdCategoryService(id: number) {
    const category = await this.categoryRepo.findByIdCategoryRepo(id, I18nContext.current()?.lang as string)
    if (!category) {
      throw NotFoundRecordException
    }
    return category
  }

  async createCategoryService({ data, createdById }: { data: CreateCategoryBodyType; createdById: number }) {
    return this.categoryRepo.createCategoryRepo({ data, createdById })
  }

  async updateCategoryService({
    id,
    data,
    updatedById,
  }: {
    id: number
    data: UpdateCategoryBodyType
    updatedById: number
  }) {
    try {
      const category = await this.categoryRepo.updateCategoryRepo({
        id,
        updatedById,
        data,
      })
      return category
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }

  async deleteCategoryService({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.categoryRepo.deleteCategoryRepo({
        id,
        deletedById,
      })
      return { message: 'Category deleted successfully' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }
}
