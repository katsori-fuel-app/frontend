import { DataBaseResponse } from 'shared/api/dataBaseResponse';

export type FuelStatModel = {
    fuelCount: string;
    fuelType: string;
    refuelCost: string;
    totalMileage: number;
    userId: string;
    consumedMileage: number;
    forecastedValue: number;
    fuelConsumption: number;
    date: string;
    comment?: string;
} & DataBaseResponse;
