import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  CancelOrderBodyDTO,
  CancelOrderResDTO,
  CreateOrderBodyDTO,
  CreateOrderResDTO,
  DeliveredOrderBodyDTO,
  DeliveredOrderResDTO,
  GetOrderDetailResDTO,
  GetOrderListQueryDTO,
  GetOrderListResDTO,
  GetOrderParamsDTO,
} from './order.dto'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger'

@Controller('orders')
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ZodSerializerDto(GetOrderListResDTO)
  async listOrders(@ActiveUser('userId') userId: number, @Query() query: GetOrderListQueryDTO) {
    return this.orderService.listOrders(userId, query)
  }

  @Post()
  @ZodSerializerDto(CreateOrderResDTO)
  create(@ActiveUser('userId') userId: number, @Body() body: CreateOrderBodyDTO) {
    return this.orderService.create(userId, body)
  }

  @Get(':orderId')
  @ApiParam({ name: 'orderId', type: String })
  @ZodSerializerDto(GetOrderDetailResDTO)
  detail(@ActiveUser('userId') userId: number, @Param() param: GetOrderParamsDTO) {
    return this.orderService.detail(userId, param.orderId)
  }

  @Put(':orderId')
  @ZodSerializerDto(CancelOrderResDTO)
  @ApiParam({ name: 'orderId', type: String })
  cancel(@ActiveUser('userId') userId: number, @Param() param: GetOrderParamsDTO, @Body() _: CancelOrderBodyDTO) {
    return this.orderService.cancel(userId, param.orderId)
  }

  @Put(':orderId/delivered')
  @ApiParam({ name: 'orderId', type: String })
  @ZodSerializerDto(DeliveredOrderResDTO)
  delivered(@ActiveUser('userId') userId: number, @Param() param: GetOrderParamsDTO, @Body() _: DeliveredOrderBodyDTO) {
    return this.orderService.delivered(userId, param.orderId)
  }
}
