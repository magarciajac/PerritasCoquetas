import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedDesigns from '@/components/FeaturedDesigns'
import CollarCustomizer from '@/components/CollarCustomizer'
import PricingSection from '@/components/PricingSection'
import BorderTypes from '@/components/BorderTypes'
import PremiumDetails from '@/components/PremiumDetails'
import HowItWorks from '@/components/HowItWorks'
import Benefits from '@/components/Benefits'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main>
        <Hero />
        <FeaturedDesigns />
        <CollarCustomizer />
        <PricingSection />
        <BorderTypes />
        <PremiumDetails />
        <HowItWorks />
        <Benefits />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
