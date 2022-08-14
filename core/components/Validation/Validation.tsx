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

const Validation = () => {
  const {
    onChangeValidationCode,
    onChangeFullName,
    onConfirmUser,
    handleLoginState,
    fullName,
    validationCode,
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
            onChange={onChangeValidationCode}
            placeholder="Verification Code (Check your mail)"
            value={validationCode}
            type="text"
            data-testid="code"
          />
        </InputsWrapper>
        <ButtonsWrapper>
          <AppButton buttonText="Submit" onSubmit={onConfirmUser} />
          <HintWrapper onClick={() => handleLoginState(LoginStatusType.LOGIN)}>
            Already has an account ? Login
          </HintWrapper>
        </ButtonsWrapper>
      </LoginFormWrapper>
    </LoginWrapper>
  );
};

export default Validation;
