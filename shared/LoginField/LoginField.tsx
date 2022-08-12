import React from 'react';
import { InputFieldWrapper, InputWrapper } from '../InputField/styled';

interface LoginFieldProps {
  onChange: (value: string) => void;
  value: string;
  type: string;
  'data-testid'?: string;
  placeholder: string;
}
const LoginField = ({
  onChange,
  value,
  type,
  placeholder,
  'data-testid': dataTestId,
}: LoginFieldProps) => {
  return (
    <InputFieldWrapper>
      <InputWrapper
        placeholder={placeholder}
        type={type}
        data-testid={dataTestId}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.currentTarget.value);
        }}
      />
    </InputFieldWrapper>
  );
};

export default LoginField;
