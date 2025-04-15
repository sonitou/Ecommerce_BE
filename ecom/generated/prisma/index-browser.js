
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.LanguageScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  password: 'password',
  phoneNumber: 'phoneNumber',
  avatar: 'avatar',
  totpSecret: 'totpSecret',
  status: 'status',
  roleId: 'roleId',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserTranslationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  languageId: 'languageId',
  address: 'address',
  description: 'description',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationCodeScalarFieldEnum = {
  id: 'id',
  email: 'email',
  code: 'code',
  type: 'type',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.DeviceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  userAgent: 'userAgent',
  ip: 'ip',
  lastActive: 'lastActive',
  createdAt: 'createdAt',
  isActive: 'isActive'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  token: 'token',
  userId: 'userId',
  deviceId: 'deviceId',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  path: 'path',
  method: 'method',
  module: 'module',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  isActive: 'isActive',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  base_price: 'base_price',
  virtual_price: 'virtual_price',
  brandId: 'brandId',
  images: 'images',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductTranslationScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  languageId: 'languageId',
  name: 'name',
  description: 'description',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  parentCategoryId: 'parentCategoryId',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryTranslationScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  languageId: 'languageId',
  name: 'name',
  description: 'description',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VariantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  productId: 'productId',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VariantOptionScalarFieldEnum = {
  id: 'id',
  value: 'value',
  variantId: 'variantId',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SKUScalarFieldEnum = {
  id: 'id',
  value: 'value',
  price: 'price',
  stock: 'stock',
  images: 'images',
  productId: 'productId',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  logo: 'logo',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BrandTranslationScalarFieldEnum = {
  id: 'id',
  brandId: 'brandId',
  languageId: 'languageId',
  name: 'name',
  description: 'description',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CartItemScalarFieldEnum = {
  id: 'id',
  quantity: 'quantity',
  skuId: 'skuId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductSKUSnapshotScalarFieldEnum = {
  id: 'id',
  productName: 'productName',
  price: 'price',
  images: 'images',
  skuValue: 'skuValue',
  skuId: 'skuId',
  orderId: 'orderId',
  createdAt: 'createdAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  status: 'status',
  createdById: 'createdById',
  updatedById: 'updatedById',
  deletedById: 'deletedById',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  content: 'content',
  rating: 'rating',
  productId: 'productId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentTransactionScalarFieldEnum = {
  id: 'id',
  gateway: 'gateway',
  transactionDate: 'transactionDate',
  accountNumber: 'accountNumber',
  subAccount: 'subAccount',
  amountIn: 'amountIn',
  amountOut: 'amountOut',
  accumulated: 'accumulated',
  code: 'code',
  transactionContent: 'transactionContent',
  referenceNumber: 'referenceNumber',
  body: 'body',
  createdAt: 'createdAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  fromUserId: 'fromUserId',
  toUserId: 'toUserId',
  content: 'content',
  readAt: 'readAt',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserStatus = exports.$Enums.UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED'
};

exports.VerificationCodeType = exports.$Enums.VerificationCodeType = {
  REGISTER: 'REGISTER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  LOGIN: 'LOGIN',
  DISABLE_2FA: 'DISABLE_2FA'
};

exports.HTTPMethod = exports.$Enums.HTTPMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING_CONFIRMATION: 'PENDING_CONFIRMATION',
  PENDING_PICKUP: 'PENDING_PICKUP',
  PENDING_DELIVERY: 'PENDING_DELIVERY',
  DELIVERED: 'DELIVERED',
  RETURNED: 'RETURNED',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  Language: 'Language',
  User: 'User',
  UserTranslation: 'UserTranslation',
  VerificationCode: 'VerificationCode',
  Device: 'Device',
  RefreshToken: 'RefreshToken',
  Permission: 'Permission',
  Role: 'Role',
  Product: 'Product',
  ProductTranslation: 'ProductTranslation',
  Category: 'Category',
  CategoryTranslation: 'CategoryTranslation',
  Variant: 'Variant',
  VariantOption: 'VariantOption',
  SKU: 'SKU',
  Brand: 'Brand',
  BrandTranslation: 'BrandTranslation',
  CartItem: 'CartItem',
  ProductSKUSnapshot: 'ProductSKUSnapshot',
  Order: 'Order',
  Review: 'Review',
  PaymentTransaction: 'PaymentTransaction',
  Message: 'Message'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
