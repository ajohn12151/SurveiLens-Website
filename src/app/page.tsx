import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignalBackground } from "@/components/layout/SignalBackground";
import { Hero } from "@/components/sections/Hero";
import { ProofSection } from "@/components/sections/ProofSection";
import { SignalsAtlasScroll } from "@/components/sections/SignalsAtlasScroll";
import { HowToUseScroll } from "@/components/sections/HowToUseScroll";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ConversionSection } from "@/components/sections/ConversionSection";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <SignalBackground />
      <Navbar />
      <main className="flex min-h-screen flex-col">
        {/* 1. Hero (Product-First) */}
        <Hero />

        {/* 2. Proof Section (Keep your cameras. Add clarity.) */}
        <ProofSection />

        {/* 3. Safety Signals Atlas (Scroll-driven threat tour) */}
        <section id="signals-atlas" className="relative">
          <div className="sticky top-0 z-20 w-full text-center py-6 bg-black/90 backdrop-blur-md border-b border-white/5">
            <span className="text-xs font-mono text-surveilens-blue uppercase tracking-widest">
              What We Detect
            </span>
          </div>
          <SignalsAtlasScroll />
        </section>

        {/* 4. Start Threat Detection (Scroll-story onboarding) */}
        <section id="start-detection" className="relative">
          <div className="sticky top-0 z-20 w-full text-center py-6 bg-black/90 backdrop-blur-md border-b border-white/5">
            <span className="text-xs font-mono text-surveilens-blue uppercase tracking-widest">
              How To Start
            </span>
          </div>
          <HowToUseScroll />
        </section>

        {/* 5. Benefits Cards */}
        <BenefitsSection />

        {/* 6. Trust Section (Not Surveillance. Safety.) */}
        <TrustSection />

        {/* 7. FAQ */}
        <FAQ />

        {/* 8. Conversion Section (Inline Form + CTAs) */}
        <ConversionSection />
      </main>
      <Footer />
    </>
  );
}
