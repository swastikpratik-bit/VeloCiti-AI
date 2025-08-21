import { AISearchDemo } from "@/src/components/ai-search-demo";
import { FAQSection } from "@/src/components/faq-section";
import { FeaturedCars } from "@/src/components/featured-cars";
import { Footer } from "@/src/components/footer";
import { HeroSection } from "@/src/components/hero-section";
import { HowItWorks } from "@/src/components/how-it-works";
import { SellWithUs } from "@/src/components/sell-with-us";
import { Testimonials } from "@/src/components/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FeaturedCars />
      <AISearchDemo />
      <SellWithUs />
      <Testimonials />
      <FAQSection />
    </main>
  );
}
