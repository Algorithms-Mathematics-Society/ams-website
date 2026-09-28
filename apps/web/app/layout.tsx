import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORGANIZATION_JSONLD, WEBSITE_JSONLD } from "@/content/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amshq.in"),
  title: {
    // The exact entity string Google must associate with the "ams" query.
    default: "AMS · Algorithms & Mathematics Society",
    template: "%s · AMS",
  },
  description:
    "AMS is an Indian contest and assessment organization running national contests in quantitative finance and competitive programming, supported by the Access assessment platform.",
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
      className={`${inter.variable} ${sourceSerif.variable}`}
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
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
