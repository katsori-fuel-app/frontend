import { ModalPortal } from 'shared/uiKit/modals/ModalPortal';
import './addRecord.scss';
import { useClickOutside, useToggle } from 'shared/hooks';
import { useRef } from 'react';
import { RecordForm } from './form';

export const AddRecord = () => {
    const { toggleOn, toggleOff, isToggled } = useToggle();

    const refPrimary = useRef<HTMLDivElement>(null);

    useClickOutside({ refPrimary, handler: toggleOff });

    return (
        <div>
            <button className="add-record__button" onClick={toggleOn}>
                + Добвить запись
            </button>

            {isToggled && (
                <ModalPortal ref={refPrimary}>
                    <h2>форма добавления записи</h2>

                    <RecordForm />
                </ModalPortal>
            )}
        </div>
    );
};
