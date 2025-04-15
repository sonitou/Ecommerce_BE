import { Exclude } from 'class-transformer'
import { IsString, Length } from 'class-validator'
import { Match } from 'src/shared/decorators/custom-validator-decorators'

export class LoginBodyDTO {
  @IsString()
  email: string

  @IsString()
  @Length(6, 20, { message: 'Mật khẩu phải từ 6 đến 20 ký tự' })
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string

  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string
}

export class RegisterResDTO {
  id: number
  name: string
  email: string
  @Exclude()
  password: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial)
  }
}

export class LoginResDTO {
  accessToken: string
  refreshToken: string

  constructor(partial: Partial<LoginResDTO>) {
    Object.assign(this, partial)
  }
}

export class RefreshTokenBodyDTO {
  @IsString()
  refreshToken: string
}

export class LogoutBodyDTO extends RefreshTokenBodyDTO {}

export class LogoutResDTO {
  message: string
  constructor(partial: Partial<LogoutResDTO>) {
    Object.assign(this, partial)
  }
}
export class RefreshTokenResDTO extends LoginResDTO {}
