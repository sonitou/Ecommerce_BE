import { Global, Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.service'
import { HashingService } from './services/hashing.service'
import { TokenService } from './services/token.service'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenGuard } from './guards/access-token.guard'
import { APIKeyGuard } from './guards/api-key.guard'
import { AuthenticationGuard } from './guards/authentication.guard'
import { SharedUserRepository } from './repositories/shared-user-repo'
import { EmailService } from 'src/routes/auth/email.service'
const sharedService = [PrismaService, HashingService, TokenService, SharedUserRepository, EmailService]
@Global()
@Module({
  providers: [
    ...sharedService,
    AccessTokenGuard,
    APIKeyGuard,
    {
      provide: 'APP_GUARD',
      useClass: AuthenticationGuard,
    },
  ],
  exports: sharedService,
  imports: [JwtModule],
})
export class SharedModule {}
