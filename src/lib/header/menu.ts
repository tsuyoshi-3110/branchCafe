import { T } from "./t";

/* ===== メニュー定義 ===== */
export const MENU_ITEMS: { key: keyof (typeof T)["ja"]; href: string }[] = [
  { key: "productsEC", href: "/productsEC" },
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" }, // ★ 旧 products の中身はこちらへ
  { key: "products", href: "/products" }, // ★ 新しい商品一覧

  { key: "pricing", href: "/menu" },
  { key: "staffs", href: "/staffs" },

  { key: "areas", href: "/areas" },
  { key: "stores", href: "/stores" },
  { key: "story", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "news", href: "/news" },
  { key: "company", href: "/company" },
  { key: "contact", href: "/contact" },
  { key: "reserve", href: "/apply" },
  { key: "aiChat", href: "/ai" },
  { key: "partners", href: "/jobApp" },
];
