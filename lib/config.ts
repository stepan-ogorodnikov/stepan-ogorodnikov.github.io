export const LANGUAGES: Record<string, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
};

export const THEMES = ["system", "light", "dark"] as const;
export const DEFAULT_THEME = "system";
export type Theme = typeof THEMES[number];

export const MIN_LAYOUT_WIDTH = 320;
// if viewport width is >= this value, code will be shown by default
export const CODE_VISIBILITY_BREAKPOINT = 1200;

// delay (in seconds) for enter animations after navigating to a new route
export const NAVIGATION_ENTER_DELAY = 0.3;
// delay (in seconds) for exit animations before navigating to a new route
export const NAVIGATION_EXIT_DELAY = 0.3;
