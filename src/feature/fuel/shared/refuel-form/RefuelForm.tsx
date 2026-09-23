import './refuelForm.scss';
import { FormComment, FormInput } from './ui';
import { REFUEL_MODE } from './constants';
import { RefuelFormType, RefuelMode } from 'feature/fuel/types';
import { getRefuelFormStatic } from './utils';
import { RadioButton } from 'shared/uiKit';
import { useRefuelFormActions } from 'feature/fuel/shared/refuel-form/hooks/useRefuelFormActions';
import { useRefuelForm } from 'feature/fuel/shared/refuel-form/hooks/useRefuelForm';

type PropsType = {
    mode: RefuelMode;

    data?: RefuelFormType;
    closeForm?: () => void;
};

const bakCount = 50;

export const RefuelForm = ({ mode, data, closeForm }: PropsType) => {
    const { form, handleForm, changeComment, cansel } = useRefuelForm({ mode, data, closeForm });
    const { apply } = useRefuelFormActions({ form, closeForm });

    const { title, submitButton } = getRefuelFormStatic(mode);

    return (
        <>
            {/* TODO decompose that */}
            <div className="refuel-form__title">
                <h2 className="refuel-form__title__text">{title}</h2>
                {form.mode === REFUEL_MODE.CALIBRATION && (
                    <p className="refuel-form__title__calibration">Ваш объём бака {bakCount}</p>
                )}

                <button className="refuel-form__title__close-btn" onClick={cansel}>
                    x
                </button>
            </div>

            {/* TODO task #89 */}
            <div className="refuel-form__fields">
                {[
                    { label: 'Первая заправка', value: REFUEL_MODE.INIT },
                    { label: 'Обычная заправка', value: REFUEL_MODE.REGULAR },
                    { label: 'Калибровка', value: REFUEL_MODE.CALIBRATION },
                ].map(({ label, value }) => (
                    <RadioButton
                        key={value}
                        label={label}
                        name="mode"
                        value={value}
                        checked={form.mode === value}
                        onChange={handleForm}
                    />
                ))}

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
