"use client";

import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, Star } from "lucide-react";
import React from "react";
import styles from "./CtaBanner.module.css";

export const CtaBanner: React.FC = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.bannerCard}>
          <div className={styles.content}>
            <SectionHeader
              align="center"
              titleSize="lg"
              className={styles.header}
              title="Ready to eliminate frontend API boilerplate?"
              description="Test endpoints in your browser right now or run the CLI in your codebase. 100% free and open source forever."
            />

            <div className={styles.btnGroup}>
              <Button
                variant="glow"
                size="lg"
                href="https://studio.reex-api.dev"
                external
                iconRight={<ArrowRight size={18} />}
              >
                Launch Studio Free
              </Button>

              <Button
                variant="outline"
                size="lg"
                href="https://github.com/EECvision/Reex-api-bridge"
                external
                icon={<Star size={18} fill="#fbbf24" color="#fbbf24" />}
              >
                Star on GitHub
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
