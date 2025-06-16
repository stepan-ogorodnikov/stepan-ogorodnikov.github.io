"use client";

import { DesktopNav } from "@/components/layout/desktop-nav";
import { LANGUAGES } from "@/lib/config";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { initReactI18next } from "react-i18next";

const HeaderMobile = dynamic(
  () => import("@/components/layout/header-mobile").then((m) => m.HeaderMobile),
  { ssr: false },
);
const HeaderDesktop = dynamic(
  () => import("@/components/layout/header-desktop").then((m) => m.HeaderDesktop),
  { ssr: false },
);

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: Object.keys(LANGUAGES),
    fallbackLng: "en",
    debug: false,
    backend: { loadPath: "locales/{{lng}}/{{ns}}.json" },
    interpolation: { escapeValue: false },
    saveMissing: false,
  });

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-col sm:flex-row w-full h-full overflow-hidden">
      <aside className="shrink w-54 sm:h-full sm:border sm:border-right bg-editor">
        <HeaderDesktop />
        <DesktopNav />
      </aside>
      {children}
      <HeaderMobile />
    </div>
  );
}
