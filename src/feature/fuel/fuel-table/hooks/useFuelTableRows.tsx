import { FuelRecord } from 'feature/fuel/mock-data/TableData';
import { CSSProperties } from 'react';

type Props = {
    cloumnGrid: CSSProperties;
    fuelData: FuelRecord[];
};
export const useFuelTableRows = ({ cloumnGrid, fuelData }: Props) => {
    const fuelRows = fuelData.map((fuelRow) => {
        return fuelRow;
    });

    /**
     * Получает пройденное расстояние на 1 баке бенза.
     */
    const getConsumedMileage = (arr: FuelRecord[], i: number): number => {
        const consumedMileage =
            i === 0 ? 0 : Math.floor(arr[i].totalMileage - arr[i - 1].totalMileage);

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

    const html = fuelRows
        .map((row, i, arr) => {
            return (
                <div className="fuel-row" style={cloumnGrid} key={i}>
                    <div>{row.date}</div>
                    <div>{row.fuelCount}л</div>
                    <div>{row.fuelType}л</div>
                    <div>{getConsumedMileage(arr, i)}</div>
                    <div>{getFuelConsumption(row.fuelCount, getConsumedMileage(arr, i), i)}</div>
                    <div>{row.totalMileage}</div>
                    <div>{row.comment ?? '-'}</div>
                    <br />
                </div>
            );
        })
        .reverse();

    return html;
};
