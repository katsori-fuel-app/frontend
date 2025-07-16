import { UserModel } from 'shared/api/model';

export type UserDto = Pick<UserModel, 'login' | 'password' | 'email'>;
