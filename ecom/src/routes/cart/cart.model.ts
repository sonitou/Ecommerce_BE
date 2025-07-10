import { ProductTranslationSchema } from 'src/shared/models/shared-product-translation.model'
import { ProductSchema } from 'src/shared/models/shared-product.model'
import { SKUSchema } from 'src/shared/models/shared-sku.model'
import { UserSchema } from 'src/shared/models/shared-user.model'
import { z } from 'zod'

export const CartItemSchema = z.object({
  id: z.number(),
  quantity: z.number().int().positive(),
  skuId: z.number(),
  userId: z.number(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type CartItemType = z.infer<typeof CartItemSchema>

export const GetCartItemsParamsSchema = z.object({
  cartItemId: z.coerce.number().int().positive(),
})
export type GetCartItemsParamsType = z.infer<typeof GetCartItemsParamsSchema>

export const CartItemDetailSchema = z.object({
  shop: UserSchema.pick({
    id: true,
    name: true,
    avatar: true,
  }),
  cartItems: z.array(
    CartItemSchema.extend({
      sku: SKUSchema.extend({
        product: ProductSchema.extend({
          productTranslations: z.array(
            ProductTranslationSchema.omit({
              createdById: true,
              updatedById: true,
              deletedById: true,
              deletedAt: true,
              createdAt: true,
              updatedAt: true,
            }),
          ),
        }).omit({
          createdById: true,
          updatedById: true,
          deletedById: true,
          deletedAt: true,
          createdAt: true,
          updatedAt: true,
        }),
      }).omit({
        createdById: true,
        updatedById: true,
        deletedById: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
      }),
    }),
  ),
})
export type CartItemDetailType = z.infer<typeof CartItemDetailSchema>

export const GetCartResSchema = z.object({
  data: z.array(CartItemDetailSchema),
  totalItems: z.number(),
  page: z.number(), // Số trang hiện tại
  limit: z.number(), // Số item trên 1 trang
  totalPages: z.number(), // Tổng số trang
})
export type GetCartResType = z.infer<typeof GetCartResSchema>

export const AddToCartBodySchema = CartItemSchema.pick({
  skuId: true,
  quantity: true,
}).strict()
export type AddToCartBodyType = z.infer<typeof AddToCartBodySchema>

export const UpdateCartItemBodySchema = AddToCartBodySchema
export type UpdateCartItemBodyType = z.infer<typeof UpdateCartItemBodySchema>

export const DeleteCartBodySchema = z
  .object({
    cartItemIds: z.array(z.number().int().positive()),
  })
  .strict()
export type DeleteCartBodyType = z.infer<typeof DeleteCartBodySchema>
