import { LocalStorageKeys } from '@/constants/LocalStorageKeys';
import { POOL_DATA } from '@/constants/Secret';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool(POOL_DATA);

interface emailAttributeProps {
  Name: string;
  Value: string;
}

export class AuthService {
  static confirmUser = (fullName: string, validationCode: string) => {
    const confirmData: any = { Username: fullName, Pool: userPool };
    const cognitoUser = new CognitoUser(confirmData);
    return new Promise<boolean>((resolve: any, reject: any) => {
      cognitoUser.confirmRegistration(validationCode, true, (err: any) => {
        if (!err) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  };

  static submitSignUp = (email: string, fullName: string, password: string) => {
    const attributeEmail: emailAttributeProps = {
      Name: 'email',
      Value: email,
    };
    console.log(email, fullName);
    const attributeList: CognitoUserAttribute[] = [];
    attributeList.push(new CognitoUserAttribute(attributeEmail));
    return new Promise<boolean>((resolve: any, reject: any) => {
      userPool.signUp(fullName, password, attributeList, [], (err: any) => {
        if (!err) {
          resolve(true);
        }
        reject(err);
      });
    });
  };

  static login = (fullName: string, password: string) => {
    const authDetails = new AuthenticationDetails({
      Username: fullName,
      Password: password,
    });
    const userData = { Username: fullName, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);
    return new Promise<CognitoUserSession>((resolve: any, reject: any) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess(result: CognitoUserSession) {
          localStorage.setItem(LocalStorageKeys.TOKENS, JSON.stringify(result));
          resolve(result);
        },
        onFailure(err) {
          reject(err);
        },
      });
    });
  };

  static getUserAuth = () => {
    userPool.getCurrentUser();
  };

  static logout = () => {
    userPool.getCurrentUser()?.signOut();
  };
}
