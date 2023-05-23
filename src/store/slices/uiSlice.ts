import { toggleMode } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

export interface uiState {
	darkMode: boolean;
}

const initialState: uiState = {
	darkMode: true,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleDarkMode: (state, { payload }: { payload: 'dark' | 'light' }) => {
			state.darkMode = payload === 'dark';
			localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
			toggleMode(state.darkMode ? 'dark' : 'light');
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = uiSlice.actions;

export default uiSlice.reducer;
