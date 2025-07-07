import { DataBaseResponse } from 'shared/api/dataBaseResponse';

export type UserModel = {
    login: string;
    password: string;
    email: string;
} & DataBaseResponse;
