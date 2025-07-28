import { createZodDto } from 'nestjs-zod'
import {
  CancelOrderBodySchema,
  CancelOrderResSchema,
  CreateOrderBodySchema,
  CreateOrderResSchema,
  DeliveredOrderBodySchema,
  DeliveredOrderResSchema,
  GetOrderDetailResSchema,
  GetOrderListQuerySchema,
  GetOrderListResSchema,
  GetOrderParamsSchema,
} from './order.model'

export class GetOrderListResDTO extends createZodDto(GetOrderListResSchema) {}

export class GetOrderListQueryDTO extends createZodDto(GetOrderListQuerySchema) {}

export class GetOrderDetailResDTO extends createZodDto(GetOrderDetailResSchema) {}

export class CreateOrderBodyDTO extends createZodDto(CreateOrderBodySchema) {}

export class CancelOrderBodyDTO extends createZodDto(CancelOrderBodySchema) {}

export class CreateOrderResDTO extends createZodDto(CreateOrderResSchema) {}

export class CancelOrderResDTO extends createZodDto(CancelOrderResSchema) {}

export class GetOrderParamsDTO extends createZodDto(GetOrderParamsSchema) {}

export class DeliveredOrderBodyDTO extends createZodDto(DeliveredOrderBodySchema) {}

export class DeliveredOrderResDTO extends createZodDto(DeliveredOrderResSchema) {}
