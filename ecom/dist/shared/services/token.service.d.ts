import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../types/jwt.types';
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signAccessToken(payload: {
        userId: number;
    }): any;
    signRefreshToken(payload: {
        userId: number;
    }): any;
    verifyAccessToken(token: string): Promise<TokenPayload>;
    verifyRefreshToken(token: string): Promise<TokenPayload>;
}
