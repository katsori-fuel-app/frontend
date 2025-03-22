import { userService } from 'shared/api/services';
import { User } from 'shared/api/types';
import { create } from 'zustand';

type UserStore = {
    user?: User;
    fetchUser: (login: string) => Promise<User>;
    setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    fetchUser: async (login: string) => {
        const user = await userService.getUser(login);

        return user.data;
    },
    setUser: (user: User) => {
        set({ user });
    },
}));
