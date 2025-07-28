import './formInput.scss';

type FormInputProps = {
    label: string;
    value: string;
    type: 'date' | 'number' | 'text'; // todo enam сделать
    placeholder: string;
    required?: boolean;
};

export const FormInput = ({
    label,
    value,
    type,
    placeholder,
    required = false,
}: FormInputProps) => {
    const getPlaceholder = () => {
        // todo enum заюзать
        switch (type) {
            case 'date':
                return 'Укажите дату';
            case 'number':
                return 'Введите количество топлива';
            case 'text':
                return 'Введите тип топлива';
            default:
                return undefined;
        }
    };

    return (
        <div className="form-input">
            <label htmlFor="date">
                <span>{label} </span>
                {required && <span className="form-input__required">*</span>}
            </label>

            <input
                className="form-input__input"
                type={type}
                value={value}
                placeholder={getPlaceholder() ?? placeholder}
            />
        </div>
    );
};
