import { UserDto } from '../dto';
import { fuelWebInstance } from '../instances';
import { UserModel } from '../model';

const ROOT_PATH = 'users';

export const userService = {
    createUser: (user: UserDto) => fuelWebInstance.post<UserModel>(ROOT_PATH, user),

    getAllUser: () => fuelWebInstance.get<UserModel[]>(ROOT_PATH),
    getUser: (login: string) => fuelWebInstance.get<UserModel>(`${ROOT_PATH}/${login}`),
};
