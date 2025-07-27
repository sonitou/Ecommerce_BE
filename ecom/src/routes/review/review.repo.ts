import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import {
  CreateReviewBodyType,
  CreateReviewResType,
  GetReviewType,
  UpdateReviewBodyType,
  UpdateReviewResType,
} from './review.model'
import { PaginationQueryType } from 'src/shared/models/request.model'
import { OrderStatus } from 'src/shared/constants/order.constants'

@Injectable()
export class ReviewRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async listReview(productId: number, pagination: PaginationQueryType): Promise<GetReviewType> {
    const take = pagination.limit
    const skip = (pagination.page - 1) * pagination.limit

    const [totalItems, data] = await Promise.all([
      this.prismaService.review.count({
        where: {
          productId,
        },
      }),
      this.prismaService.review.findMany({
        where: {
          productId,
        },
        include: {
          medias: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    }
  }

  private async validateOrder({ orderId, userId }: { orderId: number; userId: number }) {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId, userId },
    })
    if (!order) {
      throw new BadRequestException('Đơn hàng không hợp lệ hoặc không thuộc về người dùng này')
    }
    if (order.status !== OrderStatus.DELIVERED) {
      throw new BadRequestException('Đơn hàng chưa được giao, không thể đánh giá')
    }
    return order
  }

  private async validateUpdateReview({ reviewId, userId }: { reviewId: number; userId: number }) {
    const review = await this.prismaService.review.findUnique({
      where: { id: reviewId, userId },
    })
    if (!review) {
      throw new NotFoundException('Đánh giá không tồn tại hoặc không thuộc về người dùng này')
    }

    if (review.updateCount >= 1) {
      throw new BadRequestException('Đánh giá đã được cập nhật quá số lần cho phép')
    }
    return review
  }

  async createReview(body: CreateReviewBodyType, userId: number): Promise<CreateReviewResType> {
    const { content, rating, productId, orderId, medias } = body
    // Validate order
    await this.validateOrder({ orderId, userId })

    return this.prismaService.$transaction(async (tx) => {
      // Create review
      const review = await tx.review.create({
        data: {
          content,
          rating,
          productId,
          orderId,
          userId,
        },
        // include: {
        //   medias: true,
        //   user: {
        //     select: {
        //       id: true,
        //       name: true,
        //       avatar: true,
        //     },
        //   },
        // },
      })
      // .catch((error) => {
      //   if (isUniqueConstraintPrismaError(error)) {
      //     throw new ConflictException('Đánh giá đã tồn tại hoặc có lỗi khi tạo đánh giá')
      //   }
      //   throw error
      // })

      // Create review medias (nếu có)
      // const reviewMedia = await tx.reviewMedia.createManyAndReturn({
      //   data: medias.map((media) => ({
      //     url: media.url,
      //     type: media.type,
      //     reviewId: review.id,
      //   })),
      // })
      // return {
      //   ...review,
      //   medias: reviewMedia,
      // }

      // nếu medias tồn tại thi insert vào reviewMedia, ngược lại bỏ qua
      if (body.medias?.length) {
        await tx.reviewMedia.createMany({
          data: medias.map((m) => ({
            url: m.url,
            type: m.type,
            reviewId: review.id,
          })),
          skipDuplicates: true,
        })
      }

      // Query lại để lấy đúng user + medias mới nhất
      const result = await tx.review.findUnique({
        where: { id: review.id },
        include: {
          medias: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      })
      // result chắc chắn không null vì vừa tạo
      return result as CreateReviewResType
    })
  }

  async updateReview(reviewId: number, userId: number, updateBody: UpdateReviewBodyType): Promise<UpdateReviewResType> {
    const { content, rating, productId, orderId, medias } = updateBody
    await Promise.all([this.validateUpdateReview({ reviewId, userId }), this.validateOrder({ orderId, userId })])

    return this.prismaService.$transaction(async (tx) => {
      const review = await tx.review.update({
        where: { id: reviewId },
        data: {
          content,
          rating,
          productId,
          orderId,
          userId,
          updateCount: { increment: 1 }, // Tăng số lần cập nhật
        },
      })
      // Xóa các media cũ nếu có
      await tx.reviewMedia.deleteMany({
        where: { reviewId },
      })

      // 2.3 Tạo lại medias mới (nếu có)
      if (updateBody.medias?.length) {
        await tx.reviewMedia.createMany({
          data: updateBody.medias.map((media) => ({
            url: media.url,
            type: media.type,
            reviewId: reviewId,
          })),
        })
      }
      // 2.4 Truy vấn lại review kèm medias & user (chuẩn DTO)
      const result = await tx.review.findUnique({
        where: { id: reviewId },
        include: {
          medias: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      })
      // 2.5 Trả về đúng type DTO
      if (!result) throw new BadRequestException('Không tìm thấy đánh giá sau khi cập nhật')
      return result as UpdateReviewResType
    })
  }
}
