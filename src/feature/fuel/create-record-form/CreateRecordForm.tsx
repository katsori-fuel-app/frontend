import { FC, MouseEvent, useEffect, useState } from 'react';
import './createRecordForm.scss';
import { FormComment, FormInput } from './ui';
import { FuelRecord } from '../types';

const initForm: FuelRecord = {
    date: Date.now().toString(),
    fuelCost: 0,
    fuelType: '95',
    fuelCount: 0,
    totalMileage: 0,
    comment: '',
};

type Props = {
    closeForm: () => void;
    mode: 'create' | 'edit';
    data?: FuelRecord;
};

export const CreateRecordForm: FC<Props> = ({ mode, data, closeForm }) => {
    const [form, setForm] = useState<FuelRecord>(initForm);

    const getStatic = () => {
        if (mode === 'create') {
            return {
                title: 'Добавление записи',
                submitButton: 'Добавить',
            };
        } else {
            return {
                title: 'Редактирование',
                submitButton: 'Изменить',
            };
        }
    };

    const onCreate = () => {
        console.log('create');
    };

    const onEdit = () => {
        console.log('edit');
    };

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (mode === 'create') {
            onCreate();
        } else {
            onEdit();
        }

        closeForm();
    };

    useEffect(() => {
        if (data) {
            setForm(data);
        }
    }, [data]);

    return (
        <>
            <div className="create-record-form__title">
                <h2 className="create-record-form__title__text">{getStatic().title}</h2>

                <button className="create-record-form__title__close-btn" onClick={closeForm}>
                    x
                </button>
            </div>

            <div className="create-record-form__fields">
                <FormInput
                    value={form.date}
                    label="Дата"
                    type="date"
                    placeholder="укажите дату"
                    required
                />

                <FormInput
                    value={form.fuelCount.toString()}
                    label="Количество топлива"
                    type="number"
                    placeholder="введите количество топлива"
                    required
                />

                <FormInput
                    value={form.fuelType}
                    label="Тип топлива"
                    type="text"
                    placeholder="укажите тип топлива"
                    required
                />

                <FormInput
                    value={form.totalMileage.toString()}
                    label="Текущий пробег"
                    type="number"
                    placeholder="введите текущий пробег"
                    required
                />

                <FormComment value={form.comment ?? ''} label="Комментарий" />
            </div>

            <button className="create-button" onClick={onClick}>
                {getStatic().submitButton}
            </button>
        </>
    );
};
