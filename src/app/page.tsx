import React from "react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { Hero } from "@/components/sections/Hero/Hero";
import { HeroStudioVisual } from "@/components/sections/HeroStudioVisual/HeroStudioVisual";
import { QuickStartBar } from "@/components/sections/QuickStartBar/QuickStartBar";
import { GeneratedCodeShowcase } from "@/components/sections/GeneratedCodeShowcase/GeneratedCodeShowcase";
import { ApiDiffShowcase } from "@/components/sections/ApiDiffShowcase/ApiDiffShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks/HowItWorks";
import { OpenSource } from "@/components/sections/OpenSource/OpenSource";
import { Faq } from "@/components/sections/Faq/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner/CtaBanner";
import { FeaturesMatrix } from "@/components/sections/FeaturesMatrix/FeaturesMatrix";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <HeroStudioVisual />
        <QuickStartBar />
        <FeaturesMatrix />
        <GeneratedCodeShowcase />
        <ApiDiffShowcase />
        <HowItWorks />
        <OpenSource />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
