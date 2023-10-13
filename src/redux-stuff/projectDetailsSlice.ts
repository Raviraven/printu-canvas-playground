import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetProjectData, ProjectContainer } from 'api';
import { AxiosError } from 'axios';
import { SliceLoadingState } from './SliceLoadingState';

interface ProjectDetailsState {
  Project?: ProjectContainer;
  Status: SliceLoadingState;
}

const initialState: ProjectDetailsState = {
  Status: SliceLoadingState.idle,
};

export const GetProject = createAsyncThunk<
  ProjectContainer,
  string,
  { rejectValue: AxiosError }
>('api/get-project-data', async (Id: string, thunkAPI) => {
  try {
    return await GetProjectData(Id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error as AxiosError);
  }
});

export const projectDetailsSlice = createSlice({
  name: 'project-details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetProject.pending, (state) => {
      state.Status = SliceLoadingState.pending;
    });

    builder.addCase(GetProject.fulfilled, (state, action) => {
      state.Status = SliceLoadingState.fulfilled;
      state.Project = action.payload;
    });

    builder.addCase(GetProject.rejected, (state) => {
      state.Status = SliceLoadingState.rejected;
    });
  },
});
