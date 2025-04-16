"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)({
    path: '.env',
});
if (!fs.existsSync(path.resolve('.env'))) {
    console.log('Không tìm thấy file .env');
    process.exit(1);
}
const ConfigSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string(),
    ACCESS_TOKEN_SECRET: zod_1.z.string(),
    ACCESS_TOKEN_EXPIRES_IN: zod_1.z.string(),
    REFRESH_TOKEN_SECRET: zod_1.z.string(),
    REFRESH_TOKEN_EXPIRES_IN: zod_1.z.string(),
    SECRET_API_KEY: zod_1.z.string(),
    ADMIN_EMAIL: zod_1.z.string(),
    ADMIN_PASSWORD: zod_1.z.string(),
    ADMIN_NAME: zod_1.z.string(),
    ADMIN_PHONE_NUMBER: zod_1.z.string(),
});
const configServer = ConfigSchema.safeParse(process.env);
if (!configServer.success) {
    console.log('Các giá trị khai báo trong file .env không hợp lệ');
    console.error(configServer.error);
    process.exit(1);
}
const envConfig = configServer.data;
exports.default = envConfig;
//# sourceMappingURL=config.js.map