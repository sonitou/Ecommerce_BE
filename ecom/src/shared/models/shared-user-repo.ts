import { z } from 'zod'
import { UserStatus } from '../constants/auth.constants'

export const UserSchema = z.object({
  id: z.number(),
  email: z.string({ message: 'Error.InvalidEmail' }).email({ message: 'Error.InvalidEmail' }),
  name: z
    .string({ message: 'Error.InvalidName' })
    .min(1, { message: 'Error.InvalidName' })
    .max(100, { message: 'Error.InvalidName' }),
  password: z
    .string({ message: 'Error.InvalidPassword' })
    .min(6, { message: 'Error.InvalidPassword' })
    .max(100, { message: 'Error.InvalidPassword' }),
  phoneNumber: z
    .string({ message: 'Error.InvalidPhoneNumber' })
    .min(10, { message: 'Error.InvalidPhoneNumber' })
    .max(15, { message: 'Error.InvalidPhoneNumber' }),
  avatar: z.string({ message: 'Error.InvalidAvatar' }).nullable(),
  totpSecret: z.string({ message: 'Error.InvalidTotpSecret' }).nullable(),
  status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED], {
    errorMap: () => ({ message: 'Error.InvalidStatus' }),
  }),
  roleId: z.number({ message: 'Error.InvalidRoleId' }).positive({ message: 'Error.InvalidRoleId' }),
  createdById: z.number({ message: 'Error.InvalidCreatedById' }).nullable(),
  updatedById: z.number({ message: 'Error.InvalidUpdatedById' }).nullable(),
  deletedAt: z.date({ required_error: 'Error.InvalidDeletedAt' }).nullable(),
  createdAt: z.date({ required_error: 'Error.InvalidCreatedAt' }),
  updatedAt: z.date({ required_error: 'Error.InvalidUpdatedAt' }),
})

export type UserType = z.infer<typeof UserSchema>
