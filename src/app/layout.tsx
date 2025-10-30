import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Script from "next/script";
import ThemeBackground from "@/components/ThemeBackground";
import WallpaperBackground from "@/components/WallpaperBackground";
import SubscriptionOverlay from "@/components/SubscriptionOverlay";
import AnalyticsLogger from "@/components/AnalyticsLogger";
import { SITE_KEY } from "@/lib/atoms/siteKeyAtom";
import { CartProvider } from "@/lib/cart/CartContext";
import {
  kosugiMaru,
  notoSansJP,
  shipporiMincho,
  reggaeOne,
  yomogi,
  hachiMaruPop,
} from "@/lib/font";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Branch（ブランチ）｜大阪・北区のコミュニティ＆イベント拠点",
  description:
    "人生を変える出会いを、プロフェッショナルなマッチングで。プライベートもビジネスも、学び・スキルアップ・婚活まで多彩なイベントを開催するコミュニティ拠点（大阪市北区）。",
  keywords: [
    "Branch",
    "ブランチ",
    "コミュニティ",
    "イベント",
    "交流会",
    "マッチング",
    "婚活",
    "学び",
    "スキルアップ",
    "大阪市北区",
  ],
  authors: [{ name: "Branch（ブランチ）" }],
  metadataBase: new URL("https://branch-cafe.shop"),
  alternates: { canonical: "https://branch-cafe.shop/" },
  openGraph: {
    title: "Branch（ブランチ）｜大阪・北区のコミュニティ＆イベント拠点",
    description:
      "“チャレンジが続く”をコンセプトに、多彩な出会いと学びのイベントを開催。プライベートもビジネスも、続くつながりを。",
    url: "https://branch-cafe.shop/",
    siteName: "Branch（ブランチ）",
    type: "website",
    images: [
      {
        url: "https://branch-cafe.shop/ogpLogo.png",
        width: 1200,
        height: 630,
        alt: "Branch（ブランチ） OGP",
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Branch（ブランチ）｜大阪・北区のコミュニティ＆イベント拠点",
    description: "プロのマッチングで、人生を変える出会いが続く場所。",
    images: ["https://branch-cafe.shop/ogpLogo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=1" },
      { url: "/icon.png", type: "image/png", sizes: "any" },
    ],
    apple: "/icon.png",
    shortcut: "/favicon.ico?v=1",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`
        ${geistSans.variable} ${geistMono.variable}
        ${kosugiMaru.variable} ${notoSansJP.variable}
        ${yomogi.variable} ${hachiMaruPop.variable} ${reggaeOne.variable} ${shipporiMincho.variable}
        antialiased
      `}
    >
      <head>
        <link rel="preload" as="image" href="/ogpLogo.png" type="image/png" />
        {/* TODO: Search Console の site verification は発行後に追加 */}
        <meta name="google-site-verification" content="gyA6VjQKmgmsL94Hk01Na7cQ56DKCK3TyGeiAykkvWU" />
      </head>

      {/* ✅ フッターを下に張り付けるために flex レイアウト */}
      <body className="relative min-h-[100dvh] flex flex-col">
        <SubscriptionOverlay siteKey={SITE_KEY} />
        <AnalyticsLogger />
        <WallpaperBackground />
        <ThemeBackground />

        <CartProvider>
          <SubscriptionOverlay siteKey={SITE_KEY} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>

        {/* 構造化データ（Organization） */}
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Branch（ブランチ）",
            url: "https://branch-cafe.shop/",
            logo: "https://branch-cafe.shop/ogpLogo.png",
            image: "https://branch-cafe.shop/ogpLogo.png",
            description:
              "“チャレンジが続く”をコンセプトに、出会い・学び・ビジネスが続くコミュニティ＆イベント拠点。",
            sameAs: [
              "https://www.branch.co.at/",
              "https://www.instagram.com/branch_cafe",
            ],
            address: {
              "@type": "PostalAddress",
              postalCode: "530-0034",
              addressRegion: "大阪府",
              addressLocality: "大阪市北区",
              streetAddress: "錦町3-12 アウロラビル 4階",
            },
            telephone: "+81-6-6940-4462",
          })}
        </Script>
      </body>
    </html>
  );
}
