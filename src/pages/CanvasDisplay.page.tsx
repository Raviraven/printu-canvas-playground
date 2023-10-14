import { Canvas, FetchProjectForm, CanvasWrapper } from './components';
import { useCallback, useState } from 'react';
import { GetRandomProject } from 'api';
import { AppDispatch, GetProject } from 'redux-stuff';

import { useDispatch } from 'react-redux';

export const CanvasDisplayPage = () => {
  const [projectId, setProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

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
      {loading ? (
        <>Fetching random project</>
      ) : (
        <CanvasWrapper>
          <Canvas />
        </CanvasWrapper>
      )}
    </>
  );
};
