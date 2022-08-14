import { LoginStatusType } from '@/constants/LoginStatus';
import AppButton from '@/shared/Button/Button';
import LoginField from '@/shared/LoginField/LoginField';
import React from 'react';
import {
  ButtonsWrapper,
  HintWrapper,
  InputsWrapper,
  LoginFormWrapper,
  LoginWrapper,
} from '../Login/styled';
import { useLogin } from '../Tasks/hooks/useLogin';

const SignUp = () => {
  const {
    fullName,
    email,
    password,
    handleLoginState,
    onChangeFullName,
    onChangeEmail,
    onChangePassword,
    onSubmitSignUp,
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
            onChange={onChangeEmail}
            placeholder="Email"
            value={email}
            type="email"
            data-testid="password"
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
          <AppButton buttonText="Sign up" onSubmit={onSubmitSignUp} />
          <HintWrapper onClick={() => handleLoginState(LoginStatusType.LOGIN)}>
            Already has an account ? Login
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

export default SignUp;
