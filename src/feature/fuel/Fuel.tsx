'use client';

import { useWindowSize } from 'shared/hooks';
import { AddRecord } from './addRecord';
import { FuelTable } from './fuel-table';
import './fuel.scss';
import { fueldMockData } from './mock-data/TableData';
import { useEffect, useState } from 'react';
import { phoneWidthMax } from 'shared/utils/constants';
import { FuelCards } from './fuelMobileTable';

/** TODO Вынести в util */
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
    const [width] = useWindowSize();

    /** TODO Вынести в hook определение мобилки глобально, т.к. это по всему проекту чекануть нужно, а не локально */
    const [isLoading, setIsLoading] = useState(true);
    const [isPhone, setIsPhone] = useState(false);

    /** TODO Вынести в util */
    const formattedNumberValue = () => {
        const nextFuel = Math.floor(fueldMockData.at(-1)!.totalMileage + forecastedValue);

        if (nextFuel > 100000) {
            const arr = nextFuel.toString().split('');
            const formattedNumber = arr.slice(0, 3).join('') + ' ' + arr.slice(3).join('');

            return formattedNumber;
        }
    };

    useEffect(() => {
        if (width < phoneWidthMax) {
            setIsPhone(true);
        } else {
            setIsPhone(false);
        }

        setIsLoading(false);
    }, [width]);

    if (isLoading) return 'loading...';

    return (
        <div className="fuel">
            <div>
                <AddRecord />

                {isPhone ? <FuelCards /> : <FuelTable />}

                <div>
                    <p>следующая заправка на пробеге:</p>
                    <p>{formattedNumberValue()}км</p>
                </div>
            </div>
        </div>
    );
};
