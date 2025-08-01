import { Body, Controller, Get, Put } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { GetUserProfileResDTO, UpdateProfileResDTO } from 'src/shared/dtos/shared-user.dto'
import { ProfileService } from './profile.service'
import { ChangePasswordBodyDTO, UpdateMeBodyDTO } from './profile.dto'
import { MessageResDTO } from 'src/shared/dtos/response.dto'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ZodSerializerDto(GetUserProfileResDTO)
  getProfile(@ActiveUser('userId') userId: number) {
    return this.profileService.getProfileService(userId)
  }

  @Put()
  @ZodSerializerDto(UpdateProfileResDTO)
  updateProfileController(@Body() body: UpdateMeBodyDTO, @ActiveUser('userId') userId: number) {
    return this.profileService.updateProfileService({
      userId,
      body,
    })
  }

  @Put('change-password')
  @ZodSerializerDto(MessageResDTO)
  changePassword(@Body() body: ChangePasswordBodyDTO, @ActiveUser('userId') userId: number) {
    return this.profileService.changePasswordService({
      userId,
      body,
    })
  }
}
