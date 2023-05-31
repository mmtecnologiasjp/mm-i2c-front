import { create } from 'zustand';

import { User } from '../hooks/useUserQuery/types';

interface Store {
  user: User | null;
  actions: {
    storeUser: (user: User) => void;
  };
}

export const useUser = create<Store>((set) => ({
  user: null,
  actions: {
    storeUser: (user: User) => set({ user }),
  },
}));
