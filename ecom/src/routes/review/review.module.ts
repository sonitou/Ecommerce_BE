import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewRepo } from './review.repo'
import { ReviewController } from './review.controller'

@Module({
  providers: [ReviewService, ReviewRepo],
  controllers: [ReviewController],
})
export class ReviewModule {}
