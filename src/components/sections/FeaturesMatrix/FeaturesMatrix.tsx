"use client";

import { Container } from "@/components/ui/Container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button/Button";
import React, { useState } from "react";
import styles from "./FeaturesMatrix.module.css";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "generation", label: "Generation" },
  { id: "sync", label: "Sync & Diff" },
  { id: "auth", label: "Auth" },
  { id: "client", label: "HTTP Client" },
  { id: "import", label: "Imports" },
  { id: "testing", label: "Testing" },
  { id: "dx", label: "Dev Experience" },
  { id: "sandbox", label: "Sandbox" },
  { id: "modes", label: "Modes" },
];

const FEATURES = [
  // Generation
  {
    id: 1,
    name: "Zero-Boilerplate Generation",
    desc: "Import a collection. Get definitions, hooks, and types instantly.",
    category: "generation",
  },
  {
    id: 2,
    name: "React Query Hook Generation",
    desc: "Every endpoint produces a useQuery or useMutation hook automatically.",
    category: "generation",
  },
  {
    id: 3,
    name: "Automatic Cache Invalidation",
    desc: "Mutations call invalidateQueries with the correct key on success.",
    category: "generation",
  },
  {
    id: 4,
    name: "Query Key Factory Generation",
    desc: "Structured queryKey factories are generated per module.",
    category: "generation",
  },
  {
    id: 5,
    name: "TypeScript Interface Generation",
    desc: "Live response bodies are converted to typed interfaces in one click.",
    category: "generation",
  },
  {
    id: 6,
    name: "Barrel Export Generation",
    desc: "A single index.ts re-exports all hooks for clean imports.",
    category: "generation",
  },
  {
    id: 7,
    name: "API Definition Scaffolding",
    desc: "Typed definition files with correct function signatures per endpoint.",
    category: "generation",
  },
  {
    id: 8,
    name: "File Upload Support",
    desc: "@contentType JSDoc tag generates the correct multipart/form-data interface.",
    category: "generation",
  },
  {
    id: 9,
    name: "Response Unwrapping",
    desc: "unwrapResponseData strips the top-level data wrapper automatically.",
    category: "generation",
  },
  // Sync & Diff
  {
    id: 10,
    name: "Bidirectional AST Sync",
    desc: "Edit in VS Code or Reex Studio — changes flow both ways via ts-morph.",
    category: "sync",
  },
  {
    id: 11,
    name: "UI → Code Sync",
    desc: "Studio actions write generated files directly to your local filesystem.",
    category: "sync",
  },
  {
    id: 12,
    name: "Code → UI Sync",
    desc: "Editing definitions/ in your IDE is reflected in the Studio instantly.",
    category: "sync",
  },
  {
    id: 13,
    name: "Smart API Diff",
    desc: "Re-import a collection and see exactly what changed before code is touched.",
    category: "sync",
  },
  {
    id: 14,
    name: "Git-Style Diff View",
    desc: "Side-by-side: new fields, removed endpoints, payload mutations.",
    category: "sync",
  },
  {
    id: 15,
    name: "Conflict Detection",
    desc: "Detects collisions between incoming changes and existing definitions.",
    category: "sync",
  },
  {
    id: 16,
    name: "Per-Change Accept / Reject",
    desc: "Review each diff individually — no all-or-nothing overwrites.",
    category: "sync",
  },
  // Authentication
  {
    id: 17,
    name: "JWT / Bearer Token Strategy",
    desc: "Stores and refreshes tokens in localStorage. Fully automated.",
    category: "auth",
  },
  {
    id: 18,
    name: "HTTP-Only Cookie Strategy",
    desc: "W3C-standard secure cookie sessions with browser-managed tokens.",
    category: "auth",
  },
  {
    id: 19,
    name: "NextAuth.js Strategy",
    desc: "Reads the session token from getSession() and injects it per request.",
    category: "auth",
  },
  {
    id: 20,
    name: "Strategy Switcher",
    desc: "Swap auth strategies via a single prop — no rewiring needed.",
    category: "auth",
  },
  {
    id: 21,
    name: "Silent 401 Retry Queue",
    desc: "Concurrent requests queue on a 401 and replay after token refresh.",
    category: "auth",
  },
  {
    id: 22,
    name: "Silent Token Refresh",
    desc: "Expired tokens are exchanged transparently. Users never see a failure.",
    category: "auth",
  },
  {
    id: 23,
    name: "JWT Expiry Detection",
    desc: "Decodes the JWT exp claim from base64 — no library required.",
    category: "auth",
  },
  {
    id: 24,
    name: "Session Restoration on Mount",
    desc: "Auth guards restore sessions from stored tokens on every app load.",
    category: "auth",
  },
  {
    id: 25,
    name: "Global Auth Events",
    desc: "auth:login and auth:logout DOM events coordinate session state app-wide.",
    category: "auth",
  },
  {
    id: 26,
    name: "Pluggable Token Provider",
    desc: "Implement TokenProvider to add a fully custom auth strategy.",
    category: "auth",
  },
  {
    id: 27,
    name: "Custom Request Headers",
    desc: "Inject tenant IDs, API keys, or any header that persists across requests.",
    category: "auth",
  },
  // HTTP Client
  {
    id: 28,
    name: "Production-Grade Axios Client",
    desc: "core.ts ships a hardened Axios instance with interceptors and auth baked in.",
    category: "client",
  },
  {
    id: 29,
    name: "Normalized Error Interceptors",
    desc: "Every backend error shape maps to a consistent ApiError interface.",
    category: "client",
  },
  {
    id: 30,
    name: "Automatic Token Injection",
    desc: "Request interceptor injects Authorization: Bearer on every authenticated call.",
    category: "client",
  },
  {
    id: 31,
    name: "Request / Response Logging",
    desc: "Toggle enableApiLogging in api.config.ts to log all traffic.",
    category: "client",
  },
  {
    id: 32,
    name: "Configurable Base URL",
    desc: "One baseURL in api.config.ts propagates across all generated definitions.",
    category: "client",
  },
  {
    id: 33,
    name: "FormData Header Management",
    desc: "Drops Content-Type for FormData so Axios computes the correct boundary.",
    category: "client",
  },
  {
    id: 34,
    name: "Smart Retry Logic",
    desc: "Skips retrying 401, 403, 404, and 422. Retries once for server errors.",
    category: "client",
  },
  // Imports
  {
    id: 35,
    name: "OpenAPI 3.0 / 3.1 Import",
    desc: "Import Swagger specs in JSON format. Full OpenAPI support.",
    category: "import",
  },
  {
    id: 36,
    name: "Postman v2.1 Import",
    desc: "Import full Postman collections including auth, environments, and bodies.",
    category: "import",
  },
  {
    id: 37,
    name: "Import from File",
    desc: "Upload a .json file directly from disk.",
    category: "import",
  },
  {
    id: 38,
    name: "Import from URL",
    desc: "Paste a public spec URL and Reex fetches and parses it instantly.",
    category: "import",
  },
  {
    id: 39,
    name: "Path Parameter Detection",
    desc: "Parses {id}-style path params and generates correct function signatures.",
    category: "import",
  },
  {
    id: 40,
    name: "Auth Mechanism Detection",
    desc: "Auth type is detected from the collection and pre-configured automatically.",
    category: "import",
  },
  {
    id: 41,
    name: "Request Schema Detection",
    desc: "Body shapes are parsed and pre-populate the Studio's request form.",
    category: "import",
  },
  {
    id: 42,
    name: "Multiple Collections",
    desc: "Work with multiple collections in parallel, each with its own base URL.",
    category: "import",
  },
  // Testing
  {
    id: 43,
    name: "Private Network Access Testing",
    desc: "Test localhost APIs in the web Studio — no CORS plugins or proxies.",
    category: "testing",
  },
  {
    id: 44,
    name: "Local Daemon Listener",
    desc: "reex start spins an Express server on port 4000 bridging UI and filesystem.",
    category: "testing",
  },
  {
    id: 45,
    name: "Multi-Port Support",
    desc: "Run reex start -p 4002 to connect multiple projects simultaneously.",
    category: "testing",
  },
  {
    id: 46,
    name: "Request Pre-configuration",
    desc: "Selecting an endpoint pre-fills params, headers, body, and base URL.",
    category: "testing",
  },
  {
    id: 47,
    name: "Real-Time Response Display",
    desc: "Live response with body, HTTP status, timing (ms), and size (bytes).",
    category: "testing",
  },
  // Developer Experience
  {
    id: 48,
    name: "Auto Dependency Installation",
    desc: "reex start detects and installs Axios, TanStack Query, and auth packages.",
    category: "dx",
  },
  {
    id: 49,
    name: "ReexProvider Single Wrapper",
    desc: "One provider sets up QueryClient, Auth, and Notifications in one import.",
    category: "dx",
  },
  {
    id: 50,
    name: "useAuthSession Hook",
    desc: "status, isAuthenticated, setSession, clearSession — all in one hook.",
    category: "dx",
  },
  {
    id: 51,
    name: "useHeaders Hook",
    desc: "setCustomHeaders and removeCustomHeader for per-request header management.",
    category: "dx",
  },
  {
    id: 52,
    name: "useNotification Hook",
    desc: "Consume centralized toast notification state from any component.",
    category: "dx",
  },
  {
    id: 53,
    name: "Deduped Notifications",
    desc: "Identical errors are suppressed within a 2.5s window to prevent spam.",
    category: "dx",
  },
  {
    id: 54,
    name: "Auto-Dismiss Notifications",
    desc: "Toasts auto-dismiss after 5s by default. Configurable per instance.",
    category: "dx",
  },
  {
    id: 55,
    name: "IntelliSense via satisfies",
    desc: "Generated files use satisfies ReexDefinition for maximum autocomplete.",
    category: "dx",
  },
  {
    id: 56,
    name: "Save Interface to Project",
    desc: "One click persists a generated TypeScript interface to your types/ folder.",
    category: "dx",
  },
  {
    id: 57,
    name: "Copy Interface",
    desc: "Copy any generated TypeScript interface to clipboard instantly.",
    category: "dx",
  },
  {
    id: 58,
    name: "Multi-Framework Support",
    desc: "Works with Next.js (App + Pages), Vite, and React Router.",
    category: "dx",
  },
  // Sandbox
  {
    id: 59,
    name: "Create Collections from Scratch",
    desc: "Build and organize requests without importing a spec.",
    category: "sandbox",
  },
  {
    id: 60,
    name: "Full HTTP Method Support",
    desc: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS — all supported.",
    category: "sandbox",
  },
  {
    id: 61,
    name: "Auto-Save",
    desc: "Every change is saved in real-time. No manual save button.",
    category: "sandbox",
  },
  {
    id: 62,
    name: "Cloud Sync",
    desc: "Workspace syncs to the cloud when subscribed. Continue across devices.",
    category: "sandbox",
  },
  {
    id: 63,
    name: "Persistent Workspace",
    desc: "Request configs, responses, and interfaces survive browser sessions.",
    category: "sandbox",
  },
  // Modes
  {
    id: 64,
    name: "Dev Mode",
    desc: "Full codebase integration — generation, sync, and diff in your local project.",
    category: "modes",
  },
  {
    id: 65,
    name: "Preview Mode",
    desc: "Project-free API exploration. Import and test with no local setup.",
    category: "modes",
  },
  {
    id: 66,
    name: "API Sandbox Mode",
    desc: "Blank scratchpad for building and testing requests from scratch.",
    category: "modes",
  },
  {
    id: 67,
    name: "Workspace Switcher",
    desc: "Switch between Dev, Preview, and Sandbox modes from the top nav.",
    category: "modes",
  },
];

