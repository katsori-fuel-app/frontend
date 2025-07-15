import { MessageDto } from '../dto';
import { fuelWebInstance } from '../instances';
import { MessageModel } from '../model/message';

export const messageService = {
    createMessage: (message: MessageDto) => fuelWebInstance.post<MessageModel>('message', message),

    getMessages: (userId: number) =>
        fuelWebInstance.get<{ message: string }[]>(`message/user?userId=${userId}`),
    getMessage: () => {},

    updateMessage: () => {},

    deleteMessage: () => {},
};
