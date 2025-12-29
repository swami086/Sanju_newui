'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Solutions from '@/components/Solutions';
import OurServices from '@/components/OurServices';
import WhyChoose from '@/components/WhyChoose';
import PropertyGallery from '@/components/PropertyGallery';
import FounderSection from '@/components/FounderSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <Solutions />
      <OurServices />
      <WhyChoose />
      <PropertyGallery />
      <FounderSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}