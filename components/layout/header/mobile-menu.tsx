import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { appControlsToggled } from "@/store/app-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "./language-select";
import { ThemeSelect } from "./theme-select";

export function MobileMenu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isMotionOn = useAppSelector((state) => state.app.appControls.isMotionOn);

  return (
    <div className="flex flex-col gap-4 my-4 pl-4">
      <div className="flex flex-row items-center justify-between h-9">
        <Label htmlFor="language-select-mobile">{t("app.menu.language")}</Label>
        <LanguageSelect />
      </div>
      <div className="flex flex-row items-center justify-between h-9">
        <Label htmlFor="theme-select-mobile">{t("app.menu.theme")}</Label>
        <ThemeSelect />
      </div>
      <div className="flex flex-row items-center justify-between h-9">
        <Label htmlFor="animations-switch">{t("app.menu.motion.title")}</Label>
        <Switch
          id="animations-switch"
          checked={isMotionOn}
          onCheckedChange={() => dispatch(appControlsToggled("isMotionOn"))}
        />
      </div>
    </div>
  );
}
