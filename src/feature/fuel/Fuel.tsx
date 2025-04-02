'use client';

import { Fragment } from 'react';

const setting = [
    {
        date: '12.03.2025',
        fuelCount: 25.61,
        currentKm: 168711,
    },
    {
        date: '19.03.2025',
        fuelCount: 25.61,
        currentKm: 168933,
    },
    {
        date: '29.03.2025',
        fuelCount: 25.61,
        currentKm: 169159,
    },
];

const forecastedValue: number = setting.reduce((acc, current, i, settingArray) => {
    const S = i === 0 ? 0 : settingArray[i].currentKm - settingArray[i - 1].currentKm;

    acc += S;

    if (i === settingArray.length - 1) {
        return acc / (settingArray.length - 1);
    }

    return acc;
}, 0);

export const Fuel = () => {
    return (
        <div>
            <div>
                {setting.map((a, i, settingArray) => {
                    const S =
                        i === 0 ? 0 : settingArray[i].currentKm - settingArray[i - 1].currentKm;

                    const U = i === 0 ? 'нет данных' : (a.fuelCount / S) * 100;

                    return (
                        <Fragment key={i}>
                            <div>Дата заправки: {a.date}</div>
                            <div>Количество топлива: {a.fuelCount}л</div>
                            <div>
                                Прошел пробег с последней заправки:
                                {Math.floor(S)}
                                км
                            </div>
                            <div>
                                Расход топлива: {typeof U === 'number' ? `${Math.floor(U)}л` : U}
                            </div>
                            <div>Текущий пробег: {a.currentKm}</div>
                            <br />
                        </Fragment>
                    );
                })}

                <div>
                    <span>следующая заправка прогнозируется на пробеге:</span>
                    <span>{setting.at(-1)!.currentKm + forecastedValue}км</span>
                </div>
            </div>
        </div>
    );
};
