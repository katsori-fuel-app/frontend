import { DataBaseResponse } from './dataBaseResponse';

export type User = {
    login: string;
    password: string;
    email: string;
} & DataBaseResponse;
