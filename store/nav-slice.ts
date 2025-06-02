import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type NavState = {
  files: string[];
  currentFile?: string;
  prevFile?: string;
  nextFile?: string;
  doneFiles: string[];
  isDone?: boolean;
  isNavigating?: boolean;
};

const initialState: NavState = {
  files: [],
  doneFiles: [],
};

export type InitPayload = Pick<NavState, "files">;

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    filesSet: (state, { payload }: PayloadAction<InitPayload>) => {
      state.files = payload.files;
    },
    fileSet: (state, { payload }: PayloadAction<string>) => {
      const { files } = state;
      state.currentFile = payload;
      const index = files.findIndex((f) => (f === payload));
      state.prevFile = index > 0 ? files[index - 1] : undefined;
      state.nextFile = index < files.length ? files[index + 1] : undefined;
      state.isDone = state.doneFiles.includes(payload);
      state.isNavigating = false;
    },
    setIsNavigating: (state, { payload }: PayloadAction<NavState["isNavigating"]>) => {
      state.isNavigating = payload;
    },
    setCurrentFileAsDone: (state) => {
      const { currentFile } = state;
      if (currentFile && !state.doneFiles.includes(currentFile)) state.doneFiles.push(currentFile);
      state.isDone = true;
    },
  },
});

export const {
  filesSet,
  fileSet,
  setIsNavigating,
  setCurrentFileAsDone,
} = navSlice.actions;
export default navSlice.reducer;
