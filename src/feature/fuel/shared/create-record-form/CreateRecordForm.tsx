import { ChangeEvent, FC, useEffect, useState } from 'react';
import './createRecordForm.scss';
import { FormComment, FormInput } from './ui';
import { FuelRecord } from '../../types';
import { normolizeDate } from 'shared/utils';

// Confidence will be calculated in the backend.
const initForm: FuelRecord = {
    date: Date.now().toString(),
    totalMileage: 0,
    fuelCost: 0,
    fuelType: '95',
    fuelCount: 0,
    fuelConsumption: 8,
    fuelTankCapacity: 50,
    comment: '',
};

// здесь еще типа будет calibration или чот такое для калибровки
type Props = {
    mode: 'init' | 'regular' | 'edit';

    closeForm?: () => void;
    data?: FuelRecord;
};

export const CreateRecordForm: FC<Props> = ({ mode, data, closeForm }) => {
    const [form, setForm] = useState<FuelRecord>(initForm);

    const isFirstRefuel = mode === 'init';

    // TODO it possible edit isn't correct inside CreateForm lol. Or you should rename component.
    const getStatic = () => {
        if (mode === 'edit') {
            return {
                title: 'Редактирование',
                submitButton: 'Сохранить',
            };
        }

        return {
            title: 'Добавление записи',
            submitButton: 'Добавить',
        };
    };

    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

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

    const onCreate = async () => {
        isFirstRefuel
            ? console.info('create init form', form)
            : console.info('create regular form', form);

    };

    const onEdit = async () => {
        console.log('edit', form);
    };

    const apply = async () => {
        if (mode === 'edit') {
            await onEdit();
        } else {
            await onCreate()
        }

        closeForm?.();
    };

    const cansel = () => {
        if (data) setForm(data);

        closeForm?.();
    };

    const {title, submitButton} = getStatic();

    useEffect(() => {
        if (data) {
            const date = normolizeDate({ parsedDate: data.date }).stringFormat;

            // TODO data.date? What is it lol
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
                <h2 className="create-record-form__title__text">{title}</h2>

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

                {isFirstRefuel && (
                    <>
                        <FormInput
                            value={form.fuelTankCapacity.toString()}
                            label="Объем бака"
                            type="number"
                            placeholder="введите объем бака"
                            required
                            onChange={handleForm}
                            name="fuelTankCapacity"
                        />

                        <FormInput
                            value={form.fuelConsumption.toString()}
                            label="Текущий расход"
                            type="number"
                            placeholder="введите расход топлива"
                            required
                            onChange={handleForm}
                            name="fuelConsumption"
                        />
                    </>
                )}

                <FormComment
                    value={form.comment ?? ''}
                    label="Комментарий"
                    onChange={changeComment}
                />
            </div>

            <div className="actions">
                <button className="create-button" onClick={apply}>
                    {submitButton}
                </button>

                <button className="create-button" onClick={cansel}>
                    Отменить
                </button>
            </div>
        </>
    );
};
