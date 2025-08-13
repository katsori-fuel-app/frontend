import { ChangeEvent, FC, useEffect, useState } from 'react';
import './createRecordForm.scss';
import { FormComment, FormInput } from './ui';
import { FuelRecord } from '../types';
import { normolizeDate } from 'shared/utils';

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
                submitButton: 'Сохранить',
            };
        }
    };

    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        console.log(value);

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const changeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setForm((prev) => ({
            ...prev,
            comment: e.target.value,
        }));
    };

    const onCreate = () => {
        console.log('create', form);
    };

    const onEdit = () => {
        console.log('edit', form);
    };

    const apply = () => {
        if (mode === 'create') {
            onCreate();
        } else {
            onEdit();
        }

        closeForm();
    };

    const cansel = () => {
        if (data) {
            setForm(data);
        }

        closeForm();
    };

    useEffect(() => {
        if (data) {
            const date = normolizeDate({ parsedDate: data.date }).stringFormat;

            const formattedData = {
                ...data,
                date,
            };

            setForm(formattedData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    onChange={handleForm}
                    required
                    name="date"
                />

                <FormInput
                    value={form.fuelCount.toString()}
                    label="Количество топлива"
                    type="number"
                    placeholder="введите количество топлива"
                    required
                    onChange={handleForm}
                    name="fuelCount"
                />

                <FormInput
                    value={form.fuelType}
                    label="Тип топлива"
                    type="text"
                    placeholder="укажите тип топлива"
                    required
                    onChange={handleForm}
                    name="fuelType"
                />
                <FormInput
                    value={form.fuelCost.toString()}
                    label="Стоимость"
                    type="number"
                    placeholder="Укажите стоимость заправки"
                    required
                    onChange={handleForm}
                    name="fuelCost"
                />

                <FormInput
                    value={form.totalMileage.toString()}
                    label="Текущий пробег"
                    type="number"
                    placeholder="введите текущий пробег"
                    required
                    onChange={handleForm}
                    name="totalMileage"
                />

                <FormComment
                    value={form.comment ?? ''}
                    label="Комментарий"
                    onChange={changeComment}
                />
            </div>

            <div className="actions">
                <button className="create-button" onClick={apply}>
                    {getStatic().submitButton}
                </button>

                <button className="create-button" onClick={cansel}>
                    Отменить
                </button>
            </div>
        </>
    );
};
