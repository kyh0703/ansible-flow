import FeaturesSection from '../_components/features-section'
import Footer from '../_components/footer'
import Header from '../_components/header'
import HeroSection from '../_components/hero-section'

export default function Home() {
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
