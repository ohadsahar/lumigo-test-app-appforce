import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '@/services/Auth.service';

export const useLogin = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useState(true);
  const [fullName, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationCode, setValidationCode] = useState<string>('');
  const [validationWaiting, setValidationWaiting] = useState<boolean>(false);
  const [validationCodeError, setValidationCodeError] =
    useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

  const handleLoginState = () => {
    setLoginState(!loginState);
    setFullname('');
    setEmail('');
    setPassword('');
  };

  const onChangeFullName = (value: string) => {
    setFullname(value);
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onChangeValidationCode = (value: string) => {
    setValidationCode(value);
  };

  const onSubmitLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = AuthService.login(fullName, password);
    result
      .then(() => {
        if (AuthService.getJWTToken()) {
          router.push('/main');
        }
      })
      .catch((err) => {
        setLoginFailed(true);
        console.log(err);
      });
  };

  const onSubmitSignUp = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = AuthService.submitSignUp(email, fullName, password);
    result.then((data: boolean) => {
      if (data) {
        setValidationWaiting(true);
      }
    });
  };

  const onConfirmUser = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = AuthService.confirmUser(fullName, validationCode);
    result
      .then((data: boolean) => {
        if (data) {
          setValidationCodeError(false);
          router.push('/main');
        }
      })
      .catch(() => {
        setValidationCodeError(true);
      });
  };

  return {
    loginState,
    fullName,
    email,
    password,
    validationWaiting,
    validationCode,
    validationCodeError,
    loginFailed,
    handleLoginState,
    onChangeFullName,
    onChangeEmail,
    onChangePassword,
    onChangeValidationCode,
    onSubmitLogin,
    onSubmitSignUp,
    onConfirmUser,
    setLoginFailed,
  };
};
