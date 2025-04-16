"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUniqueConstraintPrismaError = isUniqueConstraintPrismaError;
exports.isNotFoundPrismaError = isNotFoundPrismaError;
const client_1 = require("@prisma/client");
function isUniqueConstraintPrismaError(error) {
    return error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
}
function isNotFoundPrismaError(error) {
    return error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025';
}
//# sourceMappingURL=helpers.js.map