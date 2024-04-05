import { createSlice } from '@reduxjs/toolkit';
import { Track } from '../models';

export interface ComponentSlice {
  value: Array<Track>;
  code: string;
}

const initialState: ComponentSlice = {
  value: [],
  code: '',
};

export const componentSlice = createSlice({
  name: 'effect',
  initialState,
  reducers: {
    track: (state, action) => {
      state.value = [
        ...state.value,
        { ...action.payload, cast: state.value.length },
      ];
    },
    code: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { track, code } = componentSlice.actions;
export default componentSlice.reducer;
