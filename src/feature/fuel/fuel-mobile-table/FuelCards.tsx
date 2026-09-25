'use client';

import './fuelCards.scss';
import { FuelCard } from './ui/fuel-card';
import { FuelData } from '../types';

type FuelCardsProps = {
    fuelData: FuelData['fuelData'];
};

export const FuelCards = ({ fuelData }: FuelCardsProps) => {
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
