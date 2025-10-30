// src/app/(routes)/home/page.tsx

import type { Metadata } from "next";
import BackgroundVideo from "@/components/backgroundVideo/BackgroundVideo";
import TopFixedText from "@/components/TopFixedText";
import  TopVisibleSections from "@/components/TopVisibleSections";

export const metadata: Metadata = {
  title: "Branch（ブランチ）｜大阪・北区のコミュニティ＆イベント拠点",
  description:
    "人生を変える出会いを、プロフェッショナルなマッチングで。プライベートもビジネスも、学び・スキルアップ・婚活まで多彩なイベントを開催するコミュニティ拠点（大阪市北区）。",
  openGraph: {
    title: "Branch（ブランチ）｜大阪・北区のコミュニティ＆イベント拠点",
    description:
      "“チャレンジが続く”をコンセプトに、明日につながる出会いと学びを創出。プライベートもビジネスも、続くつながりを。",
    url: "https://branch-cafe.shop/",
    siteName: "Branch（ブランチ）",
    images: [
      {
        url: "/ogpLogo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  alternates: { canonical: "https://branch-cafe.shop/" },
};

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* ① ファーストビュー：背景動画または画像 */}
      <section className="relative h-screen overflow-hidden">
        <BackgroundVideo />
      </section>

      {/* ② テキスト紹介セクション */}
      <section className="relative z-10 text-white px-4 py-20">
        {/* 編集可能な固定テキストコンポーネント */}
        <TopFixedText />

        {/* ページタイトルとリード文 */}
        <h1 className="text-3xl lg:text-4xl font-extrabold text-center leading-tight mb-6 text-outline">
          Branch（ブランチ）
        </h1>

        <p className="max-w-3xl mx-auto text-center leading-relaxed text-outline">
          人生を変える出会いを、プロフェッショナルなマッチングで。
          プライベートにビジネスに、自分磨きやスキルアップ、婚活まで。
          お子様連れもおひとり様も歓迎。大阪・北区を拠点に、明日へつながる多彩なイベントを開催しています。
        </p>

        <TopVisibleSections />
      </section>

      {/* ③ JSON-LD（構造化データ） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Branch（ブランチ）",
              url: "https://branch-cafe.shop/",
              image: "https://branch-cafe.shop/ogpLogo.png",
              logo: "https://branch-cafe.shop/ogpLogo.png",
              description:
                "“チャレンジが続く”をコンセプトに、出会い・学び・ビジネスが続くコミュニティ＆イベント拠点。",
              address: {
                "@type": "PostalAddress",
                postalCode: "530-0034",
                addressRegion: "大阪府",
                addressLocality: "大阪市北区",
                streetAddress: "錦町3-12 アウロラビル 4階",
              },
              telephone: "+81-6-6940-4462",
              sameAs: [
                "https://www.branch.co.at/",
                "https://www.instagram.com/branch_cafe",
              ],
            },
          ]),
        }}
      />
    </main>
  );
}
