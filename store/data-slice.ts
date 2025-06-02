import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ScriptItem = {
  pageData?: DataState["pageData"];
  delay: number;
};

export type DataState = {
  script: ScriptItem[];
  noMotionData: DataState["pageData"];
  pageData: Record<string, any>;
};

const initialState: DataState = {
  script: [],
  noMotionData: {},
  pageData: {
    stage: [],
    stageIndex: 0,
    isDone: false,
  },
};

export type ScriptSetPayload = PayloadAction<{ script: ScriptItem[]; noMotionData: DataState["noMotionData"] }>;

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    scriptSet: (state, { payload }: ScriptSetPayload) => {
      state.script = payload.script;
      state.noMotionData = payload.noMotionData;
    },
    pageDataSet: (state, { payload }: PayloadAction<DataState["pageData"]>) => {
      state.pageData = payload;
    },
    pageDataUpdated: (state, { payload }: PayloadAction<DataState["pageData"]>) => {
      Object.assign(state.pageData, payload);
    },
  },
});

export const {
  scriptSet,
  pageDataSet,
  pageDataUpdated,
} = dataSlice.actions;
export default dataSlice.reducer;
