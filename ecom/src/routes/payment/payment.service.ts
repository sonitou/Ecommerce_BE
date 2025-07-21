import { Injectable } from '@nestjs/common'
import { PaymentRepo } from './payment.repo'
import { WebhookPaymentBodyType } from './payment.model'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { SharedWebsocketRepository } from 'src/shared/repositories/shared-websocket.repo'
import { generateRoomUserId } from 'src/shared/helpers'

@Injectable()
@WebSocketGateway({ namespace: 'payment' })
export class PaymentService {
  @WebSocketServer()
  server: Server
  constructor(
    private readonly paymentRepo: PaymentRepo,
    private readonly sharedWebsocketRepository: SharedWebsocketRepository,
  ) {}

  async receiver(body: WebhookPaymentBodyType) {
    const userId = await this.paymentRepo.receiver(body)
    this.server.to(generateRoomUserId(userId)).emit('payment', {
      status: 'success',
    })
    // try {
    //   const webSockets = await this.sharedWebsocketRepository.findMany(userId)
    //   webSockets.forEach((ws) => {
    //     this.server.to(ws.id).emit('payment', {
    //       status: 'success',
    //     })
    //   })
    // } catch (error) {
    //   console.log(error)
    return {
      message: 'Payment receiver successfully',
    }
  }
}
