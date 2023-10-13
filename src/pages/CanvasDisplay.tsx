import { Canvas, FetchProjectForm } from './components';
import { useCallback, useState } from 'react';
import { GetRandomProject } from 'api';
import {
  AppDispatch,
  RootState,
  GetProject,
  SliceLoadingState,
} from 'redux-stuff';

import { useDispatch, useSelector } from 'react-redux';

export const CanvasDisplay = () => {
  const [projectId, setProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { Project, Status } = useSelector(
    (state: RootState) => state.projectDetails,
  );

  const fetch = useCallback(
    async (value: string) => {
      if (!value) {
        setLoading(true);
        const randomProject = await GetRandomProject();
        value = randomProject.id;
        setProjectId(value);
        setLoading(false);
      }

      dispatch(GetProject(value));
    },
    [dispatch],
  );

  const handleFetch = useCallback(
    (value: string) => {
      void fetch(value);
    },
    [fetch],
  );

  return (
    <>
      <FetchProjectForm value={projectId} handleFetch={handleFetch} />
      {Status === SliceLoadingState.pending || loading ? (
        <>Loading</>
      ) : (
        <Canvas data={Project} />
      )}
    </>
  );
};
