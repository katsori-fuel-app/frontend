'use client';

import { FuelTable } from './fuel-table';
import './fuel.scss';
import { fueldMockData } from './mock-data/TableData';

type Setting = {
    date: string;
    fuelCount: number;
    fuelType: number;
    totalMileage: number;
    fuelCost: number;
    comment?: string;
}[];

const forecastedValue: number = fueldMockData.reduce((acc, _, i, settingArray) => {
    const consumedMileage =
        i === 0 ? 0 : settingArray[i].totalMileage - settingArray[i - 1].totalMileage;

    acc += consumedMileage;

    if (i === settingArray.length - 1) {
        return acc / (settingArray.length - 1);
    }

    return acc;
}, 0);

/**
 * Получает пройденное расстояние на 1 баке бенза.
 */
const getConsumedMileage = (arr: Setting, i: number): number => {
    const consumedMileage = i === 0 ? 0 : Math.floor(arr[i].totalMileage - arr[i - 1].totalMileage);

    return consumedMileage;
};

/**
 * Получает расход топлива 10л/100км.
 */
const getFuelConsumption = (fuelCount: number, consumedMileage: number, i: number): string => {
    if (i === 0) return 'нет данных';

    const res = Math.floor((fuelCount / consumedMileage) * 100);

    return `${res}л`;
};

export const Fuel = () => {
    return (
        <div className="fuel">
            <div>
                <FuelTable />

                <div>
                    <span>следующая заправка прогнозируется на пробеге:</span>
                    <span>{fueldMockData.at(-1)!.totalMileage + forecastedValue}км</span>
                </div>
            </div>
        </div>
    );
};
