"use client";

import { AISearchDemo } from "@/src/components/ai-search-demo";
import { FAQSection } from "@/src/components/faq-section";
import { FeaturedCars } from "@/src/components/featured-cars";
import { HeroSection } from "@/src/components/hero-section";
import { HowItWorks } from "@/src/components/how-it-works";
import { SellWithUs } from "@/src/components/sell-with-us";
import { NavigationDock } from "@/src/components/navigation-dock";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />
        <HowItWorks />
        <FeaturedCars />
        <AISearchDemo />
        <SellWithUs />
        <FAQSection />
      </main>
    </>
  );
}
