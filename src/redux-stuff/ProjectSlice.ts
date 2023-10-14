import { SliceLoadingState } from './SliceLoadingState';
import { createSlice } from '@reduxjs/toolkit';

interface ProjectState {
  ProjectId: string;
  Status: SliceLoadingState;
}

const initialState: ProjectState = {
  ProjectId: '',
  Status: SliceLoadingState.idle,
};

export const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectId(state, action) {
      state.ProjectId = action.payload;
    },
  },
});

export const { setProjectId } = ProjectSlice.actions;
