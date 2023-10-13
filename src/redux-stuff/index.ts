import { GetProject, projectDetailsSlice } from './projectDetailsSlice';
import { SliceLoadingState } from './SliceLoadingState';
import { store, AppDispatch, RootState } from './store';

export type { RootState, AppDispatch };

export { projectDetailsSlice, GetProject, SliceLoadingState, store };
