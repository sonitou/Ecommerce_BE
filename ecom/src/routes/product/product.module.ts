import { Module } from '@nestjs/common'
import { ProductRepo } from './product.repo'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'

@Module({
  providers: [ProductRepo, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
