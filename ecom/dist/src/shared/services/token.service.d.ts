import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../types/jwt.types';
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signAccessToken(payload: {
        userId: number;
    }): string;
    signRefreshToken(payload: {
        userId: number;
    }): string;
    verifyAccessToken(token: string): Promise<TokenPayload>;
    verifyRefreshToken(token: string): Promise<TokenPayload>;
}
