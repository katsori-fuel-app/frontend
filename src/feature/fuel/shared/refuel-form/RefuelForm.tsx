import { ChangeEvent, FC, useEffect, useState } from 'react';
import './refuelForm.scss';
import { FormComment, FormInput } from './ui';
import { normolizeDate } from 'shared/utils';
import { RefuelProps } from 'feature/fuel/shared/refuel-form/types';
import { REFUEL_MODE } from 'feature/fuel/shared/refuel-form/constants';
import { RefuelFormType } from 'feature/fuel/types';
import { refuelInitialForm } from 'feature/fuel/shared/refuel-form/utils/refuelInitialForm';

export const RefuelForm: FC<RefuelProps> = ({ mode, data, closeForm }) => {
    const [form, setForm] = useState<RefuelFormType>(refuelInitialForm(mode));

    const isFirstRefuel = mode === REFUEL_MODE.INIT;

    const getStatic = () => {
        if (mode === REFUEL_MODE.EDIT) {
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
        if (mode === REFUEL_MODE.EDIT) {
            await onEdit();
        } else {
            await onCreate();
        }

        closeForm?.();
    };

    const cansel = () => {
        if (data) setForm(data);

        closeForm?.();
    };

    const { title, submitButton } = getStatic();

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
            <div className="refuel-form__title">
                <h2 className="refuel-form__title__text">{title}</h2>

                <button className="refuel-form__title__close-btn" onClick={closeForm}>
                    x
                </button>
            </div>

            <div className="refuel-form__fields">
                {/* тут радиобатон должен быть или селект или чот для выбора значения */}
                <FormInput
                    value={form.mode}
                    label="Тип заправки"
                    placeholder="Укажите тип заправки"
                    onChange={handleForm}
                    required
                    name="mode"
                />

                <FormInput
                    value={form.date}
                    label="Дата"
                    type="date"
                    placeholder="Укажите дату"
                    onChange={handleForm}
                    required
                    name="date"
                />

                <FormInput
                    value={form.fuelCount.toString()}
                    label="Количество топлива"
                    type="number"
                    placeholder="Введите количество топлива"
                    required
                    onChange={handleForm}
                    name="fuelCount"
                />

                <FormInput
                    value={form.fuelType}
                    label="Тип топлива"
                    type="text"
                    placeholder="Укажите тип топлива"
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
                    placeholder="Введите текущий пробег"
                    required
                    onChange={handleForm}
                    name="totalMileage"
                />

                {form.mode === REFUEL_MODE.INIT && (
                    <>
                        <FormInput
                            value={form.fuelTankCapacity.toString()}
                            label="Объем бака"
                            type="number"
                            placeholder="Введите объем бака"
                            required
                            onChange={handleForm}
                            name="fuelTankCapacity"
                        />

                        <FormInput
                            value={form.initFuelConsumption.toString()}
                            label="Текущий расход"
                            type="number"
                            placeholder="Введите расход топлива"
                            required
                            onChange={handleForm}
                            name="initFuelConsumption"
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
