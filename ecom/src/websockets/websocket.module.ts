import { Module } from '@nestjs/common'
import { ChatGateway } from 'src/websockets/chat.gateway'
import { PaymentGateway } from './payment.gateway'
import { WebsocketAdapter } from './websocket.adapter'

@Module({
  providers: [ChatGateway, PaymentGateway],
})
export class WebsocketModule {}
