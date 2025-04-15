import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { APIKeyGuard } from './api-key.guard';
import { AccessTokenGuard } from './access-token.guard';
export declare class AuthenticationGuard implements CanActivate {
    private readonly reflector;
    private readonly accessTokenGuard;
    private readonly apiKeyGuard;
    private readonly authTypeGuardMap;
    constructor(reflector: Reflector, accessTokenGuard: AccessTokenGuard, apiKeyGuard: APIKeyGuard);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
