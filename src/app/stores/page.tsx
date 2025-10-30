import type { Metadata } from "next";
import StoresClient from "@/components/StoresClient";
import { PhoneSection } from "@/components/PhoneSection";

export const metadata: Metadata = {
  title: "拠点・会場一覧｜Branch（ブランチ）",
  description:
    "Branch（ブランチ）の拠点・会場一覧ページ。大阪市北区（天満・錦町）を中心に、交流・学び・ビジネス・婚活など多彩なイベントを開催しています。",
  openGraph: {
    title: "拠点・会場一覧｜Branch（ブランチ）",
    description:
      "Branch（ブランチ）の各拠点・会場情報。アクセスや開催エリア、連絡先をご確認いただけます。",
    url: "https://branch-cafe.shop/stores", // 本番URL
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

export default function StoresPage() {
  return (
    <main className="px-4 py-16">
      {/* ページタイトル・説明文 */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-4 text-white text-outline">
          Branch（ブランチ） ─ 拠点・会場一覧
        </h1>
        <p className="leading-relaxed text-white text-outline">
          <strong>Branch（ブランチ）</strong> は
          <strong>大阪市北区（天満・錦町）</strong>を拠点に、
          交流・学び・ビジネス・婚活などのイベントを開催しています。
          <br className="hidden lg:block" />
          各会場のアクセスや開催情報をこちらからご確認いただけます。
        </p>
      </section>

      {/* 連絡先セクション */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <PhoneSection />
      </section>

      {/* 会場カード（Firestore対応） */}
      <StoresClient />
    </main>
  );
}
