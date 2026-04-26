import React from 'react'
import { Navbar } from '../components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { CategoriesSection } from '../components/CategoriesSection'
import { GuidesSection } from '../components/GuidesSection'
import { WhySection } from '../components/WhySection'
import { FAQSection } from '../components/Faqsection'       // ← NEW
import { CTASection } from '../components/Catsection'       // ← fixed: was 'Catsection'
import { Newsletter, Footer } from '../components/Footer'

const LandingPage: React.FC = () => (
  <>
    <Navbar />
    <HeroSection />
    <CategoriesSection />
    <GuidesSection />
    <WhySection />
    <FAQSection />   {/* ← sits perfectly between Why and CTA */}
    <CTASection />
    <Newsletter />
    <Footer />
  </>
)

export default LandingPage