import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CategoryService } from './category.service'
import { isPublic } from 'src/shared/decorators/auth.decorators'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  CreateCategoryBodyDTO,
  GetAllCategoriesQueryDTO,
  GetAllCategoriesResDTO,
  GetCategoryDetailResDTO,
  GetCategoryParamsDTO,
  UpdateCategoryBodyDTO,
} from './category.dto'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger'

@Controller('categories')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @isPublic()
  @ZodSerializerDto(GetAllCategoriesResDTO)
  findAllCategoriesController(@Query() query: GetAllCategoriesQueryDTO) {
    return this.categoryService.findAllCategoriesService(query.parentCategoryId)
  }

  @Get(':categoryId')
  @ApiParam({ name: 'categoryId', type: String })
  @isPublic()
  @ZodSerializerDto(GetCategoryDetailResDTO)
  findByIdCategoryController(@Param() param: GetCategoryParamsDTO) {
    return this.categoryService.findByIdCategoryService(param.categoryId)
  }

  @Post()
  @ZodSerializerDto(GetCategoryDetailResDTO)
  createCategoryController(@Body() body: CreateCategoryBodyDTO, @ActiveUser('userId') userId: number) {
    return this.categoryService.createCategoryService({
      data: body,
      createdById: userId,
    })
  }

  @Put(':categoryId')
  @ApiParam({ name: 'categoryId', type: String })
  @ZodSerializerDto(GetCategoryDetailResDTO)
  updateCategoryController(
    @Param() param: GetCategoryParamsDTO,
    @Body() body: UpdateCategoryBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.categoryService.updateCategoryService({
      data: body,
      updatedById: userId,
      id: param.categoryId,
    })
  }

  @Delete(':categoryId')
  @ApiParam({ name: 'categoryId', type: String })
  @ZodSerializerDto(MessageResDTO)
  deleteCategoryController(@Param() params: GetCategoryParamsDTO, @ActiveUser('userId') userId: number) {
    return this.categoryService.deleteCategoryService({
      id: params.categoryId,
      deletedById: userId,
    })
  }
}
