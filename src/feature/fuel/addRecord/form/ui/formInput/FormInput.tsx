import './formInput.scss';

type FormInputProps = {
    label: string;
    type: 'date' | 'number' | 'text' | 'textarea'; // todo enam сделать
    placeholder: string;
    required?: boolean;
};

export const FormInput = ({ label, type, placeholder, required = false }: FormInputProps) => {
    const getPlaceholder = () => {
        // todo enum заюзать
        switch (type) {
            case 'date':
                return 'укажите дату';
            case 'number':
                return 'введите количество топлива';
            case 'text':
                return 'введите тип топлива';
            case 'textarea':
                return 'комментарий';
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

            <input type={type} placeholder={getPlaceholder() ?? placeholder} />
        </div>
    );
};
