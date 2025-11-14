import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Scrpy MCP Extension — AI Infrastructure Platform",
  description: "Client-side scraping meets enterprise AI. Deploy production-ready MCP servers for Claude Code, Kilo Code, Cline, and OpenCode in seconds.",
  keywords: ["MCP", "AI", "web scraping", "Claude Code", "browser extension", "automation"],
  openGraph: {
    title: "Scrpy MCP Extension — AI Infrastructure Platform",
    description: "Transform Documentation Into Intelligent MCP Endpoints. Deploy production-ready servers in seconds.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts for better performance */}
        </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {children}
      </body>
    </html>
  );
}
