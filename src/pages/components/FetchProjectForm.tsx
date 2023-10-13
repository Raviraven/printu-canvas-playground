import { FormEvent, useCallback, useEffect, useState } from 'react';
import { TextInput } from 'components/TextInput';

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
    <section>
      <TextInput value={currentValue} onChange={handleOnInputValueChange} />
      <button type={'button'} onClick={() => handleFetch(currentValue)}>
        Fetch
      </button>
    </section>
  );
};
