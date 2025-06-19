import { ProductTranslationSchema } from 'src/shared/models/shared-product-translation.model'
import { z } from 'zod'

export const GetProductTranslationParamsSchema = z
  .object({
    productTranslationId: z.coerce.number().int().positive(),
  })
  .strict()
export type GetProductTranslationParamsType = z.infer<typeof GetProductTranslationParamsSchema>

export const GetProductTranslationDetailResSchema = ProductTranslationSchema
export type GetProductTranslationDetailResType = z.infer<typeof GetProductTranslationDetailResSchema>

export const CreateProductTranslationBodySchema = ProductTranslationSchema.pick({
  productId: true,
  name: true,
  description: true,
  languageId: true,
}).strict()
export type CreateProductTranslationBodyType = z.infer<typeof CreateProductTranslationBodySchema>

export const UpdateProductTranslationBodySchema = CreateProductTranslationBodySchema
export type UpdateProductTranslationBodyType = z.infer<typeof UpdateProductTranslationBodySchema>

export const DeleteProductTranslationParamsSchema = GetProductTranslationParamsSchema
export type DeleteProductTranslationParamsType = z.infer<typeof DeleteProductTranslationParamsSchema>
