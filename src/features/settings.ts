import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    displayRomanizedTitles: boolean;
}

const initialState : SettingsState = {
    displayRomanizedTitles: true
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setDisplayRomanizedTitles: (state, action: PayloadAction<boolean>) => {
            state.displayRomanizedTitles = action.payload;
        }
    }
})

export const { setDisplayRomanizedTitles } = settingsSlice.actions;
export default settingsSlice.reducer;