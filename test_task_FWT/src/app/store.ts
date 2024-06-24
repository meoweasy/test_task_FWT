import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from '../features/buttonSlice';
import themeReducer from '../features/themeSlice';
import searchReducer from '../features/searchSlice';

const store = configureStore({
  reducer: {
    button: buttonReducer,
    theme: themeReducer,
    search: searchReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
