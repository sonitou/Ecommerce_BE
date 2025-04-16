"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../src/shared/config");
const role_constants_1 = require("../src/shared/constants/role.constants");
const hashing_service_1 = require("../src/shared/services/hashing.service");
const prisma_service_1 = require("../src/shared/services/prisma.service");
const prisma = new prisma_service_1.PrismaService();
const hashingService = new hashing_service_1.HashingService();
const main = async () => {
    const roleCount = await prisma.role.count();
    if (roleCount > 0) {
        throw new Error('Roles already exist');
    }
    const roles = await prisma.role.createMany({
        data: [
            { name: role_constants_1.RoleName.Admin, description: 'Admin role' },
            { name: role_constants_1.RoleName.Client, description: 'Client role' },
            { name: role_constants_1.RoleName.Seller, description: 'Seller role' },
        ],
    });
    const adminRole = await prisma.role.findFirstOrThrow({
        where: { name: role_constants_1.RoleName.Admin },
    });
    const hashedPassword = await hashingService.hash(config_1.default.ADMIN_PASSWORD);
    const adminUser = await prisma.user.create({
        data: {
            email: config_1.default.ADMIN_EMAIL,
            password: hashedPassword,
            name: config_1.default.ADMIN_NAME,
            phoneNumber: config_1.default.ADMIN_PHONE_NUMBER,
            roleId: adminRole.id,
        },
    });
    return {
        createdRoleCount: roles.count,
        adminUser,
    };
};
main()
    .then(({ adminUser, createdRoleCount }) => {
    console.log(`Created ${createdRoleCount} roles`);
    console.log(`Created admin user: ${adminUser.email}`);
})
    .catch(console.error);
//# sourceMappingURL=index.js.map