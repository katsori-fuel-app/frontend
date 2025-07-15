import { DataBaseResponse } from 'shared/api/dataBaseResponse';

export type MessageModel = {
    message: string;
    userId: string;
} & DataBaseResponse;
