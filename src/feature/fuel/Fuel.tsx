'use client';

import { AddRecord } from './addRecord';
import { FuelTable } from './fuel-table';
import './fuel.scss';
import { fueldMockData } from './mock-data/TableData';

const forecastedValue: number = fueldMockData.reduce((acc, _, i, settingArray) => {
    const consumedMileage =
        i === 0 ? 0 : settingArray[i].totalMileage - settingArray[i - 1].totalMileage;

    acc += consumedMileage;

    if (i === settingArray.length - 1) {
        return acc / (settingArray.length - 1);
    }

    return acc;
}, 0);

export const Fuel = () => {
    return (
        <div className="fuel">
            <div>
                <AddRecord />
                <FuelTable />

                <div>
                    <span>следующая заправка прогнозируется на пробеге:</span>
                    <span>{fueldMockData.at(-1)!.totalMileage + forecastedValue}км</span>
                </div>
            </div>
        </div>
    );
};
