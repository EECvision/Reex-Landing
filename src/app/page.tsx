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
import { siteConfig } from "@/lib/site";
import { homeStructuredData, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

async function getCliVersion() {
  try {
    const res = await fetch("https://registry.npmjs.org/reex-cli/latest", {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.version) return `v${data.version}`;
    }
  } catch (e) {
    // Ignore error and fallback
  }
  return "v7.3.2";
}

export default async function Home() {
  const cliVersion = await getCliVersion();

  return (
    <div className="app-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c") }}
      />
      <Navbar cliVersion={cliVersion} />
      <main className="main-content">
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
      <Footer cliVersion={cliVersion} />
    </div>
  );
}
