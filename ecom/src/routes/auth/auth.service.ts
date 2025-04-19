/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ConflictException, Injectable } from '@nestjs/common'
import { HashingService } from 'src/shared/services/hashing.service'
import { RolesService } from './roles.service'
import { isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { RegisterBodyType, SendOTPBodyType } from './auth.model'
import { AuthRepository } from './auth.repo'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly rolesService: RolesService,
    private readonly authRepository: AuthRepository,
  ) {}

  async register(body: RegisterBodyType) {
    try {
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
        throw new ConflictException('Email already exists')
      }
      throw error
    }
  }

  sendOTP(body: SendOTPBodyType) {
    return body
  }

  // async login(body: any) {
  //   const user = await this.prismaService.user.findUnique({
  //     where: { email: body.email },
  //   })

  //   if (!user) {
  //     throw new UnauthorizedException('Account is not exits')
  //   }

  //   const isValidPassword = await this.hashingService.comparePassword(body.password, user.password)
  //   if (!isValidPassword) {
  //     throw new UnprocessableEntityException([
  //       {
  //         field: 'Password',
  //         error: 'Password is incorrect',
  //       },
  //     ])
  //   }
  //   const tokens = await this.generateTokens({ userId: user.id })
  //   return tokens
  // }

  // async generateTokens(payload: { userId: number }) {
  //   // Đảm bảo refresh token là duy nhất (tránh bị tạo trùng nếu user gửi nhiều request liên tiếp).
  //   const refreshTokenPayload = { userId: payload.userId, jti: uuidv4() }
  //   console.log(refreshTokenPayload)
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.tokenService.signAccessToken(payload),
  //     this.tokenService.signRefreshToken(refreshTokenPayload),
  //   ])
  //   const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
  //   await this.prismaService.refreshToken.create({
  //     data: {
  //       token: refreshToken,
  //       userId: payload.userId,
  //       expiresAt: new Date(decodedRefreshToken.exp * 1000),
  //     },
  //   })
  //   return { accessToken, refreshToken }
  // }

  // async refreshToken(refreshToken: string) {
  //   try {
  //     // kiểm tra refreshToken có hợp lệ không
  //     const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)
  //     // kiểm tra refreshToken có tồn tại trong db không
  //     await this.prismaService.refreshToken.findUniqueOrThrow({
  //       where: { token: refreshToken },
  //     })
  //     // xoá refreshToken đã sử dụng
  //     await this.prismaService.refreshToken.delete({
  //       where: {
  //         token: refreshToken,
  //       },
  //     })
  //     // tạo mới accessToken và refreshToken
  //     return await this.generateTokens({ userId })
  //   } catch (error) {
  //     // TH đã refresh token rồi, hãy thống báo cho user biết
  //     // refresh token của họ đã bị đánh cắp
  //     if (isNotFoundPrismaError(error)) {
  //       throw new UnauthorizedException('Refresh token đã hết hạn')
  //     }
  //     throw new UnauthorizedException()
  //   }
  // }

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
