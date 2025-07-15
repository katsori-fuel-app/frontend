import { FuelStatCreate, FuelStatUpdate } from '../dto';
import { fuelWebInstance } from '../instances';
import { FuelStatModel } from '../model/fuelStat';

const FUEL_STAT_PATH = 'fuel-stats';

const GET_RECORDS_PATH = `${FUEL_STAT_PATH}/recordings`;

export const fuelStatsService = {
    createRecord: (data: FuelStatCreate) =>
        fuelWebInstance.post<FuelStatModel>(FUEL_STAT_PATH, data),

    getRecords: (userUuid: string) =>
        fuelWebInstance.get<FuelStatModel[]>(`${GET_RECORDS_PATH}?userId=${userUuid}`),
    getRecord: () => {},

    updateRecord: () => (data: FuelStatUpdate) =>
        fuelWebInstance.post<FuelStatModel>(FUEL_STAT_PATH, data),

    deleteRecord: () => {},
};
