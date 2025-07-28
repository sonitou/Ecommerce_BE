import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common'
import { TokenService } from 'src/shared/services/token.service'
import { REQUEST_ROLE_PERMISSIONS, REQUEST_USER_KEY } from '../constants/auth.constants'
import { PrismaService } from '../services/prisma.service'
import { AccessTokenPayload } from '../types/jwt.types'
import { HTTPMethod } from '../constants/role.constants'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { RolePermissionsType } from '../models/shared-role.model'
import { keyBy } from 'lodash'

type Permission = RolePermissionsType['permissions'][number]
type CachedRole = RolePermissionsType & {
  permissions: {
    [key: string]: Permission
  }
}
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    // Extract và validate token
    const decodedAccessToken = await this.extractAndValidateToken(request)

    // Check user permission
    await this.validateUserPermission(decodedAccessToken, request)
    return true
  }

  private async extractAndValidateToken(request: any): Promise<AccessTokenPayload> {
    const accessToken = this.extractAccessTokenFromHeader(request)
    try {
      const decodedAccessToken = await this.tokenService.verifyAccessToken(accessToken)

      request[REQUEST_USER_KEY] = decodedAccessToken
      return decodedAccessToken
    } catch {
      throw new UnauthorizedException('Error.InvalidAccessToken')
    }
  }

  private extractAccessTokenFromHeader(request: any): string {
    const accessToken = request.headers.authorization?.split(' ')[1]
    if (!accessToken) {
      throw new UnauthorizedException('Error.MissingAccessToken')
    }
    return accessToken
  }

  private async validateUserPermission(decodedAccessToken: AccessTokenPayload, request: any): Promise<void> {
    const roleId: number = decodedAccessToken.roleId
    const path: string = request.route.path
    const method = request.method as keyof typeof HTTPMethod
    const cacheKey = `role${roleId}`
    let cachedRole = await this.cacheManager.get<CachedRole>(cacheKey)
    console.log('cachedRole:', cachedRole)
    if (cachedRole === undefined) {
      const role = await this.prismaService.role
        .findUniqueOrThrow({
          where: {
            id: roleId,
            deletedAt: null,
            isActive: true,
          },
          include: {
            permissions: {
              where: {
                deletedAt: null,
              },
            },
          },
        })
        .catch(() => {
          throw new ForbiddenException()
        })
      const permissionObject = keyBy(
        role.permissions,
        (permission) => `${permission.path}:${permission.method}`,
      ) as CachedRole['permissions']
      cachedRole = { ...role, permissions: permissionObject }
      // Cache role kèm quyền trong 5 phút (300s) hoặc tuỳ chỉnh
      await this.cacheManager.set(cacheKey, cachedRole, 1000 * 60 * 60) // 1 hour
      request[REQUEST_ROLE_PERMISSIONS] = cachedRole
    }
    const canAccess: Permission | undefined = cachedRole.permissions[`${path}:${method}`]
    if (!canAccess) {
      throw new ForbiddenException()
    }
  }
}
