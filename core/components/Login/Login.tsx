import { LoginStatusType } from '@/constants/LoginStatus';
import AppButton from '@/shared/Button/Button';
import LoginField from '@/shared/LoginField/LoginField';
import React from 'react';
import { useLogin } from '../Tasks/hooks/useLogin';
import {
  ButtonsWrapper,
  HintWrapper,
  InputsWrapper,
  LoginFormWrapper,
  LoginWrapper,
} from './styled';

const Login = () => {
  const {
    fullName,
    password,
    handleLoginState,
    onChangeFullName,
    onChangePassword,
    onSubmitLogin,
  } = useLogin();
  return (
    <LoginWrapper>
      <LoginFormWrapper>
        <InputsWrapper>
          <LoginField
            onChange={onChangeFullName}
            placeholder="Username"
            value={fullName}
            type="text"
            data-testid="fullname"
          />
          <LoginField
            onChange={onChangePassword}
            placeholder="Password"
            value={password}
            type="password"
            data-testid="password"
          />
        </InputsWrapper>
        <ButtonsWrapper>
          <AppButton buttonText="Login" onSubmit={onSubmitLogin} />
          <HintWrapper onClick={() => handleLoginState(LoginStatusType.SIGNUP)}>
            Doesnt have an account ? Sign up
          </HintWrapper>
          <HintWrapper
            onClick={() => handleLoginState(LoginStatusType.VALIDATION)}
          >
            Just need a validation ? Validate
          </HintWrapper>
        </ButtonsWrapper>
      </LoginFormWrapper>
    </LoginWrapper>
  );
};

export default Login;
