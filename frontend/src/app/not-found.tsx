import { Button } from '@/components/ui/button'
import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'
import NotFoundIcon from '../../public/errors/not-found.svg'

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <NotFoundIcon />
      <h3 className="mb-14 mt-4 text-2xl font-medium text-gray-550">
        요청하신 페이지는 존재하지 않습니다.
      </h3>
      <div className="flex items-center gap-2">
        <ArrowBigLeft />
        <Link href="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  )
}
