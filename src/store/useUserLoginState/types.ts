export enum UserLoginState {
  VERIFYING = 'VERIFYING',
  LOGGED_IN = 'LOGGED_IN',
  NOT_LOGGED_IN = 'NOT_LOGGED_IN',
}

export interface Store {
  userLoginState: UserLoginState;
  login: () => void;
  logout: () => void;
}
