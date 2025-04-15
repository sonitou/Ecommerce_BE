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
exports.AuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../constants/auth.constants");
const core_1 = require("@nestjs/core");
const api_key_guard_1 = require("./api-key.guard");
const access_token_guard_1 = require("./access-token.guard");
const auth_decorators_1 = require("../decorators/auth.decorators");
let AuthenticationGuard = class AuthenticationGuard {
    reflector;
    accessTokenGuard;
    apiKeyGuard;
    authTypeGuardMap;
    constructor(reflector, accessTokenGuard, apiKeyGuard) {
        this.reflector = reflector;
        this.accessTokenGuard = accessTokenGuard;
        this.apiKeyGuard = apiKeyGuard;
        this.authTypeGuardMap = {
            [auth_constants_1.AuthType.Bearer]: this.accessTokenGuard,
            [auth_constants_1.AuthType.APIKey]: this.apiKeyGuard,
            [auth_constants_1.AuthType.None]: { canActivate: () => true },
        };
    }
    async canActivate(context) {
        const authTypeValue = this.reflector.getAllAndOverride(auth_decorators_1.AUTH_TYPE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]) ?? { authTypes: [auth_constants_1.AuthType.None], options: { condition: auth_constants_1.ConditionGuard.And } };
        const guards = authTypeValue.authTypes.map((authType) => this.authTypeGuardMap[authType]);
        let error = new common_1.UnauthorizedException();
        if (authTypeValue.options.condition === auth_constants_1.ConditionGuard.Or) {
            for (const instance of guards) {
                const canActivate = await Promise.resolve(instance.canActivate(context)).catch((err) => {
                    error = err;
                    return false;
                });
                if (canActivate) {
                    return true;
                }
            }
            throw error;
        }
        else {
            for (const instance of guards) {
                const canActivate = await Promise.resolve(instance.canActivate(context)).catch((err) => {
                    error = err;
                    return false;
                });
                if (!canActivate) {
                    throw new common_1.UnauthorizedException();
                }
            }
            return true;
        }
    }
};
exports.AuthenticationGuard = AuthenticationGuard;
exports.AuthenticationGuard = AuthenticationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        access_token_guard_1.AccessTokenGuard,
        api_key_guard_1.APIKeyGuard])
], AuthenticationGuard);
//# sourceMappingURL=authentication.guard.js.map