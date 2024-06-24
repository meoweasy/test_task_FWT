import { createSlice } from '@reduxjs/toolkit';

const initialState = 'dark';

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (_state, action) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
