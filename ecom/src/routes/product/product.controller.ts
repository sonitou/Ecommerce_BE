import { Controller, Get, Param, Query } from '@nestjs/common'
import { ProductService } from './product.service'
import { ZodSerializerDto } from 'nestjs-zod'
import { GetProductDetailResDTO, GetProductParamsDTO, GetProductsQueryDTO, GetProductsResDTO } from './product.dto'
import { isPublic } from 'src/shared/decorators/auth.decorators'
import { SkipThrottle } from '@nestjs/throttler'
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger'
@SkipThrottle()
@Controller('products')
@isPublic()
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ZodSerializerDto(GetProductsResDTO)
  list(@Query() query: GetProductsQueryDTO) {
    return this.productService.listProducts({
      query,
    })
  }
  @SkipThrottle({ default: false })
  @Get(':productId')
  @ApiParam({ name: 'productId', type: String })
  @ZodSerializerDto(GetProductDetailResDTO)
  findById(@Param() params: GetProductParamsDTO) {
    return this.productService.getDetail({
      productId: params.productId,
    })
  }
}
