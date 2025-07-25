import { FuelData } from '../types';
import './expectedRefuel.scss';

export const ExpectedRefuel = ({ fuelData }: FuelData) => {
    /** TODO Вынести в util */
    const forecastedValue: number = fuelData.reduce((acc, fuelRecord, i, settingArray) => {
        if (i > settingArray.length - 2) {
            const middle = acc / (settingArray.length - 1);

            return middle;
        }

        const consumedMileage = fuelRecord.totalMileage - settingArray[i + 1].totalMileage;
        acc += consumedMileage;

        return acc;
    }, 0);

    /** TODO Вынести в util */
    const formattedNumberValue = () => {
        const last = fuelData[0];

        if (last) {
            const nextFuel = Math.floor(last.totalMileage + forecastedValue);
            if (nextFuel > 100000) {
                const arr = nextFuel.toString().split('');
                const formattedNumber = arr.slice(0, 3).join('') + ' ' + arr.slice(3).join('');

                return formattedNumber;
            }
        }
    };

    return (
        <div className="expected-refuel">
            <span className="expected-refuel__info">Заправка на</span>
            <span className="expected-refuel__info">{formattedNumberValue()}км</span>
        </div>
    );
};
