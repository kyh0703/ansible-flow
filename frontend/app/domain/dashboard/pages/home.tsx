import { useUser } from '@/shared/store/user'
import FeaturesSection from '../layouts/features-section'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import HeroSection from '../layouts/hero-section'

export default function Home() {
  const user = useUser()

  if (user) {
    window.location.href = '/projects'
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
