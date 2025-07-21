import { Global, Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.service'
import { HashingService } from './services/hashing.service'
import { TokenService } from './services/token.service'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenGuard } from './guards/access-token.guard'
import { AuthenticationGuard } from './guards/authentication.guard'
import { SharedUserRepository } from './repositories/shared-user-repo'
import { EmailService } from 'src/routes/auth/email.service'
import { SharedRoleRepository } from './repositories/shared-role.repo'
import { TwoFactorService } from './services/2fa.service'
import { S3Service } from './services/s3.service'
import { PaymentAPIKeyGuard } from './guards/payment-api-key.guard'
import { SharedPaymentRepository } from './repositories/shared-payment.repo'
import { SharedWebsocketRepository } from './repositories/shared-websocket.repo'
const sharedService = [
  PrismaService,
  HashingService,
  TokenService,
  SharedUserRepository,
  EmailService,
  SharedRoleRepository,
  TwoFactorService,
  S3Service,
  SharedPaymentRepository,
  SharedWebsocketRepository,
]
@Global()
@Module({
  providers: [
    ...sharedService,
    AccessTokenGuard,
    PaymentAPIKeyGuard,
    {
      provide: 'APP_GUARD',
      useClass: AuthenticationGuard,
    },
  ],
  exports: sharedService,
  imports: [JwtModule],
})
export class SharedModule {}
