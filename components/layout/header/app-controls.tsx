import { Toggle } from "@/components/ui/toggle";
import { appControlsToggled } from "@/store/app-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CodeXml, WandSparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AppControls() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isCodeVisible = useAppSelector((state) => state.app.appControls.isCodeVisible);
  const isMotionOn = useAppSelector((state) => state.app.appControls.isMotionOn);

  return (
    <div className="flex flex-row items-center gap-2">
      <Toggle
        aria-label={t(`app.menu.motion.${isMotionOn ? "on" : "off"}`)}
        title={t(`app.menu.motion.${isMotionOn ? "on" : "off"}`)}
        pressed={isMotionOn}
        onPressedChange={() => dispatch(appControlsToggled("isMotionOn"))}
      >
        <WandSparkles className="size-5 min-w-5" strokeWidth={1.75} />
      </Toggle>
      <Toggle
        className="max-sm:hidden"
        aria-label={t(`app.menu.code.${isCodeVisible ? "on" : "off"}`)}
        title={t(`app.menu.code.${isCodeVisible ? "on" : "off"}`)}
        pressed={isCodeVisible}
        onPressedChange={() => dispatch(appControlsToggled("isCodeVisible"))}
      >
        <CodeXml className="size-5 min-w-5" strokeWidth={2} />
      </Toggle>
    </div>
  );
}
