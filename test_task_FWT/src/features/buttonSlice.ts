import { createSlice } from '@reduxjs/toolkit';

interface ButtonState {
  clicked: boolean;
  theme: string;
  logo: string;
}

const initialState: ButtonState = {
  clicked: false,
  theme: '#121212',
  logo: '/light_icon.svg',
};

const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    toggleButton: (state) => ({
      ...state,
      clicked: !state.clicked,
      theme: state.clicked ? '#FFF' : '#121212',
      logo: state.clicked ? '/dark_icon.svg' : '/light_icon.svg',
    }),
  },
});

export const { toggleButton } = buttonSlice.actions;
export default buttonSlice.reducer;
