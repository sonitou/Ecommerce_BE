import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'
import { CANCEL_PAYMENT_JOB_NAME, PAYMENT_QUEUE_NAME } from 'src/shared/constants/queue.constants'
import { generateCancelPaymentJobId } from 'src/shared/helpers'

@Injectable()
export class OrderProducer {
  constructor(@InjectQueue(PAYMENT_QUEUE_NAME) private paymentQueue: Queue) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.paymentQueue.getJobs().then((jobs) => {
      console.log(jobs)
    })
  }

  async addCancelPaymentJob(paymentId: number) {
    return this.paymentQueue.add(
      CANCEL_PAYMENT_JOB_NAME,
      {
        paymentId,
      },
      {
        delay: 1000 * 20, // delay job for 20 seconds
        // 60 * 60 * 24, // delay 24h
        jobId: generateCancelPaymentJobId(paymentId), // unique job ID based on paymentId
        removeOnComplete: true, // chạy xong thì xóa job
        removeOnFail: true, // thất bại thì xóa job
      },
    )
  }
}
