import { Injectable } from '@nestjs/common'
import { OrderRepo } from './order.repo'
import { CreateOrderBodyType, GetOrderListQueryType } from './order.model'

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepo) {}

  async listOrders(userId: number, query: GetOrderListQueryType) {
    return this.orderRepo.listOrders(userId, query)
  }

  async create(userId: number, body: CreateOrderBodyType) {
    const result = await this.orderRepo.createOrder(userId, body)
    return result
  }

  cancel(userId: number, orderId: number) {
    return this.orderRepo.cancelOrder(userId, orderId)
  }

  detail(userId: number, orderId: number) {
    return this.orderRepo.getDetail(userId, orderId)
  }
}
