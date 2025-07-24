'use client';

import { useEffect, useState } from 'react';
import './fuelCards.scss';
import { fueldMockData, FuelMockData } from '../mock-data/TableData';
import { FuelCard } from './fuelCard';

export const FuelCards = () => {
    const [fuelData, setFuelData] = useState<FuelMockData>([]);

    useEffect(() => {
        setFuelData(fueldMockData);
    }, []);

    return (
        <div>
            <div className="mobile-fuel-table">
                {fuelData.map((fuelInfo) => {
                    return <FuelCard key={fuelInfo.totalMileage} {...fuelInfo} />;
                })}
            </div>
        </div>
    );
};
