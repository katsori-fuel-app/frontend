import { FuelData } from 'feature/fuel/types';

const MOCK_FUEL_DATA: FuelData = {
    fuelData: [
        {
            mode: 'init',
            date: '12.02.2025',
            fuelCount: 25.67,
            fuelType: '95',
            totalMileage: 168075,
            fuelCost: 1500,
            initFuelConsumption: 8,
            fuelTankCapacity: 50,
        }
    ],
    expectedRefuelDays: 7,
    expectedRefuelDistance: 266,

};

export const mockedFuelData = {
    ...MOCK_FUEL_DATA,
    fuelData: [...MOCK_FUEL_DATA.fuelData].reverse(),
};
