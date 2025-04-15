"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.AUTH_TYPE_KEY = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../constants/auth.constants");
exports.AUTH_TYPE_KEY = 'authType';
const Auth = (authTypes, options) => {
    return (0, common_1.SetMetadata)(exports.AUTH_TYPE_KEY, { authTypes, options: options ?? { condition: auth_constants_1.ConditionGuard.And } });
};
exports.Auth = Auth;
//# sourceMappingURL=auth.decorators.js.map