import {
  GetProject,
  ProjectDetailsSlice,
  resetProjectDetailsData,
} from './ProjectDetailsSlice';
import { SliceLoadingState } from './SliceLoadingState';
import { store, AppDispatch, RootState } from './Store';

export type { RootState, AppDispatch };

export {
  ProjectDetailsSlice,
  GetProject,
  SliceLoadingState,
  store,
  resetProjectDetailsData,
};
