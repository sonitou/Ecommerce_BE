import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ProductService } from './product.service'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  CreateProductBodyDTO,
  GetProductDetailResDTO,
  GetProductParamsDTO,
  GetProductsQueryDTO,
  GetProductsResDTO,
  ProductDTO,
  UpdateProductBodyDTO,
} from './product.dto'
import { isPublic } from 'src/shared/decorators/auth.decorators'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @isPublic()
  @ZodSerializerDto(GetProductsResDTO)
  async listProducts(@Query() query: GetProductsQueryDTO) {
    return this.productService.listProducts(query)
  }

  @Get(':productId')
  @isPublic()
  @ZodSerializerDto(GetProductDetailResDTO)
  async findByIdProduct(@Param() params: GetProductParamsDTO) {
    return this.productService.findByIdProduct(params.productId)
  }

  @Post()
  @ZodSerializerDto(GetProductDetailResDTO)
  createProduct(@Body() body: CreateProductBodyDTO, @ActiveUser('userId') userId: number) {
    return this.productService.createProduct({ data: body, createdById: userId })
  }

  @Put(':productId')
  @ZodSerializerDto(ProductDTO)
  updateProduct(
    @Body() body: UpdateProductBodyDTO,
    @Param() params: GetProductParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.productService.updateProduct({ id: params.productId, data: body, updatedById: userId })
  }

  @Delete(':productId')
  @ZodSerializerDto(MessageResDTO)
  deleteProduct(@Param() params: GetProductParamsDTO, @ActiveUser('userId') userId: number) {
    return this.productService.deleteProduct({ id: params.productId, deletedById: userId })
  }
}
