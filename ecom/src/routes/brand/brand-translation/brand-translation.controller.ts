import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BrandTranslationService } from './brand-translation.service'
import {
  CreateBrandTranslationBodyDTO,
  GetBrandTranslationDetailResDTO,
  GetBrandTranslationParamsDTO,
  UpdateBrandTranslationBodyDTO,
} from './brand-translation.dto'
import { ZodSerializerDto } from 'nestjs-zod'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { isPublic } from 'src/shared/decorators/auth.decorators'
import { MessageResDTO } from 'src/shared/dtos/response.dto'
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger'

@Controller('brand-translations')
@ApiBearerAuth()
export class BrandTranslationController {
  constructor(private readonly brandTranslationService: BrandTranslationService) {}

  @Get(':brandTranslationId')
  @ApiParam({ name: 'brandTranslationId', type: String })
  @isPublic()
  @ZodSerializerDto(GetBrandTranslationDetailResDTO)
  findByIdBrandTranslationController(@Param() params: GetBrandTranslationParamsDTO) {
    return this.brandTranslationService.findByIdBrandTranslationService(params.brandTranslationId)
  }

  @Post()
  @ZodSerializerDto(GetBrandTranslationDetailResDTO)
  createBrandTranslationController(@Body() body: CreateBrandTranslationBodyDTO, @ActiveUser('userId') userId: number) {
    return this.brandTranslationService.createBrandTranslationService({
      data: body,
      createdById: userId,
    })
  }

  @Put(':brandTranslationId')
  @ApiParam({ name: 'brandTranslationId', type: String })
  @ZodSerializerDto(GetBrandTranslationDetailResDTO)
  updateBrandTranslationController(
    @Param() params: GetBrandTranslationParamsDTO,
    @Body() body: UpdateBrandTranslationBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.brandTranslationService.updateBrandTranslationService({
      data: body,
      updatedById: userId,
      id: params.brandTranslationId,
    })
  }

  @Delete(':brandTranslationId')
  @ApiParam({ name: 'brandTranslationId', type: String })
  @ZodSerializerDto(MessageResDTO)
  deleteBrandTranslationController(
    @Param() params: GetBrandTranslationParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.brandTranslationService.deleteBrandTranslationService({
      id: params.brandTranslationId,
      deletedById: userId,
    })
  }
}
