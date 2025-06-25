import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

    await this.mailerService.sendMail({
      to: email,
      subject: '비밀번호 재설정',
      html: `
        <h2>비밀번호 재설정</h2>
        <p>안녕하세요,</p>
        <p>비밀번호 재설정을 요청하셨습니다. 아래 링크를 클릭하여 새로운 비밀번호를 설정하세요.</p>
        <p><a href="${resetUrl}" style="color: #007bff; text-decoration: none;">비밀번호 재설정하기</a></p>
        <p>이 링크는 1시간 후에 만료됩니다.</p>
        <p>만약 비밀번호 재설정을 요청하지 않으셨다면, 이 메일을 무시하세요.</p>
        <br>
        <p>감사합니다.</p>
      `,
    })
  }
}
