import { Module } from '@nestjs/common'
import { CategoryTranslationService } from './category-translation.service'
import { CategoryTranslationRepo } from './category-translation.repo'
import { CategoryTranslationController } from './category-translation.controller'

@Module({
  providers: [CategoryTranslationService, CategoryTranslationRepo],
  controllers: [CategoryTranslationController],
})
export class CategoryTranslationModule {}
