import { FormEvent, useCallback, useEffect, useState } from 'react';
import { TextInput } from 'components/TextInput';

import './FetchProjectForm.scss';

interface GetProjectFormProps {
  value?: string;
  handleFetch: (value: string) => void;
}

export const FetchProjectForm = (props: GetProjectFormProps) => {
  const { value, handleFetch } = props;

  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    if (value) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleOnInputValueChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setCurrentValue(e.currentTarget.value);
    },
    [],
  );

  return (
    <section className={'fetch-project-form'}>
      <TextInput value={currentValue} onChange={handleOnInputValueChange} />
      <button
        type={'button'}
        onClick={() => handleFetch(currentValue)}
        className={'fetch-button'}
      >
        Fetch
      </button>
      <button type={'button'} onClick={() => setCurrentValue('')}>
        Clear
      </button>
    </section>
  );
};
