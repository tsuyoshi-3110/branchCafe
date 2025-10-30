// app/products/page.tsx
import type { Metadata } from "next";
import ProductsECClient from "@/components/productsEC/ProductsECClient";

const title = "メニュー一覧｜Branch";
const description =
  "Branchの人気メニュー一覧ページ。季節限定商品やおすすめメニューを写真付きでご紹介。";
const ogImage = "/ogp-products.jpg"; // public 配下の画像

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://branchcafe.com/products",
    siteName: "Branch",
    images: [
      {
        url: ogImage as string,
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website", // ← "product" は型に無いので "website"
  } satisfies Metadata["openGraph"],
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function ProductsPage() {
  return <ProductsECClient />;
}
