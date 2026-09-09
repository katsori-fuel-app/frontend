import { FuelRecord } from 'feature/fuel/types';

const theFirstFuelData: FuelRecord[] = [
    {
        date: '12.02.2025',
        fuelCount: 25.67,
        fuelType: '95',
        totalMileage: 168075,
        fuelCost: 1500,
        fuelConsumption: 8,
        fuelTankCapacity: 50,
    },
];

export const fuelMockData: FuelRecord[] = [...theFirstFuelData].reverse();
