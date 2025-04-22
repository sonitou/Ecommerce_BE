import { Injectable } from '@nestjs/common'
import { Resend } from 'resend'
import envConfig from 'src/shared/config'
import * as React from 'react'
import OTPEmail from 'emails/otp'
import { render } from '@react-email/render'

// otpTemplate.replaceAll('{{subject}}', subject).replaceAll('{{code}}', payload.code),
// const otpTemplate = fs.readFileSync(path.resolve('src/shared/email-templates/otp.html'), { encoding: 'utf-8' })
@Injectable()
export class EmailService {
  private resend: Resend
  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY)
  }

  async sendOTP(payload: { email: string; code: string }) {
    const subject = 'Mã OTP của bạn'
    const html = await render(<OTPEmail otpCode={payload.code} title={subject} />, {})
    return this.resend.emails.send({
      from: 'Ecommerce <no-reply@docongson.io.vn>',
      to: [payload.email],
      subject,
      html,
      // react: <OTPEmail otpCode={payload.code} title={subject} />,
    })
  }
}
