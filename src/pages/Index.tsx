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

const Index = () => {
  return (
    <div className="min-h-screen premium-bg">
      {/* Background effects */}
      <div className="noise-overlay" />
      <div className="wave-lines" />
      <div className="light-beam" />
      <div className="sound-wave">
        <span /><span /><span /><span /><span />
        <span /><span /><span /><span /><span /><span />
      </div>
      
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
        <LanguagesSection />
        <VoiceCloningSection />
        <SecuritySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
