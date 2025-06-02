import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Theme, THEMES } from "@/lib/config";
import { themeSet } from "@/store/app-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Monitor, Moon, Sun } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ICONS: Record<Theme, ReactNode> = {
  system: <Monitor className="size-5 min-w-5" strokeWidth={2} />,
  light: <Sun className="size-5 min-w-5" strokeWidth={2} />,
  dark: <Moon className="size-5 min-w-5" strokeWidth={1.75} />,
};

type Props = {
  isMini?: boolean;
};

export function ThemeSelect({ isMini }: Props) {
  const { t } = useTranslation();
  const theme = useAppSelector((state) => state.app.preferences.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isDark = (theme === "dark")
      || (theme === "system"
        && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  const handleChange = (value: Theme) => {
    dispatch(themeSet(value));
  };

  return (
    <Select
      value={theme}
      onValueChange={handleChange}
    >
      <SelectTrigger
        id={`theme-select-${isMini ? "desktop" : "mobile"}`}
        variant={isMini ? "ghost" : "default"}
        withIcon={!isMini}
        aria-label={t("app.select.theme")}
      >
        {isMini ? (theme && ICONS[theme]) : <SelectValue />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {THEMES.map((theme) => (
            <SelectItem
              className="flex flex-row items-center gap-1 sm:gap-2"
              value={theme}
              key={theme}
            >
              {ICONS[theme]}
              {t(`app.theme.${theme}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
