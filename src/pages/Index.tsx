import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { DemoSection } from '@/components/landing/DemoSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { LanguagesSection } from '@/components/landing/LanguagesSection';
import { VoiceCloningSection } from '@/components/landing/VoiceCloningSection';
import { SecuritySection } from '@/components/landing/SecuritySection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';
import { LovableBackground } from '@/components/landing/LovableBackground';

const Index = () => {
  return (
    <div className="min-h-screen">
      <LovableBackground />
      
      <Header />
      <main className="relative z-10">
        <section id="product">
          <HeroSection />
        </section>
        <section id="solutions">
          <DemoSection />
          <FeaturesSection />
        </section>
        <section id="customers">
          <LanguagesSection />
          <VoiceCloningSection />
          <SecuritySection />
        </section>
        <section id="resources">
          <FAQSection />
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
