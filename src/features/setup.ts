import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SetupState {
  playerMode: boolean;
  isSetup: boolean;
  lang: string;
}

const initialState: SetupState = {
  playerMode: false,
  isSetup: false,
  lang: 'en',
};

export const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    markFirstTimeSetupAsDone: (state) => {
      state.isSetup = true;
    },
    setPlayerMode: (state, action: PayloadAction<boolean>) => {
      state.playerMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { markFirstTimeSetupAsDone, setPlayerMode, setLanguage } = setupSlice.actions;
export default setupSlice.reducer;
