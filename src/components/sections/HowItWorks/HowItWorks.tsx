import React from "react";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    number: "01",
    title: "Import your collection",
    desc: "Drop an OpenAPI 3.x or Postman v2.1 spec into Reex Studio via file, URL, or direct Postman import. Endpoints, auth mechanisms, and schemas are detected automatically.",
    graphic: [
      { color: "var(--accent-emerald)", text: "✓ swagger.v2.json" },
      { color: "var(--text-secondary)", text: "  OpenAPI 3.1 detected" },
      { color: "var(--text-secondary)", text: "  18 endpoints · 6 modules · 3 auth routes" },
      { color: "var(--accent-cyan)",    text: "  Ready to generate →" },
    ],
  },
  {
    number: "02",
    title: "Run reex start",
    desc: "One command spins up a local daemon that connects Reex Studio to your project's src/api-services/ directory. The bridge watches your files and syncs AST changes bidirectionally.",
    graphic: [
      { color: "var(--text-dim)",       text: "$ reex start" },
      { color: "var(--accent-emerald)", text: "  ● Bridge active on :4000" },
      { color: "var(--text-secondary)", text: "  ✓ Watching src/api-services/" },
      { color: "var(--text-secondary)", text: "  ✓ Connected to Reex Studio" },
    ],
  },
  {
    number: "03",
    title: "Use the generated hooks",
    desc: "Call type-safe hooks directly in your components. Cache management, mutation triggers, and auto-invalidations work out of the box — no setup, no manual wiring.",
    graphic: [
      { color: "var(--text-dim)",       text: "const { data, isPending } =" },
      { color: "var(--accent-cyan)",    text: "  useGetAccountReportsQuery();" },
      { color: "",                       text: "" },
      { color: "var(--text-dim)",       text: "const { mutate } =" },
      { color: "var(--accent-emerald)", text: "  usePostAccountReportsMutation();" },
    ],
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className={styles.section} id="how-it-works">
      <Container>
        <SectionHeader
          tag="From spec to component"
          title="Three steps. No boilerplate."
          description="Import your API spec, run one command, and start calling type-safe hooks in your components. That's the entire setup."
        />

        <div className={styles.timeline}>
          {STEPS.map((step, i) => (
            <div key={step.number} className={styles.step}>
              {/* Left: dot + connector */}
              <div className={styles.dotCol}>
                <div className={styles.dot}>
                  <span className={styles.dotNumber}>{step.number}</span>
                </div>
                {i < STEPS.length - 1 && <div className={styles.connector} />}
              </div>

              {/* Right: content */}
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>

                <div className={styles.graphic}>
                  {step.graphic.map((line, li) => (
                    <div key={li} className={styles.graphicLine}>
                      {line.text === "" ? (
                        <span>&nbsp;</span>
                      ) : (
                        <span style={{ color: line.color }}>{line.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
