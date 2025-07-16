import { UserModel } from 'shared/api/model';
import { userService } from 'shared/api/services';
import { create } from 'zustand';

type UserStore = {
    user?: UserModel;
    fetchUser: (login: string) => Promise<UserModel>;
    setUser: (user: UserModel) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    fetchUser: async (login: string) => {
        const user = await userService.getUser(login);

        return user.data;
    },
    setUser: (user: UserModel) => {
        set({ user });
    },
}));
