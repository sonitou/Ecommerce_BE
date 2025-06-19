import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductRepo } from './product.repo'
import { CreateProductBodyType, GetProductsQueryType, UpdateProductBodyType } from './product.model'
import { I18nContext } from 'nestjs-i18n'
import { NotFoundRecordException } from 'src/shared/error'
import { isNotFoundPrismaError } from 'src/shared/helpers'

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepo) {}

  async listProducts(query: GetProductsQueryType) {
    const data = await this.productRepo.listProducts(query, I18nContext.current()?.lang as string)
    return data
  }

  async findByIdProduct(id: number) {
    const product = await this.productRepo.findProductById(id, I18nContext.current()?.lang as string)
    if (!product) {
      throw NotFoundRecordException
    }
    return product
  }

  createProduct({ data, createdById }: { data: CreateProductBodyType; createdById: number }) {
    return this.productRepo.createProduct({ data, createdById })
  }

  async updateProduct({ id, data, updatedById }: { id: number; data: UpdateProductBodyType; updatedById: number }) {
    try {
      const product = await this.productRepo.updateProduct({ id, data, updatedById })
      return product
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }

  async deleteProduct({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      await this.productRepo.deleteProduct({ id, deletedById })
      return { message: 'Product deleted successfully' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }
}
