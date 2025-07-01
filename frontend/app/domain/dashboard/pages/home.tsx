import { useUser } from '@/shared/store/user'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import FeaturesSection from '../layouts/features-section'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import HeroSection from '../layouts/hero-section'

export default function Home() {
  const navigate = useNavigate()
  const user = useUser()

  useEffect(() => {
    if (user) {
      navigate('/projects')
    }
  }, [user])

  if (user) {
    return null
  }

  return (
    <div className="box-border flex h-full w-full flex-col overflow-auto">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
