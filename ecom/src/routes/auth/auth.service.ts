/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { HashingService } from 'src/shared/services/hashing.service'
import { RolesService } from './roles.service'
import { generateOTP, isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { LoginBodyType, RefreshTokenBodyType, RegisterBodyType, SendOTPBodyType } from './auth.model'
import { AuthRepository } from './auth.repo'
import { SharedUserRepository } from 'src/shared/repositories/shared-user-repo'
import envConfig from 'src/shared/config'
import * as ms from 'ms'
import { addMilliseconds } from 'date-fns'
import { TypeOfVerificationCode } from 'src/shared/constants/auth.constants'
import { EmailService } from './email.service'
import { TokenService } from 'src/shared/services/token.service'
import { AccessTokenPayloadCreate } from 'src/shared/types/jwt.types'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly rolesService: RolesService,
    private readonly authRepository: AuthRepository,
    private readonly sharedUserRepository: SharedUserRepository,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
  ) {}

  async register(body: RegisterBodyType) {
    try {
      const verificationCode = await this.authRepository.findUniqueVerificationCode({
        email_code_type: {
          email: body.email,
          code: body.code,
          type: TypeOfVerificationCode.REGISTER,
        },
      })

      if (!verificationCode) {
        throw new UnprocessableEntityException([
          {
            message: 'Mã OTP không hợp lệ hoặc đã hết hạn',
            path: 'code',
          },
        ])
      }
      if (verificationCode.expiresAt < new Date()) {
        throw new UnprocessableEntityException([
          {
            message: 'Mã OTP đã hết hạn',
            path: 'code',
          },
        ])
      }

      const clientRoleId = await this.rolesService.getClientRoleId()
      const hashedPassword = await this.hashingService.hash(body.password)
      return await this.authRepository.createUser({
        email: body.email,
        name: body.name,
        phoneNumber: body.phoneNumber,
        password: hashedPassword,
        roleId: clientRoleId,
      })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new UnprocessableEntityException([
          {
            message: 'Email already exists',
            path: 'email',
          },
        ])
      }
      throw error
    }
  }

  async sendOTP(body: SendOTPBodyType) {
    // 1. kiểm tra xem email đã tồn tại trong db chưa
    const user = await this.sharedUserRepository.findUnique({ email: body.email })
    if (user) {
      throw new UnprocessableEntityException([
        {
          message: 'Email is not exists',
          path: 'email',
        },
      ])
    }
    // 2. tạo mã OTP
    const code = generateOTP()
    const verificationCode = this.authRepository.createVerificationCode({
      email: body.email,
      code,
      type: body.type,
      expiresAt: addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRES_IN)),
    })

    // 3. Gửi OTP qua email
    const { error } = await this.emailService.sendOTP({
      email: body.email,
      code,
    })

    if (error) {
      throw new UnprocessableEntityException([
        {
          message: 'Gửi mã OTP không thành công',
          path: 'email',
        },
      ])
    }
    return verificationCode
  }

  async login(body: LoginBodyType & { userAgent: string; ip: string }) {
    const user = await this.authRepository.findUniqueUserIncludeRole({
      email: body.email,
    })

    if (!user) {
      throw new UnprocessableEntityException([
        {
          message: 'Email không tồn tại',
          path: 'email',
        },
      ])
    }

    const isValidPassword = await this.hashingService.comparePassword(body.password, user.password)
    if (!isValidPassword) {
      throw new UnprocessableEntityException([
        {
          field: 'Password',
          error: 'Mật khẩu không chính xác',
        },
      ])
    }

    const device = await this.authRepository.createDevice({
      userId: user.id,
      userAgent: body.userAgent,
      ip: body.ip,
    })
    const tokens = await this.generateTokens({
      userId: user.id,
      deviceId: device.id,
      roleId: user.roleId,
      roleName: user.role.name,
    })
    return tokens
  }

  async generateTokens({ userId, deviceId, roleId, roleName }: AccessTokenPayloadCreate) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({ userId, deviceId, roleId, roleName }),
      this.tokenService.signRefreshToken({ userId }),
    ])
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    await this.authRepository.createRefreshToken({
      token: refreshToken,
      userId,
      expiresAt: new Date(decodedRefreshToken.exp * 1000),
      deviceId,
    })
    return { accessToken, refreshToken }
  }

  async refreshToken({ refreshToken, userAgent, ip }: RefreshTokenBodyType & { userAgent: string; ip: string }) {
    try {
      // kiểm tra refreshToken có hợp lệ không
      const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)
      // kiểm tra refreshToken có tồn tại trong db không
      const refreshTokenInDb = await this.authRepository.findUniqueRefreshTokenIncludeUserRole({
        token: refreshToken,
      })

      if (!refreshTokenInDb) {
        throw new UnauthorizedException('Refresh token đã được sử dụng')
      }
      const {
        deviceId,
        user: {
          roleId,
          role: { name: roleName },
        },
      } = refreshTokenInDb

      // Cập nhật lại thông tin device
      const $updateDevice = this.authRepository.updateDevice(deviceId, {
        ip,
        userAgent,
      })
      // xoá refreshToken đã sử dụng
      const $deteleRefreshToken = this.authRepository.deleteRefreshToken({
        token: refreshToken,
      })
      // tạo mới accessToken và refreshToken
      const $tokens = this.generateTokens({ userId, roleId, roleName, deviceId })
      const [, , tokens] = await Promise.all([$updateDevice, $deteleRefreshToken, $tokens])
      return tokens
    } catch (error) {
      // TH đã refresh token rồi, hãy thống báo cho user biết
      // refresh token của họ đã bị đánh cắp
      if (error instanceof HttpException) {
        throw error
      }
      throw new UnauthorizedException()
    }
  }

  // async logout(refreshToken: string) {
  //   try {
  //     // 1. Kiểm tra refreshToken có hợp lệ không
  //     await this.tokenService.verifyRefreshToken(refreshToken)
  //     // 2. Xóa refreshToken trong database
  //     await this.prismaService.refreshToken.delete({
  //       where: {
  //         token: refreshToken,
  //       },
  //     })
  //     return { message: 'Logout successfully' }
  //   } catch (error) {
  //     // Trường hợp đã refresh token rồi, hãy thông báo cho user biết
  //     // refresh token của họ đã bị đánh cắp
  //     if (isNotFoundPrismaError(error)) {
  //       throw new UnauthorizedException('Refresh token has been revoked')
  //     }
  //     throw new UnauthorizedException()
  //   }
  // }
}
