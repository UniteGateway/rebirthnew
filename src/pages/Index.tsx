import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhySection } from "@/components/sections/WhySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CertificateSection } from "@/components/sections/CertificateSection";
import { CelebrationsSection } from "@/components/sections/CelebrationsSection";
import { SponsorSection } from "@/components/sections/SponsorSection";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { EthicsSection } from "@/components/sections/EthicsSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { BlessingsDateSection } from "@/components/sections/BlessingsDateSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WhySection />
        <HowItWorksSection />
        <CertificateSection />
        <CelebrationsSection />
        <BlessingsDateSection />
        <SponsorSection />
        <PartnerSection />
        <EthicsSection />
        <ImpactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
