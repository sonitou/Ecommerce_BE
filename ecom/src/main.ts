import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { UPLOAD_DIR } from './shared/constants/other.constants'
import { WebsocketAdapter } from './websockets/websocket.adapter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors()

  app.useWebSocketAdapter(new WebsocketAdapter(app))
  // app.useStaticAssets(UPLOAD_DIR, {
  //   prefix: '/media/static',
  // })
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
