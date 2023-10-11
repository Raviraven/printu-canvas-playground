import { FormEvent } from 'react';

interface TextInputProps {
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  const { value, onChange } = props;

  return <input type={'text'} value={value} onChange={onChange} />;
};
