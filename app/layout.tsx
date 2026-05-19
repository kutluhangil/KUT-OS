import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kutos.dev";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KUT/OS — kutluhan.gil's terminal portfolio",
  description:
    "A living terminal portfolio. Not a website pretending to be a terminal — a tiny operating system you can explore in your browser. Type `help` to start.",
  keywords: [
    "portfolio",
    "terminal",
    "os",
    "developer",
    "kutluhan gil",
    "saas",
    "nextjs",
    "typescript",
    "istanbul",
  ],
  authors: [{ name: "kutluhan.gil", url: SITE_URL }],
  creator: "kutluhan.gil",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KUT/OS — kutluhan.gil's terminal portfolio",
    description: "A living terminal portfolio. Type `help` to explore.",
    type: "website",
    url: SITE_URL,
    locale: "en_US",
    siteName: "KUT/OS",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "KUT/OS — terminal portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KUT/OS — kutluhan.gil's terminal portfolio",
    description: "A living terminal portfolio. Type `help` to explore.",
    creator: "@kutluhangil",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kutluhan Gil",
  url: SITE_URL,
  jobTitle: "Solo Developer & SaaS Builder",
  worksFor: { "@type": "Organization", name: "Independent" },
  address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
  sameAs: [
    "https://github.com/kutluhangil",
    "https://linkedin.com/in/kutluhangil",
    "https://twitter.com/kutluhangil",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono`}>{children}</body>
    </html>
  );
}
