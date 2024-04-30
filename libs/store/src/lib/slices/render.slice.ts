import { createSlice } from "@reduxjs/toolkit";

export interface RenderState {
  ready: boolean;
  value: string;
}

const initialState: RenderState = {
  ready: false,
  value: "",
};

export const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    ready: (state) => {
      state.ready = true;
    },
    markup: (state, message) => {
      state.value = message.payload;
    },
  },
});

export const { ready, markup } = renderSlice.actions;
export default renderSlice.reducer;
