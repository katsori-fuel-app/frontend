import { FuelStatCreate, FuelStatUpdate } from '../dto';
import { fuelWebInstance } from '../instances';
import { FuelStatModel } from '../model/fuelStat';

const ROOT_PATH = 'fuel-stats';
const GET_RECORDS_PATH = `${ROOT_PATH}/recordings`;

export const fuelStatsService = {
    createRecord: (data: FuelStatCreate) => fuelWebInstance.post<FuelStatModel>(ROOT_PATH, data),

    getRecords: (userUuid: string) =>
        fuelWebInstance.get<FuelStatModel[]>(`${GET_RECORDS_PATH}?userId=${userUuid}`),
    getRecord: () => {},

    updateRecord: () => (data: FuelStatUpdate) =>
        fuelWebInstance.post<FuelStatModel>(ROOT_PATH, data),

    deleteRecord: () => {},
};
