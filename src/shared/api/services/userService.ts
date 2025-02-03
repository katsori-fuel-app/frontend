import { instance } from '..';
import { UserDto } from '../dto';

export const userService = {
    getAllUser: () => instance.get<UserDto[]>('users'),

    createUser: (user: UserDto) => instance.post<UserDto[]>('users', user),
};
