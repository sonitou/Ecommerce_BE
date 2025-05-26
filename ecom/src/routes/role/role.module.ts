import { Module } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from 'src/routes/role/role.service'
import { RoleRepo } from './role.repo'

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepo],
  exports: [RoleService],
})
export class RoleModule {}
