import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reex-api-builder.toolshq.app"),
  title: "Reex API — Open-Source Visual API Client & React Query Generator",
  description:
    "Open-source visual API client and code-generation bridge. Test endpoints in your browser with Private Network Access, sync bidirectional with your local repo via ts-morph, and auto-generate type-safe TanStack React Query hooks.",
  keywords: [
    "Reex API",
    "reex-cli",
    "React Query generator",
    "TanStack Query",
    "OpenAPI code generator",
    "Postman collection parser",
    "AST code generator",
    "Private Network Access API testing",
    "open source API client",
    "TypeScript API hooks",
  ],
  authors: [{ name: "Ezeka Emmanuel", url: "https://github.com/EECvision" }],
  openGraph: {
    title: "Reex API — Open-Source Visual API Client & Code Generator",
    description:
      "Eliminate frontend integration boilerplate. Test endpoints visually, sync with your local repo, and generate production-ready TanStack React Query hooks.",
    url: "https://reex-api-builder.toolshq.app",
    siteName: "Reex API",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reex API - Visual API Client and React Query Code Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reex API — Open-Source Visual API Client & React Query Generator",
    description:
      "From API Schema to Type-Safe React Query in Seconds. 100% Free & Open-Source under MIT.",
    images: ["/og-image.png"],
    creator: "@eecvision",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
