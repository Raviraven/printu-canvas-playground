import { GeneralProjectInfo, GetRandomProject } from 'api';
import { SliceLoadingState } from './SliceLoadingState';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface ProjectState {
  //Project: GeneralProjectInfo;
  ProjectId: string;
  Status: SliceLoadingState;
}

const initialState: ProjectState = {
  // Project: {
  //   id: '',
  //   name: '',
  //   modified: 0,
  // },
  ProjectId: '',
  Status: SliceLoadingState.idle,
};

export const GetRandomProjectInfo = createAsyncThunk(
  'api/get-random-project-info',
  async (_, thunkAPI) => {
    try {
      return await GetRandomProject();
    } catch (error) {
      return thunkAPI.rejectWithValue(error as AxiosError);
    }
  },
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectId(state, action) {
      state.ProjectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetRandomProjectInfo.pending, (state) => {
      state.Status = SliceLoadingState.pending;
    });

    builder.addCase(GetRandomProjectInfo.fulfilled, (state, action) => {
      console.log(action);
      state.Status = SliceLoadingState.fulfilled;
      //state.Project = action.payload;
      state.ProjectId = action.payload.id;
    });

    builder.addCase(GetRandomProjectInfo.rejected, (state, action) => {
      state.Status = SliceLoadingState.rejected;
    });
  },
});
