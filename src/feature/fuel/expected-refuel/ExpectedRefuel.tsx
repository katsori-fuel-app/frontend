import { FuelData } from '../types';
import './expectedRefuel.scss';

export const ExpectedRefuel = ({ fuelData }: FuelData) => {
    if (fuelData.length < 4) return null;

    const recent = fuelData.slice(0, 8);

    const intervals = recent
        .slice(0, -1)
        .map((cur, i) => {
            const prev = recent[i + 1];
            return cur.totalMileage - prev.totalMileage;
        })
        .filter((x): x is number => x > 0)
        .sort((a, b) => a - b);

    if (intervals.length < 3) return null;

    /**
     * ✔ trimmed mean (убираем 1 самый маленький и 1 самый большой)
     */
    const trimmed = intervals.slice(1, -1);

    const avg = trimmed.reduce((a, b) => a + b, 0) / trimmed.length;

    const currentMileage = fuelData[0].totalMileage;

    const nextMileage = Math.round(currentMileage + avg);

    const formatted = nextMileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return (
        <div className="expected-refuel">
            <span className="expected-refuel__info">Следующая заправка на</span>

            <span className="expected-refuel__info">{formatted} км</span>
        </div>
    );
};
