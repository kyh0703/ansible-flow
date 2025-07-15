import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormInput from '@/shared/components/form-input'
import FormTextArea from '@/shared/components/form-text-area'
import { ModalAction, ModalContent } from '@/shared/components/modal'
import { Button } from '@/shared/ui/button'
import { useUser, useUserActions } from '@/shared/store/user'
import { useUpdateMe } from '@/domain/auth/services'

const userProfileSchema = z.object({
  name: z
    .string()
    .min(1, '이름은 필수입니다.')
    .max(50, '이름은 50자 이하여야 합니다.'),
  bio: z.string().max(500, '자기소개는 500자 이하여야 합니다.').optional(),
  profileImage: z
    .string()
    .url('올바른 URL 형식이어야 합니다.')
    .optional()
    .or(z.literal('')),
})

type UserProfileFormData = z.infer<typeof userProfileSchema>

type UserProfileModalProps = {
  onClose?: (result: boolean) => void
}

export default function UserProfileModal({ onClose }: UserProfileModalProps) {
  const user = useUser()
  const { setUser } = useUserActions()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
      profileImage: user?.profileImage || '',
    },
  })

  const updateMeMutation = useUpdateMe({
    onSuccess: (updatedUser) => {
      setUser(updatedUser)
      onClose?.(true)
    },
  })

  const onSubmit = (data: UserProfileFormData) => {
    const updateData = {
      name: data.name,
      bio: data.bio || '',
      profileImage: data.profileImage || undefined,
    }
    updateMeMutation.mutate(updateData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">이름</h3>
            <FormInput
              control={control}
              name="name"
              placeholder="이름을 입력하세요"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">자기소개</h3>
            <FormTextArea
              control={control}
              name="bio"
              placeholder="자기소개를 입력하세요"
              rows={4}
            />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">프로필 이미지 URL</h3>
            <FormInput
              control={control}
              name="profileImage"
              placeholder="프로필 이미지 URL을 입력하세요"
              type="url"
            />
            {errors.profileImage && (
              <p className="text-sm text-red-500">
                {errors.profileImage.message}
              </p>
            )}
          </div>
        </div>
      </ModalContent>
      <ModalAction>
        <Button variant="outline" onClick={() => onClose?.(false)}>
          취소
        </Button>
        <Button type="submit" disabled={updateMeMutation.isPending}>
          {updateMeMutation.isPending ? '저장 중...' : '저장'}
        </Button>
      </ModalAction>
    </form>
  )
}
