// app/areas/local/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "大阪市北区のコミュニティ・イベント｜Branch（ブランチ）",
  description:
    "大阪市北区（天満・錦町）で“チャレンジが続く”出会いと学びを。交流会・ビジネス・スキルアップ・婚活など多彩なイベントを開催するコミュニティ拠点です。",
  alternates: { canonical: "https://branch-cafe.shop/areas/local" },
  openGraph: {
    title: "大阪市北区のコミュニティ・イベント｜Branch（ブランチ）",
    description:
      "天満・扇町・中崎町ほか大阪市北区エリアで、交流・学び・ビジネス・婚活イベントを随時開催。おひとり参加・お子様連れ歓迎。",
    url: "https://branch-cafe.shop/areas/local",
    type: "article",
    images: [
      { url: "https://branch-cafe.shop/ogpLogo.png", width: 1200, height: 630 },
    ],
    locale: "ja_JP",
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          大阪市北区（天満・錦町）のコミュニティ・イベント
        </h1>
        <p className="text-sm text-muted-foreground">
          天満・扇町・中崎町・南森町・梅田・茶屋町など北区一帯で開催。おひとり参加も大歓迎です。
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border bg-white/70 p-5">
          <h2 className="font-semibold mb-2">交流・ネットワーキング</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>カジュアル交流会／異業種ビジネス交流</li>
            <li>趣味コミュニティ（読書・映画・ボードゲーム など）</li>
            <li>お子様連れ歓迎のデイ交流枠あり</li>
          </ul>
        </article>
        <article className="rounded-xl border bg-white/70 p-5">
          <h2 className="font-semibold mb-2">学び・スキルアップ／婚活</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>スキル講座（プレゼン・マーケ・創業・英会話 など）</li>
            <li>少人数ワークショップ／メンタリング会</li>
            <li>少人数制の婚活イベント（初参加歓迎）</li>
          </ul>
        </article>
      </section>

      <section className="rounded-xl border bg-white/70 p-5">
        <h2 className="font-semibold mb-2">開催エリア（大阪市北区周辺）</h2>
        <p className="text-sm">
          天満・錦町・扇町・中崎町・南森町・中之島・茶屋町・梅田・堂島・中津 ほか
        </p>
      </section>

      <section className="rounded-xl border bg-white/70 p-5">
        <h2 className="font-semibold mb-2">よくある質問</h2>
        <details className="mb-2">
          <summary className="cursor-pointer font-medium">
            当日参加は可能ですか？
          </summary>
          <p className="text-sm mt-2">
            空きがあるイベントは当日参加OKです。最新状況は各イベント詳細をご確認ください。
          </p>
        </details>
        <details>
          <summary className="cursor-pointer font-medium">
            子連れ・ベビーカーでの参加はできますか？
          </summary>
          <p className="text-sm mt-2">
            可能な回があります。イベントページに「お子様連れ可」の表記があるかをご確認ください。
          </p>
        </details>
      </section>

      <section className="rounded-xl border bg-white/70 p-5">
        <h2 className="font-semibold mb-2">お問い合わせ・お申し込み</h2>
        <p className="text-sm">
          参加方法・開催リクエストは、お問い合わせフォームまたはSNSからお気軽にご連絡ください。
        </p>
      </section>

      {/* 内部リンクで回遊を作る */}
      <nav className="text-sm underline">
        <Link href="/events">イベント一覧へ</Link>
      </nav>

      {/* FAQ構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "当日参加は可能ですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "空きがあるイベントは当日参加が可能です。各イベント詳細で最新の受付状況をご確認ください。",
                },
              },
              {
                "@type": "Question",
                name: "子連れ・ベビーカーでの参加はできますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "対応回がございます。「お子様連れ可」の表記があるイベントにご参加ください。個別のご相談も承ります。",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
