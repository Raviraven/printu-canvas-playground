import { FormEvent, useCallback, useEffect, useState } from 'react';
import { TextInput } from 'components/TextInput';

import { GetRandomProject } from 'api';
import { AppDispatch, GetProject, RootState } from 'redux-stuff';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectId } from 'redux-stuff/ProjectSlice';

import './FetchProjectForm.scss';

export const FetchProjectForm = () => {
  const [currentValue, setCurrentValue] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { ProjectId } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    if (ProjectId) {
      setCurrentValue(ProjectId);
    }
  }, [ProjectId]);

  const fetch = useCallback(
    async (value: string) => {
      if (!value) {
        const randomProject = await GetRandomProject();
        value = randomProject.id;
        dispatch(setProjectId(value));
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

  const handleOnInputValueChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setCurrentValue(e.currentTarget.value);
    },
    [],
  );

  const handleOnFetchClick = useCallback(() => {
    handleFetch(currentValue);
  }, [currentValue, handleFetch]);

  const handleOnClearClick = useCallback(() => {
    setCurrentValue('');
  }, []);

  return (
    <section className={'fetch-project-form'}>
      <TextInput
        value={currentValue}
        onChange={handleOnInputValueChange}
        id={'report-input-id'}
      />
      <button
        type={'button'}
        onClick={handleOnFetchClick}
        className={'fetch-button'}
      >
        Fetch
      </button>
      <button type={'button'} onClick={handleOnClearClick}>
        Clear
      </button>
    </section>
  );
};
