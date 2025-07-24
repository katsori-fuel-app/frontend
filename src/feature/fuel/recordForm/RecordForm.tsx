import './recordForm.scss';
import { FormComment, FormInput } from './ui';

export const RecordForm = () => {
    return (
        <div className="record-form">
            <FormInput label="Дата" type="date" placeholder="укажите дату" required />

            <FormInput
                label="Количество топлива"
                type="number"
                placeholder="введите количество топлива"
                required
            />

            <FormInput label="Тип топлива" type="text" placeholder="укажите тип топлива" required />

            <FormInput
                label="Текущий пробег"
                type="number"
                placeholder="введите текущий пробег"
                required
            />

            <FormComment label="Комментарий" />

            <button className="add-button">Создать запись</button>
        </div>
    );
};
