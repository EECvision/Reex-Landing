import React from "react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { Container } from "@/components/ui/Container/Container";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Code2,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import styles from "./ReactQueryGenerator.module.css";

export const metadata = pageMetadata({
  title: "React Query Generator | TanStack Query Code Generator | Reex API",
  description:
    "The modern React Query generator. Scaffold type-safe TanStack Query v5 hooks, TypeScript API clients, and query key factories with ts-morph AST generation.",
  path: "/react-query-generator",
  index: true,
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": siteUrl("/react-query-generator#webpage"),
      url: siteUrl("/react-query-generator"),
      name: "React Query Generator | Reex API",
      description:
        "The modern React Query generator. Scaffold type-safe TanStack Query v5 hooks, TypeScript API clients, and query key factories with ts-morph AST generation.",
      isPartOf: { "@id": `${siteConfig.marketingUrl}/#website` },
      about: { "@id": `${siteConfig.marketingUrl}/#software` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": siteUrl("/react-query-generator#software"),
      name: "Reex React Query Generator",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows, macOS, Linux, Web",
      url: siteUrl("/react-query-generator"),
      description:
        "AST code generator creating type-safe TanStack Query v5 hooks, query key factories, and API clients from API collections.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

const sampleReactQueryCode = `// Generated in src/api-services/hooks/useAccountReportsQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountReportsApi, type CreateAccountReportPayload } from "../definitions/accountReports";

export const accountReportsKeys = {
  all: ["accountReports"] as const,
  lists: () => [...accountReportsKeys.all, "list"] as const,
};

export const useGetAccountReportsQuery = () => {
  return useQuery({
    queryKey: accountReportsKeys.lists(),
    queryFn: () => accountReportsApi.get_accountReports(),
  });
};

export const usePostAccountReportsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAccountReportPayload) =>
      accountReportsApi.post_accountReports(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountReportsKeys.all });
    },
  });
};`;

export default function ReactQueryGeneratorPage() {
  return (
    <div className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className={styles.mainSection}>
        <Container>
          {/* Hero Section */}
          <div className={styles.heroContainer}>
            <div className={styles.badge}>
              <Sparkles size={14} />
              <span>TanStack React Query v5 & TypeScript</span>
            </div>
            <h1 className={styles.title}>
              The Intelligent React Query Generator for Modern Web Apps
            </h1>
            <p className={styles.description}>
              Generate complete, production-ready React Query hooks, query key factories,
              and TypeScript interfaces from OpenAPI and Postman collections with zero manual wiring.
            </p>
            <div className={styles.ctaGroup}>
              <a
                href={siteConfig.studioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
              >
                <span>Launch Reex Studio</span>
                <ArrowRight size={16} />
              </a>
              <a
                href={siteConfig.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                <BookOpen size={16} />
                <span>Documentation</span>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Code2 size={20} />
              </div>
              <h2 className={styles.featureTitle}>Real Code on Disk</h2>
              <p className={styles.featureText}>
                Outputs readable, editable TypeScript files directly into your repository.
                No black-box runtime dependencies or proprietary vendor lock-in.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <CheckCircle2 size={20} />
              </div>
              <h2 className={styles.featureTitle}>Automatic Invalidation</h2>
              <p className={styles.featureText}>
                Every mutation is generated with an <code>onSuccess</code> handler that calls{" "}
                <code>queryClient.invalidateQueries</code> with the exact matching query key factory.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Layers size={20} />
              </div>
              <h2 className={styles.featureTitle}>Structured Query Key Factories</h2>
              <p className={styles.featureText}>
                Generates hierarchical query key objects per API domain, adhering to official
                TanStack Query best practices for cache isolation.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Cpu size={20} />
              </div>
              <h2 className={styles.featureTitle}>ts-morph AST Engine</h2>
              <p className={styles.featureText}>
                Modifies and updates code via TypeScript Abstract Syntax Tree manipulation.
                Safely integrates new endpoints without corrupting your customized code.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <ShieldCheck size={20} />
              </div>
              <h2 className={styles.featureTitle}>Integrated Auth Strategies</h2>
              <p className={styles.featureText}>
                Generates auth handlers for JWT Bearer tokens with automated refresh or
                W3C-standard secure HTTP-only cookies out of the box.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Terminal size={20} />
              </div>
              <h2 className={styles.featureTitle}>Live Bidirectional Sync</h2>
              <p className={styles.featureText}>
                Edit endpoint definitions in VS Code or Reex Studio. Changes flow in both
                directions in real-time via the lightweight local daemon.
              </p>
            </div>
          </div>

          {/* Code Preview */}
          <div className={styles.previewBlock}>
            <h2 className={styles.previewTitle}>
              Clean, Idiomatic React Query Output
            </h2>
            <p className={styles.previewDesc}>
              Inspect the generated code below. Clean imports, strict typing, and full support
              for React Query v5 hooks.
            </p>
            <pre className={styles.codePre}>
              <code>{sampleReactQueryCode}</code>
            </pre>
          </div>

          {/* Step-by-Step Instructions */}
          <div className={styles.instructionsContainer}>
            <h2 className={styles.instructionsTitle}>Start Generating in 3 Steps</h2>
            <div className={styles.instructionsList}>
              <div className={styles.instructionItem}>
                <span className={styles.instructionStepNumber}>1</span>
                <div>
                  <h3 className={styles.instructionHeading}>
                    Install & Start the Local Bridge
                  </h3>
                  <p className={styles.instructionDesc}>
                    In your project root, run <span className={styles.codeInline}>npm i -g reex-cli</span> followed
                    by <span className={styles.codeInline}>reex start</span>. The daemon opens a secure local listener.
                  </p>
                </div>
              </div>

              <div className={styles.instructionItem}>
                <span className={styles.instructionStepNumber}>2</span>
                <div>
                  <h3 className={styles.instructionHeading}>
                    Connect Reex Studio
                  </h3>
                  <p className={styles.instructionDesc}>
                    Open{" "}
                    <a href={siteConfig.studioUrl} target="_blank" rel="noopener noreferrer" className={styles.codeInline}>
                      Reex API Studio
                    </a>. It connects securely to your local codebase without requiring any cloud tokens or proxies.
                  </p>
                </div>
              </div>

              <div className={styles.instructionItem}>
                <span className={styles.instructionStepNumber}>3</span>
                <div>
                  <h3 className={styles.instructionHeading}>
                    Import Endpoints & Consume
                  </h3>
                  <p className={styles.instructionDesc}>
                    Import an OpenAPI or Postman spec, test your endpoints, and use the generated
                    hooks like <span className={styles.codeInline}>useGetAccountReportsQuery()</span> straight
                    inside your React or Next.js components.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
