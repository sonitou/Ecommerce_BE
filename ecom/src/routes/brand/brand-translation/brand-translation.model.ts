import { BrandTranslationSchema } from 'src/shared/models/shared-brand-translation.model'
import { BrandSchema } from 'src/shared/models/shared-brand.model'
import { z } from 'zod'

export const GetBrandTranslationParamsSchema = z
  .object({
    brandTranslationId: z.coerce.number().int().positive(),
  })
  .strict()

export const GetBrandTranslationDetailResSchema = BrandTranslationSchema
export type GetBrandTranslationDetailResType = z.infer<typeof GetBrandTranslationDetailResSchema>
export type BrandTranslationType = z.infer<typeof BrandTranslationSchema>

export const CreateBrandTranslationBodySchema = BrandTranslationSchema.pick({
  brandId: true,
  languageId: true,
  name: true,
  description: true,
}).strict()
export type CreateBrandTranslationBodyType = z.infer<typeof CreateBrandTranslationBodySchema>

export const UpdateBrandTranslationBodySchema = CreateBrandTranslationBodySchema
export type UpdateBrandTranslationBodyType = z.infer<typeof UpdateBrandTranslationBodySchema>
