import { Navbar } from "@/src/components/navbar/navbar";
import { HeroSection } from "@/src/components/hero-section";
import { HowItWorks } from "@/src/components/how-it-works";
import { FeaturedCars } from "@/src/components/featured-cars";
import { AISearchDemo } from "@/src/components/ai-search-demo";
import { SellWithUs } from "@/src/components/sell-with-us";
import { Testimonials } from "@/src/components/testimonials";
import { FAQSection } from "@/src/components/faq-section";
import { Footer } from "@/src/components/footer";

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
      <Footer />
    </main>
  );
}
