import { FetchProjectForm, Canvas } from './components';
import { useCallback, useState } from 'react';
import { GetProjectData, GetRandomProject, ProjectContainer } from 'api';

export const CanvasDisplay = () => {
  const [projectId, setProjectId] = useState(
    'clnkpvwfi000108mn0pwacmwi-7661963926884798',
  );
  const [data, setData] = useState<ProjectContainer>();

  const fetch = useCallback(async (value: string) => {
    if (!value) {
      const randomProject = await GetRandomProject();
      value = randomProject.id;
      setProjectId(value);
    }

    const result = await GetProjectData(value);
    setData(result);
  }, []);

  const handleFetch = useCallback(
    (value: string) => {
      void fetch(value);
    },
    [fetch],
  );

  return (
    <>
      <FetchProjectForm
        value={projectId}
        //onChange={handleChangeProjectId}
        handleFetch={handleFetch}
      />
      <Canvas data={data} />
    </>
  );
};
