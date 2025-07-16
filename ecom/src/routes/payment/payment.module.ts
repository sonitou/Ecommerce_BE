import { Module } from '@nestjs/common'

import { PaymentService } from './payment.service'
import { PaymentRepo } from './payment.repo'
import { PaymentController } from './payment.controller'
import { PAYMENT_QUEUE_NAME } from 'src/shared/constants/queue.constants'
import { BullModule } from '@nestjs/bullmq'
import { PaymentProducer } from './payment.producer'

@Module({
  imports: [
    BullModule.registerQueue({
      name: PAYMENT_QUEUE_NAME,
    }),
  ],
  providers: [PaymentService, PaymentRepo, PaymentProducer],
  controllers: [PaymentController],
})
export class PaymentModule {}
