"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button/Button";
import { ExternalLink, Check } from "lucide-react";
import styles from "./OpenSource.module.css";

const TRUST_PILLARS = [
  "MIT License",
  "Zero telemetry",
  "Self-hostable",
  "No feature gating",
];

export const OpenSource: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText("npm i -g reex-cli");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className={styles.section} id="open-source">
      <Container>
        <SectionHeader
          tag="MIT Licensed"
          title="Built in public. Owned by you."
          description="Reex is MIT licensed. No feature gating, no telemetry, no cloud account required. Every line of code is public and auditable on GitHub."
        />

        <div className={styles.card}>
          {/* Left: headline + pillars */}
          <div className={styles.cardLeft}>
            <div className={styles.mitBadge}>MIT</div>
            <p className={styles.cardStatement}>
              No paywalls. No tracking. No mandated cloud account. Every line of
              client, CLI daemon, and generator code is public on GitHub.
            </p>

            <div className={styles.pillars}>
              {TRUST_PILLARS.map((p) => (
                <span key={p} className={styles.pillar}>
                  <Check size={13} strokeWidth={2.5} className={styles.pillarCheck} />
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <div className={styles.cardRight}>
            <Button
              variant="outline"
              href="https://github.com/EECvision/Reex-api-client"
              external
              iconRight={<ExternalLink size={14} />}
            >
              View on GitHub
            </Button>

            <button
              type="button"
              className={styles.installBox}
              onClick={copyInstall}
              aria-label="Copy install command"
            >
              <span className={styles.installCmd}>npm i -g reex-cli</span>
              <span className={`${styles.installCopy} ${copied ? styles.installCopied : ""}`}>
                {copied ? <Check size={13} /> : "Copy"}
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
