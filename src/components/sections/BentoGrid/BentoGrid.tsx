import { Card } from "@/components/ui/Card/Card";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileJson,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import React from "react";
import styles from "./BentoGrid.module.css";

export const BentoGrid: React.FC = () => {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeader
          tag="Core Superpowers"
          title="Everything your frontend needs. Zero manual wiring."
          description="Reex replaces handwritten Axios calls, manual type definitions, and boilerplate TanStack Query hooks with an intelligent, local-first code engine."
        />

        <div className={styles.grid}>
          {/* Card 1: TanStack React Query Hooks Generation (2-col) */}
          <div className={styles.areaA}>
            <Card glowColor="cyan" variant="glass">
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTitleRow}>
                    <Layers size={18} color="var(--accent-cyan)" />
                    <h3 className={styles.cardTitle}>
                      Automatic TanStack React Query Generation & Invalidation
                    </h3>
                  </div>
                  <p className={styles.cardDesc}>
                    Every visual endpoint generates production-ready `useQuery`
                    and `useMutation` hooks. Mutations automatically call
                    `queryClient.invalidateQueries()` with the corresponding
                    query key factory, keeping client state effortlessly in
                    sync.
                  </p>
                </div>

                <div className={styles.previewBox}>
                  {/* Visual Flow Chart */}
                  <div className={styles.invalidationFlow}>
                    <span className={styles.flowPill}>
                      <Zap size={11} color="var(--accent-amber)" />
                      <span>Mutation Trigger</span>
                    </span>
                    <ArrowRight size={13} className={styles.flowArrow} />
                    <span className={styles.flowPill}>
                      <span>apiClient.post()</span>
                    </span>
                    <ArrowRight size={13} className={styles.flowArrow} />
                    <span
                      className={`${styles.flowPill} ${styles.flowPillActive}`}
                    >
                      <Sparkles size={11} />
                      <span>invalidateQueries(keys.all)</span>
                    </span>
                  </div>

                  <pre style={{ margin: 0, color: "var(--text-primary)" }}>
                    <code>
                      <span className="token-prop">onSuccess</span>: () =&gt;{" "}
                      {"{\n"}
                      {"  "}
                      <span className="token-comment">
                        {"// Invalidate all queries matching this module"}
                      </span>
                      {"\n"}
                      {"  "}queryClient.
                      <span className="token-fn">invalidateQueries</span>({"{"}{" "}
                      queryKey: accountReportsKeys.all {"}"});{"\n"}
                      {"}"}
                    </code>
                  </pre>
                </div>
              </div>
            </Card>
          </div>

          {/* Card 2: Private Network Access (PNA) Testing */}
          <div className={styles.areaB}>
            <Card glowColor="emerald" variant="glass">
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTitleRow}>
                    <ShieldCheck size={18} color="var(--accent-emerald)" />
                    <h3 className={styles.cardTitle}>
                      Private Network Access (PNA) Testing
                    </h3>
                  </div>
                  <p className={styles.cardDesc}>
                    Test your local backend APIs directly in the web studio
                    without CORS browser plugins or insecure tunneling.
                  </p>
                </div>

                <div className={styles.previewBox}>
                  <div className={styles.pnaRadarBox}>
                    <div className={styles.pnaRadarCircle}>
                      <span style={{ color: "var(--text-secondary)" }}>
                        Local Target:
                      </span>
                      <span
                        style={{
                          color: "var(--accent-emerald)",
                          fontWeight: 600,
                        }}
                      >
                        localhost:8000
                      </span>
                    </div>
                    <div className={styles.pnaRadarCircle}>
                      <span style={{ color: "var(--text-secondary)" }}>
                        W3C Standard:
                      </span>
                      <span
                        style={{
                          color: "#ffffff",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Lock size={12} color="var(--accent-emerald)" /> Secure
                        PNA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Card 3: Bidirectional AST Sync (ts-morph) */}
          <div className={styles.areaC}>
            <Card glowColor="indigo" variant="glass">
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTitleRow}>
                    <Cpu size={18} color="var(--accent-indigo)" />
                    <h3 className={styles.cardTitle}>Bidirectional AST Sync</h3>
                  </div>
                  <p className={styles.cardDesc}>
                    Powered by `ts-morph`. Edit files in VS Code or in the Reex
                    Studio; AST parsers intelligently reconcile changes without
                    wiping manual modifications.
                  </p>
                </div>

                <div className={styles.previewBox}>
                  <div className={styles.astVisual}>
                    <div className={styles.astNode}>
                      <span
                        style={{
                          color: "var(--accent-indigo)",
                          fontWeight: 600,
                        }}
                      >
                        AST Node:
                      </span>
                      <span>useAccountReportsQueries.ts</span>
                    </div>
                    <div className={styles.astNode}>
                      <span
                        style={{ color: "var(--accent-cyan)", fontWeight: 600 }}
                      >
                        Morph Engine:
                      </span>
                      <span>Safe Append & Re-export</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Card 4: OpenAPI & Postman Parser (2-col) */}
          <div className={styles.areaD}>
            <Card glowColor="amber" variant="glass">
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTitleRow}>
                    <FileJson size={18} color="var(--accent-amber)" />
                    <h3 className={styles.cardTitle}>
                      Postman & OpenAPI 3.0 / 3.1
                    </h3>
                  </div>
                  <p className={styles.cardDesc}>
                    Import entire Swagger or Postman v2.1 collections. Reex
                    auto-detects path params, auth mechanisms, request schemas,
                    and responses in seconds.
                  </p>
                </div>

                <div className={styles.previewBox}>
                  <div className={styles.convertVisual}>
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      OpenAPI 3.1 Spec
                    </span>
                    <ArrowRight size={14} color="var(--accent-amber)" />
                    <span
                      style={{ color: "var(--accent-cyan)", fontWeight: 600 }}
                    >
                      Type-Safe Hooks
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Card 5: Battle-Tested Core Client (Full Width) */}
          <div className={styles.areaE}>
            <Card glowColor="cyan" variant="glass">
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTitleRow}>
                    <Zap size={18} color="var(--accent-cyan)" />
                    <h3 className={styles.cardTitle}>
                      Battle-Tested `core.ts` Client Architecture
                    </h3>
                  </div>
                  <p className={styles.cardDesc}>
                    Reex doesn&apos;t just spit out naive fetch functions. It
                    scaffolds a production Axios client featuring an automated
                    401 retry queue with silent token refresh, error toast
                    normalization, and pluggable auth strategies.
                  </p>
                </div>

                <ul className={styles.clientFeaturesList}>
                  <li className={styles.featureItem}>
                    <CheckCircle2 size={16} color="var(--accent-emerald)" />
                    <span>
                      <strong>Silent 401 Queue:</strong> Queues concurrent
                      requests during token refreshes and replays them
                      automatically.
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckCircle2 size={16} color="var(--accent-emerald)" />
                    <span>
                      <strong>Pluggable Auth Handlers:</strong> Built-in support
                      for Bearer tokens, HTTP-only cookies, Supabase, and
                      NextAuth.js.
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <CheckCircle2 size={16} color="var(--accent-emerald)" />
                    <span>
                      <strong>Normalized Error Interceptors:</strong> Formats
                      backend validation errors into consistent UI notification
                      toasts.
                    </span>
                  </li>
                </ul>

                <div className={styles.queueSteps}>
                  <div className={styles.queueStep}>
                    <span className={styles.queueStepNum}>Stage 01</span>
                    <span className={styles.queueStepTitle}>
                      401 Intercepted
                    </span>
                  </div>
                  <div className={styles.queueStep}>
                    <span className={styles.queueStepNum}>Stage 02</span>
                    <span className={styles.queueStepTitle}>
                      Pending Requests Queued
                    </span>
                  </div>
                  <div className={styles.queueStep}>
                    <span className={styles.queueStepNum}>Stage 03</span>
                    <span className={styles.queueStepTitle}>
                      Silent Token Refresh
                    </span>
                  </div>
                  <div className={styles.queueStep}>
                    <span className={styles.queueStepNum}>Stage 04</span>
                    <span className={styles.queueStepTitle}>
                      Queue Replayed (200 OK)
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
