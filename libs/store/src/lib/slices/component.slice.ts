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
    // Track line execution log and store it in array
    track: (state, action) => {
      state.value = [
        ...state.value,
        { ...action.payload, cast: state.value.length },
      ];
    },
    // Represent source code of the tracked component
    code: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { track, code } = componentSlice.actions;
export default componentSlice.reducer;
