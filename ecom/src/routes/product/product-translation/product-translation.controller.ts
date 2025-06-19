import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ProductTranslationService } from './product-translation.service'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  CreateProductTranslationBodyDTO,
  GetProductTranslationDetailResDTO,
  GetProductTranslationParamsDTO,
  UpdateProductTranslationBodyDTO,
} from './product-translation.dto'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'

@Controller('products-translations')
export class ProductTranslationController {
  constructor(private readonly productTranslationService: ProductTranslationService) {}

  @Get()
  @ZodSerializerDto(GetProductTranslationDetailResDTO)
  findByIdProductTranslation(@Param() params: GetProductTranslationParamsDTO) {
    return this.productTranslationService.findByIdProductTranslation(params.productTranslationId)
  }

  @Post()
  @ZodSerializerDto(GetProductTranslationDetailResDTO)
  createProductTranslation(@Body() body: CreateProductTranslationBodyDTO, @ActiveUser('userId') userId: number) {
    return this.productTranslationService.createProductTranslation({
      createdById: userId,
      data: body,
    })
  }

  @Put(':productTranslationId')
  @ZodSerializerDto(GetProductTranslationDetailResDTO)
  updateProductTranslation(
    @Param() params: GetProductTranslationParamsDTO,
    @Body() body: UpdateProductTranslationBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.productTranslationService.updateProductTranslation({
      updatedById: userId,
      id: params.productTranslationId,
      data: body,
    })
  }

  @Delete(':productTranslationId')
  @ZodSerializerDto(MessageResDTO)
  deleteProductTranslation(@Param() params: GetProductTranslationParamsDTO, @ActiveUser('userId') userId: number) {
    return this.productTranslationService.deleteProductTranslation({
      id: params.productTranslationId,
      deletedById: userId,
    })
  }
}
