/* eslint-disable @typescript-eslint/only-throw-error */
import { plainToInstance } from 'class-transformer'
import { IsString, validateSync } from 'class-validator'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'

config({
  path: '.env',
})

// Kiểm tra coi thử có file .env hay chưa
if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Không tìm thấy file .env')
  process.exit(1)
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string
  @IsString()
  ACCESS_TOKEN_SECRET: string
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string
  @IsString()
  REFRESH_TOKEN_SECRET: string
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
  @IsString()
  SECRET_API_KEY: string
}
const configServer = plainToInstance(ConfigSchema, process.env, {
  enableImplicitConversion: true,
})
const errorArray = validateSync(configServer)

if (errorArray.length > 0) {
  console.log('Các giá trị khai báo trong file .env không hợp lệ')
  const errors = errorArray.map((eItem) => {
    return {
      property: eItem.property,
      constraints: eItem.constraints,
      value: eItem.value,
    }
  })
  throw errors
}

const envConfig = configServer

export default envConfig
