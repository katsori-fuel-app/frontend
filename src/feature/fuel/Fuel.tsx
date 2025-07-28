'use client';

import { useClickOutside, useToggle, useWindowSize } from 'shared/hooks';
import { FuelTable } from './fuel-table';
import './fuel.scss';
import { fueldMockData } from './mock-data/TableData';
import { useEffect, useRef, useState } from 'react';
import { phoneWidthMax } from 'shared/utils/constants';
import { FuelCards } from './fuel-mobile-table';
import { ExpectedRefuel } from './expected-refuel';
import { ModalPortal } from 'shared/uiKit/modals/ModalPortal';
import { CreateRecordForm } from './create-record-form';

export const Fuel = () => {
    const [width] = useWindowSize();
    const { toggleOn, toggleOff, isToggled } = useToggle();
    const refPrimary = useRef<HTMLDivElement>(null);

    /** TODO Вынести в hook определение мобилки глобально, т.к. это по всему проекту чекануть нужно, а не локально */
    const [isLoading, setIsLoading] = useState(true);
    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        if (width < phoneWidthMax) {
            setIsPhone(true);
        } else {
            setIsPhone(false);
        }

        setIsLoading(false);
    }, [width]);

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
                    <ExpectedRefuel fuelData={fueldMockData} />
                    <button className="add-btn" onClick={toggleOn}>
                        Добвить запись
                    </button>
                    <FuelCards fuelData={fueldMockData} />
                </>
            ) : (
                <>
                    <button className="add-btn" onClick={toggleOn}>
                        Добвить запись
                    </button>
                    <FuelTable fuelData={fueldMockData} />
                    <ExpectedRefuel fuelData={fueldMockData} />
                </>
            )}

            {isToggled && (
                <ModalPortal ref={refPrimary}>
                    <CreateRecordForm mode="create" closeForm={toggleOff} />
                </ModalPortal>
            )}
        </div>
    );
};
