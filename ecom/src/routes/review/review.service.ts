import { Injectable } from '@nestjs/common'
import { ReviewRepo } from './review.repo'
import { PaginationQueryType } from 'src/shared/models/request.model'
import { CreateReviewBodyType, UpdateReviewBodyType } from './review.model'

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepo: ReviewRepo) {}

  listReviews(productId: number, pagination: PaginationQueryType) {
    return this.reviewRepo.listReview(productId, pagination)
  }

  async createReview(userId: number, body: CreateReviewBodyType) {
    return this.reviewRepo.createReview(body, userId)
  }

  async updateReview({ userId, reviewId, body }: { userId: number; reviewId: number; body: UpdateReviewBodyType }) {
    return this.reviewRepo.updateReview(reviewId, userId, body)
  }
}
