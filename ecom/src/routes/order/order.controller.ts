import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { ZodSerializerDto } from 'nestjs-zod'
import { CreateOrderBodyDTO, CreateOrderResDTO, GetOrderListQueryDTO, GetOrderListResDTO } from './order.dto'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'

@Controller('orders')
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
}
