import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CategoryTranslationService } from './category-translation.service'
import {
  CreateCategoryTranslationBodyDTO,
  GetCategoryTranslationDetailResDTO,
  GetCategoryTranslationParamsDTO,
  UpdateCategoryTranslationBodyDTO,
} from './category-translation.dto'
import { ZodSerializerDto } from 'nestjs-zod'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { isPublic } from 'src/shared/decorators/auth.decorators'
import { MessageResDTO } from 'src/shared/dtos/response.dto'
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger'

@Controller('category-translations')
@ApiBearerAuth()
export class CategoryTranslationController {
  constructor(private readonly categoryTranslationService: CategoryTranslationService) {}

  @Get(':categoryTranslationId')
  @ApiParam({ name: 'categoryTranslationId', type: String })
  @isPublic()
  @ZodSerializerDto(GetCategoryTranslationDetailResDTO)
  findByIdCategoryTranslationController(@Param() params: GetCategoryTranslationParamsDTO) {
    return this.categoryTranslationService.findByIdCategoryTranslationService(params.categoryTranslationId)
  }

  @Post()
  @ZodSerializerDto(GetCategoryTranslationDetailResDTO)
  createCategoryTranslationController(
    @Body() body: CreateCategoryTranslationBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryTranslationService.createCategoryTranslationService({
      data: body,
      createdById: userId,
    })
  }

  @Put(':categoryTranslationId')
  @ApiParam({ name: 'categoryTranslationId', type: String })
  @ZodSerializerDto(GetCategoryTranslationDetailResDTO)
  updateCategoryTranslationController(
    @Param() params: GetCategoryTranslationParamsDTO,
    @Body() body: UpdateCategoryTranslationBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryTranslationService.updateCategoryTranslationService({
      data: body,
      updatedById: userId,
      id: params.categoryTranslationId,
    })
  }

  @Delete(':categoryTranslationId')
  @ApiParam({ name: 'categoryTranslationId', type: String })
  @ZodSerializerDto(MessageResDTO)
  deleteCategoryTranslationController(
    @Param() params: GetCategoryTranslationParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryTranslationService.deleteBrandTranslationService({
      id: params.categoryTranslationId,
      deletedById: userId,
    })
  }
}
