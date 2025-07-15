import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import BrandLogos from '@/components/BrandLogos'
import AICheckInSection from '@/components/AICheckInSection'
import OutcomesSection from '@/components/OutcomesSection'
import MobileInterface from '@/components/MobileInterface'
import HowItWorks from '@/components/HowItWork'
import TeamSection from '@/components/TeamSection'
import Footer from '@/components/Footer'
import Individual from '@/app/individual/page'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      {/* <BrandLogos /> */}
      <AICheckInSection />
      <OutcomesSection />
      <MobileInterface />
      <HowItWorks />
      <TeamSection />
      <Footer />
    </div>
  );
}
