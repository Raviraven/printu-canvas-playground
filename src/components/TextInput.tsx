import { FormEvent } from 'react';

interface TextInputProps {
  id?: string;
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  const { value, onChange, id } = props;

  return <input type={'text'} value={value} onChange={onChange} id={id} />;
};
