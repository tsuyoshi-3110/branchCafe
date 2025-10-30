// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://branch-cafe.shop";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [`${base}/sitemap.xml`],
  };
}
