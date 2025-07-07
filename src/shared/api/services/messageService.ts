import { fuelWebInstance } from '../instances';

export const messageService = {
    // TODO fix any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createMessage: (mes: any) => fuelWebInstance.post<any>('message', mes),

    getMessages: (userId: number) =>
        fuelWebInstance.get<{ message: string }[]>(`message/user?userId=${userId}`),
    getMessage: () => {},

    updateMessage: () => {},

    deleteMessage: () => {},
};
