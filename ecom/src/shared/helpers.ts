import { Prisma } from '@prisma/client'
import { randomInt } from 'crypto'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Type Predicate
export function isUniqueConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

export function isNotFoundPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}

export const generateOTP = (): string => {
  return String(randomInt(0, 1000000)).padStart(6, '0')
}

export function isForeignKeyConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003'
}

export const generateRandomFilename = (filename: string) => {
  const ext = path.extname(filename)
  return `${uuidv4()}${ext}`
}

export const generateCancelPaymentJobId = (paymentId: number) => {
  return `paymentId-${paymentId}`
}

export const generateRoomUserId = (userId: number) => {
  return `userId-${userId}`
}
