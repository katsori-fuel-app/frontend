import { User } from '../types';

export type UserDto = Pick<User, 'login' | 'password' | 'email'>;

export type GetUserRequest = {
    login: string;
};
