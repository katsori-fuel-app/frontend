import { FuelData } from '../types';
import './expectedRefuel.scss';

type ExpectedRefuelType = {
    distance: number;
    days: number;
}

export const ExpectedRefuel = ({ distance, days }: ExpectedRefuelType) => {
    return (
        <div className="expected-refuel">
            <span className="expected-refuel__info">Следующая заправка примерно через</span>
            <span className="expected-refuel__info">{distance} км</span>
            <span className="expected-refuel__info">{days} дней</span>
        </div>
    );
};
