import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { BrandService } from './brand.service'
import { PaginationQueryDTO } from 'src/shared/dtos/request.dto'
import { isPublic } from 'src/shared/decorators/auth.decorators'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  CreateBrandBodyDTO,
  GetBrandDetailResDTO,
  GetBrandParamsDTO,
  GetBrandsResDTO,
  UpdateBrandBodyDTO,
} from './brand.dto'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { MessageResDTO } from 'src/shared/dtos/response.dto'
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger'

@Controller('brands')
@ApiBearerAuth()
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @isPublic()
  @ZodSerializerDto(GetBrandsResDTO)
  listBrandsController(@Query() query: PaginationQueryDTO) {
    return this.brandService.listBrandsService(query)
  }

  @Get(':brandId')
  @ApiParam({ name: 'brandId', type: String })
  @isPublic()
  @ZodSerializerDto(GetBrandDetailResDTO)
  findByIdBrandController(@Param() param: GetBrandParamsDTO) {
    return this.brandService.findByIdBrandService(param.brandId)
  }

  @Post()
  @ZodSerializerDto(GetBrandDetailResDTO)
  createBrandController(@Body() body: CreateBrandBodyDTO, @ActiveUser('userId') userId: number) {
    return this.brandService.createBrandService({
      data: body,
      createdById: userId,
    })
  }

  @Put(':brandId')
  @ApiParam({ name: 'brandId', type: String })
  @ZodSerializerDto(GetBrandDetailResDTO)
  updateBrandController(
    @Param() param: GetBrandParamsDTO,
    @Body() body: UpdateBrandBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.brandService.updateBrandService({
      data: body,
      updatedById: userId,
      id: param.brandId,
    })
  }

  @Delete(':brandId')
  @ApiParam({ name: 'brandId', type: String })
  @ZodSerializerDto(MessageResDTO)
  deleteBrandController(@Param() param: GetBrandParamsDTO, @ActiveUser('userId') userId: number) {
    return this.brandService.deleteBrandService({
      id: param.brandId,
      deletedById: userId,
    })
  }
}
