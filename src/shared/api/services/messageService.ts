import { MessageDto } from '../dto';
import { fuelWebInstance } from '../instances';
import { MessageModel } from '../model/message';

const ROOT_PATH = 'message';
const GET_RECORDS_PATH = `${ROOT_PATH}/user`;

/**
 * Нужно ли это, т.к. будет комментарий к заправке, а эти комменты не будут использоваться вообще.
 */
export const messageService = {
    createMessage: (message: MessageDto) => fuelWebInstance.post<MessageModel>(ROOT_PATH, message),

    getMessages: (userId: number) =>
        fuelWebInstance.get<{ message: string }[]>(`${GET_RECORDS_PATH}?userId=${userId}`),
};
