"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../services/token.service");
const auth_constants_1 = require("../constants/auth.constants");
let AccessTokenGuard = class AccessTokenGuard {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.authorization?.split(' ')[1];
        if (!accessToken) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const decodedAccessToken = await this.tokenService.verifyAccessToken(accessToken);
            request[auth_constants_1.REQUEST_USER_KEY] = decodedAccessToken;
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AccessTokenGuard = AccessTokenGuard;
exports.AccessTokenGuard = AccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], AccessTokenGuard);
//# sourceMappingURL=access-token.guard.js.map