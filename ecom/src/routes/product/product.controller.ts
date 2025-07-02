import { Controller, Get, Param, Query } from '@nestjs/common'
import { ProductService } from './product.service'
import { ZodSerializerDto } from 'nestjs-zod'
import { GetProductDetailResDTO, GetProductParamsDTO, GetProductsQueryDTO, GetProductsResDTO } from './product.dto'
import { isPublic } from 'src/shared/decorators/auth.decorators'

@Controller('products')
@isPublic()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ZodSerializerDto(GetProductsResDTO)
  list(@Query() query: GetProductsQueryDTO) {
    return this.productService.listProducts({
      query,
    })
  }

  @Get(':productId')
  @ZodSerializerDto(GetProductDetailResDTO)
  findById(@Param() params: GetProductParamsDTO) {
    return this.productService.getDetail({
      productId: params.productId,
    })
  }
}
