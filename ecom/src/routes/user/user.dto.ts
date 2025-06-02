import { createZodDto } from 'nestjs-zod'
import {
  CreateUserBodySchema,
  GetUsersParamsSchema,
  GetUsersQuerySchema,
  GetUsersResSchema,
  UpdateUserBodySchema,
} from './user.model'
import { UpdateProfileResDTO } from 'src/shared/dtos/shared-user.dto'

export class GetUsersResDTO extends createZodDto(GetUsersResSchema) {}
export class GetUsersQueryDTO extends createZodDto(GetUsersQuerySchema) {}
export class GetUsersParamsDTO extends createZodDto(GetUsersParamsSchema) {}
export class CreateUserBodyDTO extends createZodDto(CreateUserBodySchema) {}
export class UpdateUserBodyDTO extends createZodDto(UpdateUserBodySchema) {}
export class CreateUserResDTO extends UpdateProfileResDTO {}
