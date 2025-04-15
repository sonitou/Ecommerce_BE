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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config");
let TokenService = class TokenService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    signAccessToken(payload) {
        return this.jwtService.sign(payload, {
            secret: config_1.default.ACCESS_TOKEN_SECRET,
            expiresIn: config_1.default.ACCESS_TOKEN_EXPIRES_IN,
            algorithm: 'HS256',
        });
    }
    signRefreshToken(payload) {
        return this.jwtService.sign(payload, {
            secret: config_1.default.REFRESH_TOKEN_SECRET,
            expiresIn: config_1.default.REFRESH_TOKEN_EXPIRES_IN,
            algorithm: 'HS256',
        });
    }
    verifyAccessToken(token) {
        return this.jwtService.verifyAsync(token, {
            secret: config_1.default.ACCESS_TOKEN_SECRET,
        });
    }
    verifyRefreshToken(token) {
        return this.jwtService.verifyAsync(token, {
            secret: config_1.default.REFRESH_TOKEN_SECRET,
        });
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=token.service.js.map