import { FC } from 'react';
import './recordForm.scss';
import { FormComment, FormInput } from './ui';
type Props = {
    title: string;
    closeForm: () => void;
};
export const RecordForm: FC<Props> = ({ title, closeForm }) => {
    return (
        <>
            <div className="record-form__title">
                <h2 className="record-form__title__text">{title}</h2>
                <button className="record-form__title__close-btn" onClick={closeForm}>
                    x
                </button>
            </div>

            <div className="record-form__fields">
                <FormInput label="Дата" type="date" placeholder="укажите дату" required />

                <FormInput
                    label="Количество топлива"
                    type="number"
                    placeholder="введите количество топлива"
                    required
                />

                <FormInput
                    label="Тип топлива"
                    type="text"
                    placeholder="укажите тип топлива"
                    required
                />

                <FormInput
                    label="Текущий пробег"
                    type="number"
                    placeholder="введите текущий пробег"
                    required
                />

                <FormComment label="Комментарий" />
            </div>

            <button className="create-button">Создать запись</button>
        </>
    );
};
