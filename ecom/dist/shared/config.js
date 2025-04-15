"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: '.env',
});
if (!fs.existsSync(path.resolve('.env'))) {
    console.log('Không tìm thấy file .env');
    process.exit(1);
}
class ConfigSchema {
    DATABASE_URL;
    ACCESS_TOKEN_SECRET;
    ACCESS_TOKEN_EXPIRES_IN;
    REFRESH_TOKEN_SECRET;
    REFRESH_TOKEN_EXPIRES_IN;
    SECRET_API_KEY;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfigSchema.prototype, "DATABASE_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfigSchema.prototype, "ACCESS_TOKEN_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfigSchema.prototype, "ACCESS_TOKEN_EXPIRES_IN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfigSchema.prototype, "REFRESH_TOKEN_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfigSchema.prototype, "REFRESH_TOKEN_EXPIRES_IN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfigSchema.prototype, "SECRET_API_KEY", void 0);
const configServer = (0, class_transformer_1.plainToInstance)(ConfigSchema, process.env, {
    enableImplicitConversion: true,
});
const errorArray = (0, class_validator_1.validateSync)(configServer);
if (errorArray.length > 0) {
    console.log('Các giá trị khai báo trong file .env không hợp lệ');
    const errors = errorArray.map((eItem) => {
        return {
            property: eItem.property,
            constraints: eItem.constraints,
            value: eItem.value,
        };
    });
    throw errors;
}
const envConfig = configServer;
exports.default = envConfig;
//# sourceMappingURL=config.js.map