import { configureStore } from '@reduxjs/toolkit';
import { ProjectDetailsSlice } from './ProjectDetailsSlice';
import { ProjectSlice } from './ProjectSlice';

export const store = configureStore({
  reducer: {
    projectDetails: ProjectDetailsSlice.reducer,
    project: ProjectSlice.reducer,
  },
});

// won't work with tsconfig base set as "src" and folder named 'redux'
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
