"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LANGUAGES } from "@/lib/config";
import { useTranslation } from "react-i18next";

type Props = {
  isMini?: boolean;
};

export function LanguageSelect({ isMini }: Props) {
  const { i18n, t } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      value={i18n.language}
      onValueChange={handleChange}
    >
      <SelectTrigger
        id={`language-select-${isMini ? "desktop" : "mobile"}`}
        variant={isMini ? "ghost" : "default"}
        withIcon={!isMini}
        aria-label={t("app.select.language")}
      >
        {isMini
          ? (
            <img
              className="size-5 min-w-5"
              alt={LANGUAGES[i18n.language]}
              src={`images/languages/${i18n.language}.svg`}
            />
          )
          : <SelectValue />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.keys(LANGUAGES).map((lang) => (
            <SelectItem
              className="flex flex-row items-center gap-1 sm:gap-2"
              value={lang}
              key={lang}
            >
              <img
                className="size-5 min-w-5"
                alt={LANGUAGES[i18n.language]}
                src={`images/languages/${lang}.svg`}
              />
              {LANGUAGES[lang]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
