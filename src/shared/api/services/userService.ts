import { instance } from '..';
import { GetUserRequest, UserDto } from '../dto';
import { User } from '../types';

export const userService = {
    getAllUser: () => instance.get<User[]>('users'),
    getUser: ({ login }: GetUserRequest) => instance.get<UserDto>(`users/${login}`),

    createUser: (user: UserDto) => instance.post<UserDto[]>('users', user),
    createMessage: (mes: any) => instance.post<any>('message', mes),
    getMessages: (userId: number) =>
        instance.get<{ message: string }[]>(`message/user?userId=${userId}`),
};
