import { fuelWebInstance } from '../instances';

export const fuelStatsService = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createRecord: (url: string, data: any) => fuelWebInstance.post(url, data),

    getRecords: () => {},
    getRecord: () => {},

    updateRecord: () => {},

    deleteRecord: () => {},
};
