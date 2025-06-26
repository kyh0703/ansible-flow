import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`

    await this.mailerService.sendMail({
      to: email,
      subject: '🔐 Ansible Flow - 비밀번호 재설정',
      html: `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>비밀번호 재설정</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">🔐 비밀번호 재설정</h1>
              <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Ansible Flow</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 20px;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">안녕하세요!</h2>
              
              <p style="color: #475569; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                비밀번호 재설정을 요청하셨습니다. 아래 버튼을 클릭하여 새로운 비밀번호를 설정해주세요.
              </p>
              
              <!-- Reset Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="
                  display: inline-block;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: #ffffff;
                  text-decoration: none;
                  padding: 16px 32px;
                  border-radius: 8px;
                  font-weight: 600;
                  font-size: 16px;
                  box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.4);
                  transition: all 0.3s ease;
                ">
                  🔑 비밀번호 재설정하기
                </a>
              </div>
              
              <p style="color: #64748b; font-size: 14px; margin: 20px 0; line-height: 1.5;">
                버튼이 작동하지 않는다면 아래 링크를 복사하여 브라우저에 붙여넣으세요:<br>
                <span style="background-color: #f1f5f9; padding: 8px; border-radius: 4px; font-family: monospace; word-break: break-all;">${resetUrl}</span>
              </p>
              
              <!-- Warning Box -->
              <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
                  ⚠️ <strong>중요:</strong> 이 링크는 1시간 후에 만료됩니다. 보안을 위해 가능한 빨리 비밀번호를 재설정해주세요.
                </p>
              </div>
              
              <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0; line-height: 1.5;">
                만약 비밀번호 재설정을 요청하지 않으셨다면, 이 메일을 무시하시면 됩니다. 귀하의 계정은 안전합니다.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 14px;">
                이 메일은 Ansible Flow에서 자동으로 발송되었습니다.<br>
                문의사항이 있으시면 고객지원팀에 연락해주세요.
              </p>
              <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 12px;">
                © 2024 Ansible Flow. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
  }

  async sendPasswordResetSuccessEmail(email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: '✅ Ansible Flow - 비밀번호 변경 완료',
      html: `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>비밀번호 변경 완료</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">✅ 비밀번호 변경 완료</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Ansible Flow</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 20px;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">안녕하세요!</h2>
              
              <p style="color: #475569; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                귀하의 Ansible Flow 계정 비밀번호가 성공적으로 변경되었습니다.
              </p>
              
              <!-- Success Icon -->
              <div style="text-align: center; margin: 30px 0;">
                <div style="
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  width: 80px;
                  height: 80px;
                  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                  border-radius: 50%;
                  box-shadow: 0 8px 25px 0 rgba(16, 185, 129, 0.3);
                ">
                  <span style="font-size: 40px;">🔒</span>
                </div>
              </div>
              
              <div style="background-color: #f0fdf4; border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
                <p style="color: #065f46; margin: 0; font-size: 16px; font-weight: 600;">
                  🎉 비밀번호 변경이 완료되었습니다!
                </p>
                <p style="color: #047857; margin: 10px 0 0 0; font-size: 14px;">
                  이제 새로운 비밀번호로 로그인하실 수 있습니다.
                </p>
              </div>
              
              <!-- Security Info -->
              <div style="background-color: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="color: #1e40af; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">
                  🛡️ 보안 알림
                </p>
                <ul style="color: #1e40af; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.5;">
                  <li>변경 시간: ${new Date().toLocaleString('ko-KR')}</li>
                  <li>만약 본인이 변경하지 않았다면, 계정이 해킹되었을 수 있습니다.</li>
                  <li>의심스러운 활동이 발견되면 즉시 고객지원팀에 연락해주세요.</li>
                </ul>
              </div>
              
              <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0; line-height: 1.5;">
                계정 보안을 위해 정기적으로 비밀번호를 변경하시기 바랍니다.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 14px;">
                이 메일은 Ansible Flow에서 자동으로 발송되었습니다.<br>
                문의사항이 있으시면 고객지원팀에 연락해주세요.
              </p>
              <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 12px;">
                © 2024 Ansible Flow. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
  }
}
