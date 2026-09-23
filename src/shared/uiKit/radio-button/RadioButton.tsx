import { ChangeEvent, FC } from 'react';

type RadioButtonProps = {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
};

export const RadioButton: FC<RadioButtonProps> = ({
    label,
    name,
    value,
    checked,
    onChange,
    required = false,
}) => {
    return (
        <label>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                required={required}
            />
            {label}
        </label>
    );
};
