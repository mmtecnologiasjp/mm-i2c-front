import { create } from 'zustand';

import { Store, UserLoginState } from './types';

export const useUserLoginState = create<Store>((set) => ({
  userLoginState: UserLoginState.VERIFYING,
  login: () => set({ userLoginState: UserLoginState.LOGGED_IN }),
  logout: () => set({ userLoginState: UserLoginState.NOT_LOGGED_IN }),
}));
