'use client';

import './fuel.scss';

type Setting = {
    date: string;
    fuelCount: number;
    fuelType: number;
    totalMileage: number;
}[];

const setting: Setting = [
    {
        date: '12.03.2025',
        fuelCount: 25.61,
        fuelType: 95,
        totalMileage: 168711,
    },
    {
        date: '19.03.2025',
        fuelCount: 25.61,
        fuelType: 95,
        totalMileage: 168933,
    },
    {
        date: '29.03.2025',
        fuelCount: 25.61,
        fuelType: 95,
        totalMileage: 169159,
    },
];

const forecastedValue: number = setting.reduce((acc, _, i, settingArray) => {
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
                {setting.map((a, i, settingArray) => {
                    const consumedMileage = getConsumedMileage(settingArray, i);
                    const fuelConsumption = getFuelConsumption(a.fuelCount, consumedMileage, i);

                    return (
                        <div key={i} className="item">
                            <div>Дата заправки: {a.date}</div>
                            <div>Количество топлива: {a.fuelCount}л</div>
                            <div>Тип бензина: {a.fuelType}л</div>
                            <div>
                                Прошел пробег с последней заправки:
                                {consumedMileage}
                                км
                            </div>
                            <div>Расход топлива: {fuelConsumption}/100км</div>
                            <div>Текущий пробег: {a.totalMileage}</div>
                            <br />
                        </div>
                    );
                })}

                <div>
                    <span>следующая заправка прогнозируется на пробеге:</span>
                    <span>{setting.at(-1)!.totalMileage + forecastedValue}км</span>
                </div>
            </div>
        </div>
    );
};
