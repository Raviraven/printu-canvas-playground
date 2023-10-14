import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetProjectData, ProjectContainer } from 'api';
import { SliceLoadingState } from './SliceLoadingState';
import { ApiError } from 'api/Axios';

interface ProjectDetailsState {
  Project?: ProjectContainer;
  Status: SliceLoadingState;
  Error?: string;
}

const initialState: ProjectDetailsState = {
  Status: SliceLoadingState.idle,
};

export const GetProject = createAsyncThunk<
  ProjectContainer,
  string,
  { rejectValue: ApiError }
>('api/get-project-data', async (Id: string, thunkAPI) => {
  try {
    return await GetProjectData(Id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ApiError);
  }
});

export const ProjectDetailsSlice = createSlice({
  name: 'project-details',
  initialState,
  reducers: {
    resetProjectDetailsData(state) {
      state.Project = undefined;
      state.Status = SliceLoadingState.idle;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetProject.pending, (state) => {
      state.Status = SliceLoadingState.pending;
    });

    builder.addCase(GetProject.fulfilled, (state, action) => {
      state.Status = SliceLoadingState.fulfilled;
      state.Project = action.payload;
    });

    builder.addCase(GetProject.rejected, (state, action) => {
      state.Status = SliceLoadingState.rejected;
      state.Error = action.payload?.message;
    });
  },
});

export const { resetProjectDetailsData } = ProjectDetailsSlice.actions;
