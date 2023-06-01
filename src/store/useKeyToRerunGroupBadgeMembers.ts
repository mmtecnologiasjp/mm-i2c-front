import { create } from 'zustand';

interface Store {
  key: number;
  actions: {
    incrementKey: () => void;
  };
}

export const useKeyToRerunGroupBadgeMembers = create<Store>((set) => ({
  key: 0,
  actions: {
    incrementKey() {
      return set((state) => ({ key: state.key + 1 }));
    },
  },
}));
