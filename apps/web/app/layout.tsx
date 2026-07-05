import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORGANIZATION_JSONLD, WEBSITE_JSONLD } from "@/content/seo";
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
  metadataBase: new URL("https://amshq.in"),
  title: {
    // The exact entity string Google must associate with the "ams" query.
    default: "AMS · Algorithms & Mathematics Society",
    template: "%s · AMS",
  },
  description:
    "Where India's sharpest minds converge: national contests in quantitative finance and competitive programming, plus Access, the platform that turns performance into verified hiring signal.",
  openGraph: {
    siteName: "AMS",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AMS · Algorithms & Mathematics Society",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
        <JsonLd data={ORGANIZATION_JSONLD} />
        <JsonLd data={WEBSITE_JSONLD} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
