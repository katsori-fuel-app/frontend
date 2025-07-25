import { FC, useState } from 'react';
import './fuelCard.scss';
import { CardRow } from './card-row';
import { FuelRecord } from 'feature/fuel/types';

// const nameProp = [
//     {
//         prop: 'date',
//         name: 'дата',
//     },
//     {
//         prop: 'fuelConst',
//         name: 'цена',
//     },
//     {
//         prop: 'fuelCount',
//         name: 'количество',
//     },
//     {
//         prop: 'fuelType',
//         name: 'тип',
//     },
//     {
//         prop: 'totalMileage',
//         name: 'пробег',
//     },
// ];

type Props = {
    info: FuelRecord;
    prevMileage: number | undefined;
};

/** TODO
 ** добавить ShortCard, DetailCard.
 ** В списке показывается short, при нажатии открывается портал и там detail.
 **/
export const FuelCard: FC<Props> = ({ info, prevMileage }) => {
    const [isShowFull, setIsShowFull] = useState(false);

    if (!isShowFull)
        return (
            <button className="fuel-card" onClick={() => setIsShowFull(true)}>
                <div className="fuel-card__wrapper">
                    <CardRow fieldName="Дата" fieldValue={info.date} />
                    <span className="fuel-card__detail">Показать</span>
                </div>
                <CardRow fieldName="Проехал" fieldValue={prevMileage ?? 0} />
                <CardRow fieldName="Комментарий" fieldValue={info.comment || 'нет'} />
            </button>
        );

    return (
        <button className="fuel-card" onClick={() => setIsShowFull(false)}>
            добавить полные данные (закрыть)
        </button>
    );
};
