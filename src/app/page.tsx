"use client";

import { useRef } from "react";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AICheckInSection from "@/components/AICheckInSection";
import OutcomesSection from "@/components/OutcomesSection";
import MobileInterface from "@/components/MobileInterface";
import HowItWorks from "@/components/HowItWork";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

export default function Home() {
  const outcomeRef = useRef(null);

  const scrollToOutcomes = () => {
    const outcomeRef = useRef<HTMLDivElement | null>(null);
    outcomeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header onBookDemoClick={scrollToOutcomes} />
      <HeroSection />
      <AICheckInSection />

      {/* Outcomes Section with ref */}
      <div ref={outcomeRef}>
        <OutcomesSection />
      </div>

      <MobileInterface />
      <HowItWorks />
      <TeamSection />
      <Footer />
    </div>
  );
}
