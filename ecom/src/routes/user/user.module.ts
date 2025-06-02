import { Module } from '@nestjs/common'
import { UserRepository } from './user.repo'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
