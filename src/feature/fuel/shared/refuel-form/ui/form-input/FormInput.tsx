import { ChangeEvent } from 'react';
import './formInput.scss';

type FormInputProps = {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;

    type?: 'date' | 'number' | 'text'; // todo enam сделать
    placeholder?: string;
    name?: string;
    required?: boolean;
};

export const FormInput = ({
    label,
    value,
    type = 'text',
    placeholder,

    onChange,

    required = false,
    name,
}: FormInputProps) => {
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
                onChange={onChange}
                placeholder={placeholder}
                name={name}
            />
        </div>
    );
};
