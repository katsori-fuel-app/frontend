import { instance } from '..';
import { GetUserRequest, UserDto } from '../dto';

export const userService = {
    getAllUser: () => instance.get<UserDto[]>('users'),
    getUser: ({ login }: GetUserRequest) => instance.get<UserDto>(`users/${login}`),

    createUser: (user: UserDto) => instance.post<UserDto[]>('users', user),
};
