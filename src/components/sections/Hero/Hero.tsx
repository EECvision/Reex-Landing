"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import {
  ArrowRight,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import styles from "./Hero.module.css";

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText("npm i -g reex-cli");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error("Failed to copy command", err);
    }
  };

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
              <span>100% Free & Open Source under MIT • npm: reex-cli v7.3.1</span>
              <ArrowRight size={13} />
            </a>
          </div>

          {/* Headline */}
          <h1 className={styles.title}>
            From API Schema to{" "}
            <span>Type-Safe React Query</span>{" "}
            in Seconds.
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            The open-source visual API client and AST generator. Test endpoints directly in your browser
            with <span className={styles.codeInline}>Private Network Access</span>, sync
            bidirectional with your local repo via{" "}
            <span className={styles.codeInline}>reex start</span>, and eliminate frontend
            integration boilerplate forever.
          </p>

          {/* Action Cluster */}
          <div className={styles.ctaGroup}>
            <Button
              variant="glow"
              size="lg"
              href="https://reex-api-builder.toolshq.app"
              external
              iconRight={<ArrowRight size={18} />}
            >
              Launch Studio Free
            </Button>

            <button
              type="button"
              className={styles.cliQuickCopy}
              onClick={handleCopyCommand}
              title="Copy CLI install command"
              aria-label={copied ? "Install command copied" : "Copy CLI install command"}
            >
              <Terminal size={17} color="var(--accent-cyan)" />
              <span>npm i -g reex-cli</span>
              <span className={styles.copyStatus} aria-live="polite">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </span>
            </button>
          </div>

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
