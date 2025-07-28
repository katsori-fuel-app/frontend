import { FC, useRef, useState } from 'react';
import './fuelCard.scss';
import { CardRow } from './card-row';
import { FuelRecord } from 'feature/fuel/types';
import { ModalPortal } from 'shared/uiKit/modals/ModalPortal';
import { useClickOutside, useToggle } from 'shared/hooks';
import { CreateRecordForm } from 'feature/fuel/create-record-form';

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
    const { isToggled, toggleOff, toggleOn } = useToggle();

    const [isShowFull, setIsShowFull] = useState(false);

    const refPrimary = useRef<HTMLDivElement>(null);

    useClickOutside({
        refPrimary,
        handler: () => setTimeout(() => !isToggled && setIsShowFull(false), 100),
    });

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
        <>
            <div className="fuel-card" ref={refPrimary}>
                <div className="fuel-card__wrapper">
                    <CardRow fieldName="Дата" fieldValue={info.date} />

                    <button className="fuel-card__detail" onClick={toggleOn}>
                        изменить
                    </button>

                    <button className="fuel-card__detail" onClick={() => setIsShowFull(false)}>
                        закрыть
                    </button>
                </div>

                <CardRow fieldName="Цена топлива" fieldValue={info.fuelCost} />
                <CardRow fieldName="Количество топлива" fieldValue={info.fuelCount} />
                <CardRow fieldName="Тип топлива" fieldValue={info.fuelType} />
                <CardRow fieldName="Проехал" fieldValue={prevMileage ?? 0} />
                <CardRow fieldName="Текущий пробег" fieldValue={info.totalMileage} />
                <CardRow fieldName="Комментарий" fieldValue={info.comment || 'нет'} />
            </div>

            {isToggled && (
                <ModalPortal>
                    <CreateRecordForm mode="edit" data={info} closeForm={toggleOff} />
                </ModalPortal>
            )}
        </>
    );
};
