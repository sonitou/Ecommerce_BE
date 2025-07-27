import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ReviewService } from './review.service'
import { isPublic } from 'src/shared/decorators/auth.decorators'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  CreateReviewBodyDTO,
  CreateReviewResDTO,
  GetReviewDetailParamsDTO,
  GetReviewsDTO,
  GetReviewsParamsDTO,
  UpdateReviewBodyDTO,
  UpdateReviewResDto,
} from './review.dto'
import { PaginationQueryDTO } from 'src/shared/dtos/request.dto'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ZodSerializerDto(CreateReviewResDTO)
  createReview(@Body() body: CreateReviewBodyDTO, @ActiveUser('userId') userId: number) {
    return this.reviewService.createReview(userId, body)
  }

  // Lấy danh sách review theo sản phẩm
  @isPublic()
  @Get('product/:productId')
  @ZodSerializerDto(GetReviewsDTO)
  getReviews(@Param() params: GetReviewsParamsDTO, @Query() pagination: PaginationQueryDTO) {
    return this.reviewService.listReviews(params.productId, pagination)
  }

  // Update review (yêu cầu đăng nhập)
  @Put(':reviewId')
  @ZodSerializerDto(UpdateReviewResDto)
  updateReview(
    @Param() params: GetReviewDetailParamsDTO,
    @Body() body: UpdateReviewBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.reviewService.updateReview({
      userId,
      reviewId: params.reviewId,
      body,
    })
  }
}
