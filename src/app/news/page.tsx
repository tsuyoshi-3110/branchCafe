// src/app/news/page.tsx
import type { Metadata } from "next";
import NewsClient from "@/components/NewsClient";

export const metadata: Metadata = {
  title: "お知らせ｜Branch（ブランチ）",
  description:
    "Branch（ブランチ）の最新イベント情報・開催レポート・営業時間などのお知らせを掲載しています。（大阪市北区のコミュニティ＆イベント拠点）",
  openGraph: {
    title: "お知らせ｜Branch（ブランチ）",
    description:
      "Branch（ブランチ）からのお知らせ。最新イベントや開催レポート、営業時間・開催エリアのご案内などを随時更新します。",
    url: "https://branch-cafe.shop/news",
    siteName: "Branch（ブランチ）",
    images: [
      {
        url: "https://branch-cafe.shop/ogpLogo.png",
        width: 1200,
        height: 630,
        alt: "Branch（ブランチ） OGP",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  alternates: { canonical: "https://branch-cafe.shop/news" },
};

export default function NewsPage() {
  return (
    <main className="px-4 py-12 max-w-4xl mx-auto">
      <NewsClient />
    </main>
  );
}
