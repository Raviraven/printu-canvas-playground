import { configureStore } from '@reduxjs/toolkit';
import { projectDetailsSlice } from './projectDetailsSlice';
import { projectSlice } from './projectSlice';

export const store = configureStore({
  reducer: {
    projectDetails: projectDetailsSlice.reducer,
    project: projectSlice.reducer,
  },
});

// won't work with tsconfig base set as "src" and folder named 'redux'
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
