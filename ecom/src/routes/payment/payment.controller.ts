import { Body, Controller, Post } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { ZodSerializerDto } from 'nestjs-zod'
import { Auth, isPublic } from 'src/shared/decorators/auth.decorators'
import { WebhookPaymentBodyDTO } from './payment.dto'
import { MessageResDTO } from 'src/shared/dtos/response.dto'
import { ApiSecurity } from '@nestjs/swagger'

@Controller('payment')
@ApiSecurity('payment-api-key')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/receiver')
  @Auth(['PaymentAPIKey'])
  @ZodSerializerDto(MessageResDTO)
  receiver(@Body() body: WebhookPaymentBodyDTO) {
    return this.paymentService.receiver(body)
  }
}
