/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ConflictException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { TokenService } from 'src/shared/services/token.service'
import { v4 as uuidv4 } from 'uuid'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { RolesService } from './roles.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly rolesService: RolesService,
  ) {}

  async register(body: any) {
    try {
      const clientRoleId = await this.rolesService.getClientRoleId()
      const hashedPassword = await this.hashingService.hash(body.password)
      const user = await this.prismaService.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
          phoneNumber: body.phoneNumber,
          roleId: clientRoleId,
        },
        omit: {
          password: true,
          totpSecret: true,
        },
      })
      return user
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new ConflictException('Email already exists')
      }
      throw error
    }
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
