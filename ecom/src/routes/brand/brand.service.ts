import { Injectable } from '@nestjs/common'
import { BrandRepo } from './brand.repo'
import { PaginationQueryType } from 'src/shared/models/request.model'
import { NotFoundRecordException } from 'src/shared/error'
import { CreateBrandBodyType, UpdateBrandBodyType } from './brand.model'
import { isNotFoundPrismaError } from 'src/shared/helpers'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class BrandService {
  constructor(
    private brandRepo: BrandRepo,
    // private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async listBrandsService(pagination: PaginationQueryType) {
    console.log(I18nContext.current()?.lang)
    // console.log(this.i18n.t('error.NOT_FOUND', { lang: I18nContext.current()?.lang }))
    const data = await this.brandRepo.listBrandsRepo(pagination, I18nContext.current()?.lang as string)
    return data
  }

  async findByIdBrandService(id: number) {
    const brand = await this.brandRepo.findByIdBrandRepo(id, I18nContext.current()?.lang as string)
    if (!brand) {
      throw NotFoundRecordException
    }
    return brand
  }

  async createBrandService({ data, createdById }: { data: CreateBrandBodyType; createdById: number }) {
    return this.brandRepo.createBrandRepo({ data, createdById })
  }

  async updateBrandService({ id, data, updatedById }: { id: number; data: UpdateBrandBodyType; updatedById: number }) {
    try {
      const brand = await this.brandRepo.updateBrandRepo({
        id,
        updatedById,
        data,
      })
      return brand
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }

  async deleteBrandService({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.brandRepo.deleteBrandRepo({
        id,
        deletedById,
      })
      return { message: 'Brand deleted successfully' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }
}
