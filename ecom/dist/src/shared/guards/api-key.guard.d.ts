import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class APIKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
