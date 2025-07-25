'use client';

import './fuelCards.scss';
import { FuelCard } from './ui/fuel-card';
import { FC } from 'react';
import { FuelData } from '../types';

export const FuelCards: FC<FuelData> = ({ fuelData }) => {
    return (
        <div>
            <div className="mobile-fuel-table">
                {fuelData.map((fuelInfo, i) => {
                    let prevMileage: number | undefined = undefined;
                    if (i < fuelData.length - 1)
                        prevMileage = fuelInfo.totalMileage - fuelData[i + 1].totalMileage;

                    return (
                        <FuelCard
                            key={fuelInfo.totalMileage}
                            info={fuelInfo}
                            prevMileage={prevMileage}
                        />
                    );
                })}
            </div>
        </div>
    );
};
