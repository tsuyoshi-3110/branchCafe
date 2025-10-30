// components/common/Header.tsx
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import clsx from "clsx";
import { useThemeGradient } from "@/lib/useThemeGradient";
import { useHeaderLogoUrl } from "../../hooks/useHeaderLogoUrl";
import { auth, db } from "@/lib/firebase";
import { THEMES, ThemeKey } from "@/lib/themes";
import UILangFloatingPicker from "../UILangFloatingPicker";
import { useUILang, type UILang } from "@/lib/atoms/uiLangAtom";
import { SITE_KEY } from "@/lib/atoms/siteKeyAtom";
import { doc, onSnapshot } from "firebase/firestore";
import { T, type Keys } from "@/lib/header/t";
import { MENU_ITEMS } from "@/lib/header/menu";


const HEADER_H = "3rem";
const TRIPLE_TAP_INTERVAL_MS = 500;
const IGNORE_SELECTOR = "a,button,input,select,textarea,[role='button']";



type EditableSettings = {
  visibleMenuKeys?: string[];
  i18n?: { enabled?: boolean; langs?: UILang[] };
  businessHours?: { enabled?: boolean }; // ★ 追加
};

export default function Header({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const gradient = useThemeGradient();
  const logoUrl = useHeaderLogoUrl();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => setIsLoggedIn(!!user));
    return () => unsub();
  }, []);

  const { uiLang } = useUILang();

  const [visibleMenuKeys, setVisibleMenuKeys] = useState<string[]>(
    MENU_ITEMS.map((m) => m.key)
  );
  const [i18nEnabled, setI18nEnabled] = useState<boolean>(true);

  useEffect(() => {
    const ref = doc(db, "siteSettingsEditable", SITE_KEY);

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) return;
        const data = snap.data() as EditableSettings;

        // i18n ON/OFF
        setI18nEnabled(
          typeof data.i18n?.enabled === "boolean" ? data.i18n.enabled : true
        );

        // ヘッダーで許可しているキーだけを使う
        const allowedKeys = new Set(MENU_ITEMS.map((m) => m.key));

        // 1) Firestore の visibleMenuKeys があればそれをベースに
        // 2) なければ、ヘッダーが持つ全メニューをベースに
        const baseFromDoc = Array.isArray(data.visibleMenuKeys)
          ? data.visibleMenuKeys.filter(
              (k): k is (typeof MENU_ITEMS)[number]["key"] =>
                allowedKeys.has(k as any)
            )
          : MENU_ITEMS.map((m) => m.key);

        const nextSet = new Set(baseFromDoc);

        // businessHours によって hours を強制加除
        const bhEnabled = data.businessHours?.enabled === true;
        if (bhEnabled) nextSet.add("hours");
        else nextSet.delete("hours");

        const next = Array.from(nextSet);

        console.debug("[Header] visibleMenuKeys <-", {
          fromDoc: data.visibleMenuKeys,
          bhEnabled,
          final: next,
        });

        setVisibleMenuKeys(next);
      },
      (error) => {
        console.error("メニュー/翻訳設定購読エラー:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const gradientClass = gradient
    ? `bg-gradient-to-b ${gradient}`
    : "bg-gray-100";

  const isDark = useMemo(() => {
    const darkKeys: ThemeKey[] = ["brandH", "brandG", "brandI"];
    if (!gradient) return false;
    return darkKeys.some((k) => gradient === THEMES[k]);
  }, [gradient]);

  const rtl = uiLang === "ar";

  // 日本語固定ラベル
  const JP_ALWAYS = new Set<Keys>([
    "timeline",
    "community",
    "analytics",
    "admin",
  ]);
  const labelOf = (k: Keys) =>
    JP_ALWAYS.has(k) ? T.ja[k] : (T[uiLang] ?? T.ja)[k];

  // 管理者リンク 3タップ
  const [showAdminLink, setShowAdminLink] = useState(false);
  const tapCountRef = useRef(0);
  const lastTapAtRef = useRef(0);

  useEffect(() => {
    if (!open) {
      setShowAdminLink(false);
      tapCountRef.current = 0;
      lastTapAtRef.current = 0;
    }
  }, [open]);

  const handleSecretTap = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(IGNORE_SELECTOR)) return;
    const now = Date.now();
    const last = lastTapAtRef.current;

    if (now - last > TRIPLE_TAP_INTERVAL_MS) {
      tapCountRef.current = 1;
      lastTapAtRef.current = now;
      return;
    }
    tapCountRef.current += 1;
    lastTapAtRef.current = now;

    if (tapCountRef.current >= 3) {
      setShowAdminLink(true);
      tapCountRef.current = 0;
      lastTapAtRef.current = 0;
    }
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-30 flex items-center justify-between px-4 h-12",
        gradientClass,
        className,
        !isDark && "border-b border-gray-300"
      )}
      style={{ "--header-h": HEADER_H } as React.CSSProperties}
    >
      {/* ロゴ */}
      <Link
        href="/"
        className={clsx(
          "text-lg font-bold flex items-center gap-2 py-2 hover:opacity-50",
          "text-white text-outline"
        )}
      >
        {logoUrl && logoUrl.trim() !== "" && (
          <Image
            src={logoUrl}
            alt="ロゴ"
            width={48}
            height={48}
            className="w-12 h-12 object-contain transition-opacity duration-200"
            unoptimized
          />
        )}
        Branch
      </Link>

      {/* ハンバーガー */}
      <div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={clsx(
                "w-7 h-7 border-2",
                isDark ? "text-white border-white" : "border-black"
              )}
              aria-label={(T[uiLang] ?? T.ja).menuTitle}
            >
              <Menu size={26} />
            </Button>
          </SheetTrigger>

          {/* === スライド === */}
          <SheetContent
            side="right"
            className={clsx(
              "flex h-dvh min-h-0 flex-col p-0",
              gradient && "bg-gradient-to-b",
              gradient || "bg-gray-100",
              isDark
                ? "[&>button]:text-white [&>button>svg]:!text-white [&>button>svg]:stroke-[3] [&>button>svg]:w-7 [&>button>svg]:h-6"
                : "[&>button]:text-black [&>button>svg]:!text-black [&>button>svg]:stroke-[3] [&>button>svg]:w-7 [&>button>svg]:h-6"
            )}
            dir={rtl ? "rtl" : "ltr"}
          >
            {/* 視覚タイトル */}
            <SheetHeader className="pt-4 px-4">
              <SheetTitle className="text-center text-xl !text-white text-outline">
                {(T[uiLang] ?? T.ja).menuTitle}
              </SheetTitle>
            </SheetHeader>

            {/* 中央メニュー（上下センター） */}
            <div
              className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:thin] px-6"
              onPointerDown={handleSecretTap}
            >
              <nav className="py-4 flex flex-col items-center text-center justify-center min-h-[60vh] space-y-3">
                {MENU_ITEMS.filter((item) =>
                  visibleMenuKeys.includes(item.key)
                ).map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="text-lg text-white text-outline"
                  >
                    {labelOf(key as Keys)}
                  </Link>
                ))}
              </nav>

              {/* 言語ピッカー（翻訳が無効なら非表示） */}
              {i18nEnabled && (
                <div className="flex flex-col items-center gap-2 py-3">
                  <UILangFloatingPicker />
                </div>
              )}
            </div>

            {/* フッター */}
            <div className="border-t border-white/30 px-6 py-4">
              <div className="flex flex-col items-center gap-2">
                {isLoggedIn && (
                  <>
                    <Link
                      href="/postList"
                      onClick={() => setOpen(false)}
                      className="text-center text-lg text-white text-outline"
                    >
                      {labelOf("timeline")}
                    </Link>
                    <Link
                      href="/community"
                      onClick={() => setOpen(false)}
                      className="text-center text-lg text-white text-outline"
                    >
                      {labelOf("community")}
                    </Link>
                    <Link
                      href="/analytics"
                      onClick={() => setOpen(false)}
                      className="text-center text-lg text-white text-outline"
                    >
                      {labelOf("analytics")}
                    </Link>
                  </>
                )}

                {(showAdminLink || isLoggedIn) && (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-center text-lg text-white text-outline"
                  >
                    {labelOf("admin")}
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
