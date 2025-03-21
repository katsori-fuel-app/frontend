import { create } from 'zustand';

type AuthStore = {
    count: number;
    increment: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
}));
