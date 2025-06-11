import { Module } from '@nestjs/common'
import { BrandTranslationService } from './brand-translation.service'
import { BrandTranslationRepo } from './brand-translation.repo'
import { BrandTranslationController } from './brand-translation.controller'

@Module({
  providers: [BrandTranslationService, BrandTranslationRepo],
  controllers: [BrandTranslationController],
})
export class BrandTranslationModule {}
