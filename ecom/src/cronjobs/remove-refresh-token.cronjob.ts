import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class RemoveRefreshTokenCronjob {
  private readonly logger = new Logger(RemoveRefreshTokenCronjob.name)
  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  async handleCron() {
    const refreshTokens = await this.prismaService.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })
    this.logger.debug(`Đã xoá ${refreshTokens.count} refresh token hết hạn`)
    console.log(refreshTokens)
  }
}
