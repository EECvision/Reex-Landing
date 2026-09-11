import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Container } from "@/components/ui/Container/Container";
import { SubPageNav } from "@/components/ui/SubPageNav/SubPageNav";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import styles from "./GuidesGettingStarted.module.css";

export const metadata: Metadata = {
  title: "Getting Started Guide | Reex API Documentation",
  description:
    "Learn how to integrate your API collections directly with your React application, set up Providers, and automate React Query code generation.",
  alternates: {
    canonical: `${siteConfig.marketingUrl}/guides/getting-started`,
  },
};

export default function GuidesGettingStartedPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${siteConfig.marketingUrl}/guides/getting-started/#article`,
    url: `${siteConfig.marketingUrl}/guides/getting-started`,
    name: "Reex API Getting Started Guide",
    description:
      "A walkthrough explaining how to install, initialize, and generate type-safe APIs using the Reex CLI companion.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.marketingUrl}/#website`,
      url: siteConfig.marketingUrl,
      name: "Reex API",
    },
    author: {
      "@type": "Person",
      "name": "Ezeka Emmanuel",
    },
  };

  return (
    <div className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className={styles.mainSection}>
        <Container>
          <SubPageNav />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
