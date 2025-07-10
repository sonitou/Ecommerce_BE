import { Injectable } from '@nestjs/common'
import { OrderRepo } from './order.repo'
import { GetOrderListQueryType } from './order.model'

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepo) {}

  async listOrders(userId: number, query: GetOrderListQueryType) {
    return this.orderRepo.listOrders(userId, query)
  }
}
