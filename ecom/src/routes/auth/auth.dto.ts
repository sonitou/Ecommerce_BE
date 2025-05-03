import { createZodDto } from 'nestjs-zod'
import {
  DisableTwoFactorBodySchema,
  ForgotPasswordBodySchema,
  GetAuthorizationUrlResSchema,
  LoginBodySchema,
  LoginResSchema,
  LogoutBodySchema,
  RefreshTokenBodySchema,
  RefreshTokenResSchema,
  RegisterBodySchema,
  RegisterResSchema,
  SendOTPBodySchema,
  TwoFactorSetupResSchema,
} from './auth.model'

// class is required for using DTO as a type
export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class RegisterResDTO extends createZodDto(RegisterResSchema) {}
export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}
export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}
export class LoginResDTO extends createZodDto(LoginResSchema) {}
export class RefreshTokenBodyDTO extends createZodDto(RefreshTokenBodySchema) {}
export class RefreshTokenResDTO extends createZodDto(RefreshTokenResSchema) {}
export class LogoutBodyDTO extends createZodDto(LogoutBodySchema) {}

export class GetAuthorizationUrlResDTO extends createZodDto(GetAuthorizationUrlResSchema) {}
export class ForgotPasswordBodyDTO extends createZodDto(ForgotPasswordBodySchema) {}

export class DisableTwoFactorBodyDTO extends createZodDto(DisableTwoFactorBodySchema) {}
export class TwoFactorSetupResDTO extends createZodDto(TwoFactorSetupResSchema) {}
