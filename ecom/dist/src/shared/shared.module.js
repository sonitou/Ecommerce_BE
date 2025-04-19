"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./services/prisma.service");
const hashing_service_1 = require("./services/hashing.service");
const token_service_1 = require("./services/token.service");
const jwt_1 = require("@nestjs/jwt");
const access_token_guard_1 = require("./guards/access-token.guard");
const api_key_guard_1 = require("./guards/api-key.guard");
const authentication_guard_1 = require("./guards/authentication.guard");
const shared_user_repo_1 = require("./repositories/shared-user-repo");
const sharedService = [prisma_service_1.PrismaService, hashing_service_1.HashingService, token_service_1.TokenService, shared_user_repo_1.SharedUserRepository];
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            ...sharedService,
            access_token_guard_1.AccessTokenGuard,
            api_key_guard_1.APIKeyGuard,
            {
                provide: 'APP_GUARD',
                useClass: authentication_guard_1.AuthenticationGuard,
            },
        ],
        exports: sharedService,
        imports: [jwt_1.JwtModule],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map