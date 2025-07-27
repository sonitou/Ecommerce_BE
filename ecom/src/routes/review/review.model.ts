import { MediaType } from 'src/shared/constants/media.constants'
import { UserSchema } from 'src/shared/models/shared-user.model'
import { z } from 'zod'

export const ReviewMediaSchema = z.object({
  id: z.number().int(),
  reviewId: z.number().int(),
  url: z.string().max(1000),
  type: z.enum([MediaType.IMAGE, MediaType.VIDEO, MediaType.DOCUMENT]),
  createdAt: z.date(),
})
export type ReviewMediaType = z.infer<typeof ReviewMediaSchema>

export const ReviewSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  rating: z.number().int().min(1).max(5),
  productId: z.number().int(),
  userId: z.number().int(),
  orderId: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  updateCount: z.number().int(),
})
export type ReviewType = z.infer<typeof ReviewSchema>

export const CreateReviewBodySchema = ReviewSchema.pick({
  content: true,
  rating: true,
  productId: true,
  orderId: true,
}).extend({
  medias: z.array(
    ReviewMediaSchema.pick({
      url: true,
      type: true,
    }),
  ),
})
export type CreateReviewBodyType = z.infer<typeof CreateReviewBodySchema>

export const CreateReviewResSchema = ReviewSchema.extend({
  medias: z.array(ReviewMediaSchema),
  user: UserSchema.pick({
    id: true,
    name: true,
    avatar: true,
  }),
})
export type CreateReviewResType = z.infer<typeof CreateReviewResSchema>

export const UpdateReviewResSchema = CreateReviewResSchema
export type UpdateReviewResType = z.infer<typeof UpdateReviewResSchema>

export const GetReviewSchema = z.object({
  data: z.array(CreateReviewResSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})
export type GetReviewType = z.infer<typeof GetReviewSchema>

export const UpdateReviewBodySchema = CreateReviewBodySchema
export type UpdateReviewBodyType = z.infer<typeof UpdateReviewBodySchema>

export const GetReviewsParamsSchema = z.object({
  productId: z.coerce.number().int().positive(),
})
export type GetReviewsParamsType = z.infer<typeof GetReviewsParamsSchema>

export const GetReviewDetailParamsSchema = z.object({
  reviewId: z.coerce.number().int().positive(),
})
export type GetReviewDetailParamsType = z.infer<typeof GetReviewDetailParamsSchema>
