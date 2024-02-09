import { create } from 'zustand';

import { User } from '../hooks/useUserQuery/types';

interface State {
  otherUser: User | null;
  actions: {
    storeOtherUser(otherUser: User): void;
  };
}

export const useOtherUserOnPrivateConversation = create<State>((set) => ({
  otherUser: null,
  actions: {
    storeOtherUser(otherUser: User) {
      set({ otherUser });
    },
  },
}));
