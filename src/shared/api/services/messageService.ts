import { MessageDto } from '../dto';
import { fuelWebInstance } from '../instances';
import { MessageModel } from '../model/message';

const ROOT_PATH = 'message';
const GET_RECORDS_PATH = `${ROOT_PATH}/user`;

export const messageService = {
    createMessage: (message: MessageDto) => fuelWebInstance.post<MessageModel>(ROOT_PATH, message),

    getMessages: (userId: number) =>
        fuelWebInstance.get<{ message: string }[]>(`${GET_RECORDS_PATH}?userId=${userId}`),
    getMessage: () => {},

    updateMessage: () => {},

    deleteMessage: () => {},
};
