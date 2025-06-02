import { CODE_VISIBILITY_BREAKPOINT, DEFAULT_THEME, Theme, THEMES } from "@/lib/config";
import { getPreferences, isOneOf, setPreferences } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AppState = {
  // actual values
  appControls: {
    isMotionOn?: boolean;
    isCodeVisible?: boolean;
  };
  // persisted values
  preferences: {
    theme?: Theme;
    isMotionOn?: boolean;
    isCodeVisible?: boolean;
  };
  isSettled?: boolean;
};

const initialState: AppState = {
  appControls: {},
  preferences: {},
};

type StoreInitPayload = {
  layoutWidth: number;
  isMotionReduced?: boolean | null;
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    storeInitialized: (state: AppState, action: PayloadAction<StoreInitPayload>) => {
      const { layoutWidth, isMotionReduced } = action.payload;
      const { theme, isMotionOn, isCodeVisible } = getPreferences() || {};
      state.preferences.theme = isOneOf(theme, THEMES) ? theme : DEFAULT_THEME;
      state.appControls.isMotionOn = typeof isMotionOn === "boolean" ? isMotionOn : !isMotionReduced;
      state.appControls.isCodeVisible = typeof isCodeVisible === "boolean"
        ? isCodeVisible
        : layoutWidth >= CODE_VISIBILITY_BREAKPOINT;
      if (typeof isMotionOn === "boolean") state.preferences.isMotionOn = isMotionOn;
      if (typeof isCodeVisible === "boolean") state.preferences.isCodeVisible = isMotionOn;
      state.isSettled = true;
    },
    reducedMotionUpdated: (state: AppState, action: PayloadAction<boolean | null>) => {
      state.appControls.isMotionOn = typeof state.preferences.isMotionOn === "boolean"
        ? state.preferences.isMotionOn
        : !action.payload;
    },
    themeSet: (state: AppState, action: PayloadAction<Theme>) => {
      state.preferences.theme = action.payload;
      setPreferences(state.preferences);
    },
    appControlsToggled: (state: AppState, action: PayloadAction<keyof AppState["appControls"]>) => {
      state.preferences[action.payload] = !state.appControls[action.payload];
      state.appControls[action.payload] = !state.appControls[action.payload];
      setPreferences(state.preferences);
    },
  },
});

export const { themeSet, appControlsToggled, storeInitialized, reducedMotionUpdated } = appSlice.actions;
export default appSlice.reducer;
