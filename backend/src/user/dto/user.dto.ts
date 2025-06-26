import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ description: '사용자 ID' })
  id: string

  @ApiProperty({ description: '이메일' })
  email: string

  @ApiProperty({ description: '이름' })
  name: string

  @ApiProperty({ description: '소개', nullable: true })
  bio: string | null

  @ApiProperty({ description: '관리자 여부' })
  isAdmin: boolean

  @ApiProperty({ description: '생성일시' })
  createdAt: Date

  @ApiProperty({ description: '수정일시' })
  updatedAt: Date
}