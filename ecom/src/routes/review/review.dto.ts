import { createZodDto } from 'nestjs-zod'
import {
  CreateReviewBodySchema,
  CreateReviewResSchema,
  GetReviewDetailParamsSchema,
  GetReviewSchema,
  GetReviewsParamsSchema,
  UpdateReviewBodySchema,
  UpdateReviewResSchema,
} from './review.model'

export class CreateReviewBodyDTO extends createZodDto(CreateReviewBodySchema) {}
export class CreateReviewResDTO extends createZodDto(CreateReviewResSchema) {}

export class UpdateReviewBodyDTO extends createZodDto(UpdateReviewBodySchema) {}
export class UpdateReviewResDto extends createZodDto(UpdateReviewResSchema) {}

export class GetReviewsDTO extends createZodDto(GetReviewSchema) {}

export class GetReviewsParamsDTO extends createZodDto(GetReviewsParamsSchema) {}
export class GetReviewDetailParamsDTO extends createZodDto(GetReviewDetailParamsSchema) {}
