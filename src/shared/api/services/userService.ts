import { fuelWebInstance } from '../dataBaseResponse';
import { UserDto } from '../dto';
import { User } from '../types';

export const userService = {
    createUser: (user: UserDto) => fuelWebInstance.post<User>('users', user),

    getAllUser: () => fuelWebInstance.get<User[]>('users'),
    getUser: (login: string) => fuelWebInstance.get<User>(`users/${login}`),
};
