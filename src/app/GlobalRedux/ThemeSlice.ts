import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: boolean;
}

const initialState: ThemeState = {
    theme: true, 
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeRedux: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload;
    },
  },
});

export const { setThemeRedux } = themeSlice.actions;
export default themeSlice.reducer;