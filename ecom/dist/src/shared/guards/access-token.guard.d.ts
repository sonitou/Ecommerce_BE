import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from 'src/shared/services/token.service';
export declare class AccessTokenGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
