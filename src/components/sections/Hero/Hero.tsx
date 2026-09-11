"use client";

import { Container } from "@/components/ui/Container/Container";
import { Cpu, Layers, ShieldCheck, Sparkles } from "lucide-react";
import React from "react";
import styles from "./Hero.module.css";

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          {/* Announcement Capsule */}
          <div className={styles.pillWrapper}>
            <a
              href="https://github.com/EECvision/Reex-api-bridge"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pillLink}
            >
              <Sparkles size={13} color="var(--accent-cyan)" />
              <span>Free & Open Source under MIT</span>
            </a>
          </div>

          {/* Headline */}
          <h1 className={styles.title}>
            From API Schema to <span>Type-Safe React Query</span> in Seconds.
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Test endpoints directly in your browser, and eliminate frontend
            boilerplate.
          </p>

          {/* Trust Highlights */}
          <div className={styles.badgesRow}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <ShieldCheck size={16} />
              </span>
              <span>Private Network Access (Direct Localhost)</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <Cpu size={16} />
              </span>
              <span>ts-morph AST Code Generation</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <Layers size={16} />
              </span>
              <span>TanStack React Query v5</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
