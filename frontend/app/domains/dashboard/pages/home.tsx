import FeaturesSection from '../layouts/features-section'
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import HeroSection from '../layouts/hero-section'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
