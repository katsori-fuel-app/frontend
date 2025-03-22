import { instance } from '..';
import { UserDto } from '../dto';
import { User } from '../types';

export const userService = {
    getAllUser: () => instance.get<User[]>('users'),
    getUser: (login: string) => instance.get<User>(`users/${login}`),

    createUser: (user: UserDto) => instance.post<User>('users', user),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createMessage: (mes: any) => instance.post<any>('message', mes),
    getMessages: (userId: number) =>
        instance.get<{ message: string }[]>(`message/user?userId=${userId}`),
};
