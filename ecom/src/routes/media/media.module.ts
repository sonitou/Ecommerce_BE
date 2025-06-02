import { Module } from '@nestjs/common'
import { MediaController } from './media.controller'
import { MulterModule } from '@nestjs/platform-express'
import * as multer from 'multer'
import * as path from 'path'
import { generateRandomFilename } from 'src/shared/helpers'

const UPLOAD_DIR = path.resolve('upload')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const newFilename = generateRandomFilename(file.originalname)
    cb(null, newFilename)
  },
})

const upload = multer({ storage: storage })

@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [MediaController],
  providers: [],
})
export class MediaModule {}