export const FeaturesMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const isAllCategory = activeCategory === "all";
  const allFiltered = isAllCategory
    ? FEATURES
    : FEATURES.filter((f) => f.category === activeCategory);

  const totalFilteredCount = allFiltered.length;
  const filtered = (isAllCategory && !showAll) ? allFiltered.slice(0, 18) : allFiltered;

  return (
    <section className={styles.section} id="features">
      <Container>
        <SectionHeader
          tag="Full Feature Set"
          title="Everything your frontend needs. Zero manual wiring."
          description="Reex replaces handwritten Axios calls, manual types, and boilerplate hooks with an intelligent, local-first code engine — from generation to auth, sync, and testing."
        />

        {/* Category Tabs */}
        <div className={styles.tabs} role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ""}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setShowAll(false);
              }}
            >
              {cat.label}
              {cat.id !== "all" && (
                <span className={styles.tabCount}>
                  {FEATURES.filter((f) => f.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Feature Grid */}
        <div className={styles.featureGrid} role="tabpanel">
          {filtered.map((feature) => (
            <div key={feature.id} className={styles.featureItem}>
              <span className={styles.featureName}>{feature.name}</span>
              <span className={styles.featureDesc}>{feature.desc}</span>
            </div>
          ))}
        </div>

        {isAllCategory && !showAll && totalFilteredCount > 18 && (
          <div className={styles.seeAllWrapper}>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setShowAll(true)}
            >
              See all features
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};
