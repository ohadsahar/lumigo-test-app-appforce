import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '@/services/Auth.service';
import { LocalStorageService } from '@/services/LocalStorage.service';
import { LocalStorageKeys } from '@/constants/LocalStorageKeys';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/redux/actions/Alert';
import { Strings } from '@/constants/Strings';
import { LoginStatusType } from '@/constants/LoginStatus';

export const useLogin = () => {
  const router = useRouter();
  const [fullName, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationCode, setValidationCode] = useState<string>('');
  const [validationCodeError, setValidationCodeError] =
    useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLoginState = (value: LoginStatusType) => {
    setFullname('');
    setEmail('');
    setPassword('');
    handleRouting(value);
  };

  const handleRouting = (value: LoginStatusType) => {
    if (value === LoginStatusType.SIGNUP) {
      router.push('/sign_up_page');
    }
    if (value === LoginStatusType.LOGIN) {
      router.push('/login_page');
    }
    if (value === LoginStatusType.VALIDATION) {
      router.push('/validation_page');
    }
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
        if (LocalStorageService.getNameByKey(LocalStorageKeys.TOKENS)) {
          router.push('/main');
        }
      })
      .catch(() => {
        setLoginFailed(true);
        dispatch(setAlert(Strings.FailedLogin, Strings.Error) as any);
      });
  };

  const onSubmitSignUp = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = AuthService.submitSignUp(email, fullName, password);
    result
      .then((data: any) => {
        console.log(data);
        if (data) {
          router.push('/validation_page');
        }
      })
      .catch(() => {
        dispatch(setAlert(Strings.FailedSignUp, Strings.Error) as any);
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
        dispatch(setAlert(Strings.ValidationError, Strings.Error) as any);
      });
  };

  return {
    fullName,
    email,
    password,
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
