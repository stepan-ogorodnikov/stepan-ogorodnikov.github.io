import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type CodeState = {
  prefix: string;
  suffix: string;
  typing: string;
}

const initialState: CodeState = {
  prefix: '',
  suffix: '',
  typing: '',
};

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    prefixSet: (state, { payload }: PayloadAction<string>) => {
      state.prefix = payload;
    },
    suffixSet: (state, { payload }: PayloadAction<string>) => {
      state.suffix = payload;
    },
    typingSet: (state, { payload }: PayloadAction<string>) => {
      state.typing = payload;
    },
  },
});

export const { prefixSet, suffixSet, typingSet } = codeSlice.actions;
export default codeSlice.reducer;
