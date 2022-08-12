import AppButton from '@/shared/Button/Button';
import LoginField from '@/shared/LoginField/LoginField';
import React from 'react';
import SignUp from '../SignUp/SignUp';
import { useLogin } from '../Tasks/hooks/useLogin';
import { LoginFormWrapper, LoginWrapper } from './styled';

const Login = () => {
  const {
    loginState,
    fullName,
    password,
    handleLoginState,
    onChangeFullName,
    onChangePassword,
    onSubmitLogin,
  } = useLogin();

  return (
    <LoginWrapper>
      <AppButton
        buttonText={loginState ? 'Sign up' : 'Login'}
        onSubmit={handleLoginState}
      />
      {loginState ? (
        <LoginFormWrapper>
          <LoginField
            onChange={onChangeFullName}
            placeholder="Type your Full name"
            value={fullName}
            type="text"
            data-testid="fullname"
          />
          <LoginField
            onChange={onChangePassword}
            placeholder="Type your password"
            value={password}
            type="password"
            data-testid="password"
          />
          <AppButton buttonText="Submit" onSubmit={onSubmitLogin} />
        </LoginFormWrapper>
      ) : (
        <SignUp />
      )}
    </LoginWrapper>
  );
};

export default Login;
