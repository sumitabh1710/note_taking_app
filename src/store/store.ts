import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
