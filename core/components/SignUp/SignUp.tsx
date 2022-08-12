import AppButton from '@/shared/Button/Button';
import LoginField from '@/shared/LoginField/LoginField';
import React from 'react';
import { LoginFormWrapper } from '../Login/styled';
import { useLogin } from '../Tasks/hooks/useLogin';
import Validation from '../Validation/Validation';

const SignUp = () => {
  const {
    fullName,
    email,
    password,
    validationWaiting,
    onChangeFullName,
    onChangeEmail,
    onChangePassword,
    onSubmitSignUp,
  } = useLogin();
  return !validationWaiting ? (
    <LoginFormWrapper>
      <LoginField
        onChange={onChangeFullName}
        placeholder="Type your Full name"
        value={fullName}
        type="text"
        data-testid="fullname"
      />
      <LoginField
        onChange={onChangeEmail}
        placeholder="Type your email"
        value={email}
        type="email"
        data-testid="password"
      />
      <LoginField
        onChange={onChangePassword}
        placeholder="Type your password"
        value={password}
        type="password"
        data-testid="password"
      />
      <AppButton buttonText="Submit" onSubmit={onSubmitSignUp} />
    </LoginFormWrapper>
  ) : (
    <Validation />
  );
};

export default SignUp;
