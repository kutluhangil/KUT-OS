import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "KUT/OS — kutluhan.gil's terminal portfolio",
  description:
    "A living terminal portfolio. Not a website pretending to be a terminal — a tiny operating system you can explore in your browser. Type `help` to start.",
  keywords: ["portfolio", "terminal", "os", "developer", "kutluhan", "nextjs", "typescript"],
  authors: [{ name: "kutluhan.gil" }],
  creator: "kutluhan.gil",
  openGraph: {
    title: "KUT/OS — kutluhan.gil's terminal portfolio",
    description: "A living terminal portfolio. Type `help` to explore.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KUT/OS — kutluhan.gil's terminal portfolio",
    description: "A living terminal portfolio. Type `help` to explore.",
    creator: "@kutluhangil",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} font-mono`}>{children}</body>
    </html>
  );
}
