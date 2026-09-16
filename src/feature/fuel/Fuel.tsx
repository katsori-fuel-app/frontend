'use client';

import { useClickOutside, useToggle, useWindowSize } from 'shared/hooks';
import { FuelTable } from './fuel-table';
import './fuel.scss';
import { useEffect, useRef, useState } from 'react';
import { phoneWidthMax } from 'shared/utils/constants';
import { FuelCards } from './fuel-mobile-table';
import { ExpectedRefuel } from './expected-refuel';
import { ModalPortal } from 'shared/uiKit/modals/ModalPortal';
import { RefuelForm } from './shared/refuel-form';
import { mockedFuelData } from '../../mock-data/TableData';

export const Fuel = () => {
    const [width] = useWindowSize();
    const { toggleOn, toggleOff, isToggled } = useToggle();

    const refPrimary = useRef<HTMLDivElement>(null);

    /** TODO Вынести в hook определение мобилки глобально, т.к. это по всему проекту чекануть нужно, а не локально */
    const [isLoading, setIsLoading] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const { expectedRefuelDistance, expectedRefuelDays, fuelData } = mockedFuelData;

    useEffect(() => {
        if (width < phoneWidthMax) {
            setIsPhone(true);
        } else {
            // setIsPhone(false);
            setIsPhone(true); // пока разрабатываю для мобилки
        }

        setIsLoading(false);
    }, [width]);

    // request for FuelData will be here
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 500);
    }, []);

    useClickOutside({ refPrimary, handler: toggleOff });

    if (isLoading) return 'loading...';

    /** TODO кнопки сделать иконками:
     * Добавить - плюсик или чот такое.
     * Ожидаемая заправка: иконка и цифра рядом. Когда нажимаешь на цифру, выводится тултип с инфой,
     * что это ожидаемая заправка.
     */
    return (
        <div className="fuel">
            {isPhone ? (
                <>
                    <ExpectedRefuel days={expectedRefuelDays} distance={expectedRefuelDistance} />

                    <button className="add-btn" onClick={toggleOn}>
                        Добвить запись
                    </button>

                    <FuelCards {...fuelData} />
                </>
            ) : (
                <>
                    <button className="add-btn" onClick={toggleOn}>
                        Добвить запись
                    </button>

                    <FuelTable {...fuelData} />

                    <ExpectedRefuel days={expectedRefuelDays} distance={expectedRefuelDistance} />
                </>
            )}

            {isToggled && (
                <ModalPortal ref={refPrimary}>
                    <RefuelForm mode="regular" closeForm={toggleOff} />
                </ModalPortal>
            )}
        </div>
    );
};
