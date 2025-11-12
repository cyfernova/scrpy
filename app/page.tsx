"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import MetricsBar from "@/components/sections/MetricsBar";
import Timeline from "@/components/sections/Timeline";
import FeatureGrid from "@/components/sections/FeatureGrid";
import Comparison from "@/components/sections/Comparison";
import DemoPlayground from "@/components/sections/DemoPlayground";
import Partners from "@/components/sections/Partners";
import UseCases from "@/components/sections/UseCases";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import { useGSAPCleanup } from "@/lib/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { cleanupAll } = useGSAPCleanup();

  useEffect(() => {
    // Refresh ScrollTrigger on component mount
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return cleanupAll;
  }, [cleanupAll]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main id="main-content">
        <Hero />
        <MetricsBar />
        <Timeline />
        <FeatureGrid />
        <Comparison />
        <DemoPlayground />
        <Partners />
        <UseCases />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
