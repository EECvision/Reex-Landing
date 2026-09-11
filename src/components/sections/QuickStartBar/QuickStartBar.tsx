"use client";

import { Card } from "@/components/ui/Card/Card";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Check, Copy, Terminal } from "lucide-react";
import React, { useState } from "react";
import styles from "./QuickStartBar.module.css";

export const QuickStartBar: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(command);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy command", err);
    }
  };

  return (
    <section className={styles.section} id="quickstart">
      <Container>
        {/* Header Row with Top-Right Copy Action */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <SectionHeader
              tag="Zero-Config Bridge"
              title="Connect your local codebase in seconds."
              description="Run the bridge CLI in your project root to link the web studio directly to your local environment with zero CORS proxies, tokens, or cloud mandates."
              className={styles.sectionHeader}
            />
          </div>

          <div className={styles.commandGroup}>
            <Card variant="glass" padding="none" className={styles.commandCard}>
              <div className={styles.commandLeft}>
                <span className={styles.promptSymbol}><Terminal size={14} /></span>
                <span className={styles.commandText}>npm i -g reex-cli</span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy("npm i -g reex-cli")}
                className={`${styles.copyBtn} ${copied === "npm i -g reex-cli" ? styles.copied : ""}`}
                title="Copy install command"
              >
                {copied === "npm i -g reex-cli" ? (
                  <>
                    <Check size={12} />
                    {/* <span>Copied!</span> */}
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    {/* <span>Copy</span> */}
                  </>
                )}
              </button>
            </Card>

            <Card variant="glass" padding="none" className={styles.commandCard}>
              <div className={styles.commandLeft}>
                <span className={styles.promptSymbol}><Terminal size={14} /></span>
                <span className={styles.commandText}>reex start</span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy("reex start")}
                className={`${styles.copyBtn} ${copied === "reex start" ? styles.copied : ""}`}
                title="Copy command"
              >
                {copied === "reex start" ? (
                  <>
                    <Check size={12} />
                    {/* <span>Copied!</span> */}
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    {/* <span>Copy</span> */}
                  </>
                )}
              </button>
            </Card>
          </div>
        </div>

        {/* 3 Columns Grid */}
        <div className={styles.columnsGrid}>
          {/* Column 1 */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <span className={styles.stepBadge}>1</span>
              <h3 className={styles.columnTitle}>Local Daemon Listener</h3>
            </div>
            <Card variant="glass" className={styles.card}>
              <p className={styles.cardDesc}>
                Spins up a lightweight Express server on port 4000 with built-in
                file watching and security headers.
              </p>
              <div className={styles.pillRow}>
                <span className={styles.subPill}>File Watching</span>
                <span className={styles.subPill}>Security Headers</span>
                <span className={styles.subPill}>Local Daemon</span>
              </div>
            </Card>
          </div>

          {/* Column 2 */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <span className={styles.stepBadge}>2</span>
              <h3 className={styles.columnTitle}>Private Network Access</h3>
            </div>
            <Card variant="glass" className={styles.card}>
              <p className={styles.cardDesc}>
                Web client connects directly to localhost over Chrome PNA with
                zero CORS proxy extensions or tokens.
              </p>
              <div className={styles.pillRow}>
                <span className={styles.subPill}>Zero CORS</span>
                <span className={styles.subPill}>Private Network</span>
                <span className={styles.subPill}>W3C Standard</span>
              </div>
            </Card>
          </div>

          {/* Column 3 */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <span className={styles.stepBadge}>3</span>
              <h3 className={styles.columnTitle}>AST Code Generator</h3>
            </div>
            <Card variant="glass" className={styles.card}>
              <p className={styles.cardDesc}>
                Writes type-safe React Query hooks, schemas, and invalidation
                rules directly into your repo using ts-morph.
              </p>
              <div className={styles.pillRow}>
                <span className={styles.subPill}>ts-morph AST</span>
                <span className={styles.subPill}>React Query v5</span>
                <span className={styles.subPill}>Zero Drift</span>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
