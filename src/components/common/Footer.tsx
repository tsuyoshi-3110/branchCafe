// components/common/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollUpCTA from "@/components/ScrollUpCTA";
import { useUILang, type UILang } from "@/lib/atoms/uiLangAtom";

type T = {
  cta: string;
  snsAria: string;
  instagramAlt: string;
  lineAlt: string;
  siteAria: string;
  siteAlt: string;
  areaLinkText: string;
  rights: string;
};

const STRINGS: Record<UILang, T> = {
  ja: {
    cta: "無料相談・お問い合わせ",
    snsAria: "SNSリンク",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "公式サイト",
    siteAlt: "Branch（ブランチ）",
    areaLinkText: "東淀川区の家事代行・ハウスクリーニング",
    rights: "All rights reserved.",
  },
  en: {
    cta: "Contact us",
    snsAria: "Social links",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "Official website",
    siteAlt: "Branch (Official)",
    areaLinkText: "Housekeeping & house cleaning in Higashiyodogawa",
    rights: "All rights reserved.",
  },
  zh: {
    cta: "免费咨询・联系",
    snsAria: "社交链接",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "官网",
    siteAlt: "Branch 官方网站",
    areaLinkText: "东淀川区的家政与家居清洁",
    rights: "版权所有。",
  },
  "zh-TW": {
    cta: "免費諮詢・聯絡我們",
    snsAria: "社群連結",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "官方網站",
    siteAlt: "Branch 官方網站",
    areaLinkText: "東淀川區的家事服務・居家清潔",
    rights: "版權所有。",
  },
  ko: {
    cta: "문의하기",
    snsAria: "SNS 링크",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "공식 사이트",
    siteAlt: "Branch 공식",
    areaLinkText: "히가시요도가와구 가사도우미·하우스 클리닝",
    rights: "판권 소유.",
  },
  fr: {
    cta: "Nous contacter",
    snsAria: "Liens sociaux",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "Site officiel",
    siteAlt: "Branch (Officiel)",
    areaLinkText: "Ménage & nettoyage domestique à Higashiyodogawa",
    rights: "Tous droits réservés.",
  },
  es: {
    cta: "Contáctanos",
    snsAria: "Enlaces sociales",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "Sitio oficial",
    siteAlt: "Branch (Oficial)",
    areaLinkText: "Servicio doméstico y limpieza en Higashiyodogawa",
    rights: "Todos los derechos reservados.",
  },
  de: {
    cta: "Kontakt",
    snsAria: "Soziale Links",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "Offizielle Website",
    siteAlt: "Branch (Offiziell)",
    areaLinkText: "Haushaltshilfe & Hausreinigung in Higashiyodogawa",
    rights: "Alle Rechte vorbehalten.",
  },
  pt: {
    cta: "Fale conosco",
    snsAria: "Redes sociais",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "Site oficial",
    siteAlt: "Branch (Oficial)",
    areaLinkText: "Serviços domésticos e limpeza em Higashiyodogawa",
    rights: "Todos os direitos reservados.",
  },
  it: {
    cta: "Contattaci",
    snsAria: "Link social",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "Sito ufficiale",
    siteAlt: "Branch (Ufficiale)",
    areaLinkText: "Servizi domestici e pulizie a Higashiyodogawa",
    rights: "Tutti i diritti riservati.",
  },
  ru: {
    cta: "Связаться с нами",
    snsAria: "Ссылки на соцсети",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "Официальный сайт",
    siteAlt: "Branch (Официальный)",
    areaLinkText: "Бытовые услуги и уборка в районе Хигасийодогава",
    rights: "Все права защищены.",
  },
  th: {
    cta: "ติดต่อเรา",
    snsAria: "ลิงก์โซเชียล",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "เว็บไซต์ทางการ",
    siteAlt: "Branch (ทางการ)",
    areaLinkText: "แม่บ้านและทำความสะอาดในเขตฮิกาชิโยโดกาวะ",
    rights: "สงวนลิขสิทธิ์",
  },
  vi: {
    cta: "Liên hệ",
    snsAria: "Liên kết mạng xã hội",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "Trang chính thức",
    siteAlt: "Branch (Chính thức)",
    areaLinkText: "Dọn dẹp & giúp việc nhà tại Higashiyodogawa",
    rights: "Mọi quyền được bảo lưu.",
  },
  id: {
    cta: "Hubungi kami",
    snsAria: "Tautan sosial",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "Situs resmi",
    siteAlt: "Branch (Resmi)",
    areaLinkText:
      "Jasa bersih-bersih & asisten rumah tangga di Higashiyodogawa",
    rights: "Hak cipta dilindungi.",
  },
  hi: {
    cta: "संपर्क करें",
    snsAria: "सोशल लिंक",
    instagramAlt: "Instagram",
    lineAlt: "LINE",
    siteAria: "आधिकारिक वेबसाइट",
    siteAlt: "Branch (आधिकारिक)",
    areaLinkText: "हिगाशी-योदोगावा में हाउसकीपिंग व हाउस क्लीनिंग",
    rights: "सर्वाधिकार सुरक्षित।",
  },
  ar: {
    cta: "اتصل بنا",
    snsAria: "روابط التواصل الاجتماعي",
    instagramAlt: "إنستغرام",
    lineAlt: "لاين",
    siteAria: "الموقع الرسمي",
    siteAlt: "Branch (رسمي)",
    areaLinkText: "خدمات التدبير المنزلي وتنظيف المنازل في هيغاشي يودوغاوا",
    rights: "جميع الحقوق محفوظة.",
  },
};

export default function Footer() {
  const { uiLang } = useUILang();
  const lang = (uiLang in STRINGS ? uiLang : "ja") as UILang;
  const t = STRINGS[lang];
  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";
  const iconSize = 48;

  return (
    <footer
      dir={dir}
      className="relative z-20 mt-10 border-t bg-white/30 text-sm text-white text-outline backdrop-blur supports-[backdrop-filter]:bg-white/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* CTA（/contact は内部遷移。ScrollUpCTA 側の実装に準拠） */}
          <ScrollUpCTA
            href="/contact"
            label={t.cta}
            className="w-full max-w-xs sm:max-w-sm"
          />

          {/* SNSアイコン（外部リンクは <a> のまま） */}
          <nav
            className="flex items-center justify-center gap-5"
            aria-label={t.snsAria}
          >
            <a
              href="https://www.instagram.com/branch_cafe?igsh=YjlvMGt4d3F4b28%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.instagramAlt}
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/instagram-logo.png"
                alt={t.instagramAlt}
                width={iconSize}
                height={iconSize}
                className="object-contain"
              />
            </a>

            <a
              href="https://www.branch.co.at/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.siteAria}
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/ogpLogo.png"
                alt={t.siteAlt}
                width={iconSize}
                height={iconSize}
                className="object-contain"
              />
            </a>
          </nav>

          {/* エリアリンク（内部遷移は <Link> を使用） */}
          <div className="space-y-1 text-xs leading-tight">
            <p>
              <Link href="/areas/local" className="hover:underline">
                {t.areaLinkText}
              </Link>
            </p>
          </div>

          {/* コピーライト */}
          <div className="space-y-1">
            <p className="font-semibold leading-tight">Branch</p>
            <p className="text-xs leading-tight">
              © {new Date().getFullYear()} Branch. {t.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
