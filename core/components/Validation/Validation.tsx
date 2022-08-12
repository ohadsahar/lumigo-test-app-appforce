import AppButton from '@/shared/Button/Button';
import LoginField from '@/shared/LoginField/LoginField';
import React from 'react';
import { LoginFormWrapper } from '../Login/styled';
import { useLogin } from '../Tasks/hooks/useLogin';

const Validation = () => {
  const {
    onChangeValidationCode,
    onChangeFullName,
    onConfirmUser,
    fullName,
    validationCode,
    validationCodeError,
  } = useLogin();
  return (
    <LoginFormWrapper>
      <LoginField
        onChange={onChangeFullName}
        placeholder="Type your Full name"
        value={fullName}
        type="text"
        data-testid="fullname"
      />
      <LoginField
        onChange={onChangeValidationCode}
        placeholder="Type your code"
        value={validationCode}
        type="text"
        data-testid="password"
      />
      <AppButton buttonText="Submit" onSubmit={onConfirmUser} />
      {validationCodeError && <p>Validation code invalid</p>}
    </LoginFormWrapper>
  );
};

export default Validation;
