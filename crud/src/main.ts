import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor'
import { TransformInterceptor } from './shared/interceptor/transform.interceptor'
import { NextFunction } from 'express'
import helmet from 'helmet'

async function bootstrap() {
  const logger = new Logger(bootstrap.name)
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ cái field không được khai báo decorator trong DTO
      transform: true, // Tự động chuyển hoá dữ liệu
      forbidNonWhitelisted: true, // Nếu không được khai báo decorator trong DTO mà client gửi thì sẽ bị lỗi
      transformOptions: {
        enableImplicitConversion: true, // Tự động chuyển hoá dữ liệu
      },
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(
          errors.map((err) => ({
            field: err.property,
            errors: Object.values(err.constraints || {}).join(''),
          })),
        )
      },
    }),
  )
  // NOTICE: GLOBAL MIDDLEWARE
  app.use(helmet())
  // Custom middlware here!
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.debug('===TRIGGER GLOBAL MIDDLEWARE===')
    next()
  })

  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
