import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { GetProductsQueryType, GetProductsResType } from './product.model'
import { ALL_LANGUAGE_CODE } from 'src/shared/constants/order.constants'

@Injectable()
export class ProductRepo {
  constructor(private prismaService: PrismaService) {}
  // Add methods for product repository here
  // For example, you might have methods like:
  // - listProducts
  async listProducts(query: GetProductsQueryType, languageId: string): Promise<GetProductsResType> {
    const skip = (query.page - 1) * query.limit
    const take = query.limit
    const [totalItems, data] = await Promise.all([
      this.prismaService.product.count({
        where: {
          deletedAt: null,
        },
      }),
      this.prismaService.product.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          productTranslations: {
            where: languageId === ALL_LANGUAGE_CODE ? { deletedAt: null } : { deletedAt: null, languageId },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
    ])
    return {
      data,
      totalItems,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(totalItems / query.limit),
    }
  }

  // - findProductById
  // - createProduct
  // - updateProduct
  // - deleteProduct
}
