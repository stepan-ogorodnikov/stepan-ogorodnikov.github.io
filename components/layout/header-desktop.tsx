import { LanguageSelect } from "@/components/layout/header/language-select";
import { ThemeSelect } from "@/components/layout/header/theme-select";
import { AppControls } from "./header/app-controls";

export function HeaderDesktop() {
  return (
    <div className="max-sm:hidden flex flex-row gap-2 p-2 px-4 border-b">
      <AppControls />
      <LanguageSelect isMini />
      <ThemeSelect isMini />
    </div>
  );
}
