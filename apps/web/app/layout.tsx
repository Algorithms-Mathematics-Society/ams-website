import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Static 400/600 only; the full variable font with opsz was the LCP
// bottleneck on throttled 4G.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amsociety.in"),
  title: {
    default: "AMS · Where India's sharpest minds converge",
    template: "%s · AMS",
  },
  description:
    "National contests in quantitative finance and competitive programming, plus Access, the platform that turns performance into verified hiring signal.",
  openGraph: {
    siteName: "AMS",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/* Stamp html.js before paint so .reveal hiding never applies without JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
