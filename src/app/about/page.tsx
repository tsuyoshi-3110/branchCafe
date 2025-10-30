import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "私たちの想い｜Branch（ブランチ）",
  description:
    "Branch（ブランチ）の想いをご紹介します。「チャレンジが続く」をコンセプトに、出会い・学び・ビジネスが続く場を大阪・北区で提供しています。",
  openGraph: {
    title: "私たちの想い｜Branch（ブランチ）",
    description:
      "“チャレンジが続く”を掲げ、プライベートもビジネスも続くつながりを育むコミュニティ＆イベント拠点（大阪・北区）。",
    url: "https://branch-cafe.shop/about",
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
};

export default function AboutPage() {
  return (
    <main className="px-4 py-4 max-w-4xl mx-auto">
      <AboutClient />
    </main>
  );
}
