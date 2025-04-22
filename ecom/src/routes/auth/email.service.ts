import { Injectable } from '@nestjs/common'
import { Resend } from 'resend'
import envConfig from 'src/shared/config'
import * as fs from 'fs'
import * as path from 'path'
const otpTemplate = fs.readFileSync(path.resolve('src/shared/email-templates/otp.html'), { encoding: 'utf-8' })
@Injectable()
export class EmailService {
  private resend: Resend
  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY)
  }

  sendOTP(payload: { email: string; code: string }) {
    const subject = 'Mã OTP của bạn'
    return this.resend.emails.send({
      from: 'Ecommerce <no-reply@docongson.io.vn>',
      to: [payload.email],
      subject,
      html: otpTemplate.replaceAll('{{subject}}', subject).replaceAll('{{code}}', payload.code),
    })
  }
}
