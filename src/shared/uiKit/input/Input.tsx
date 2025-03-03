import { ChangeEvent, FC } from 'react';
import './input.scss';

type InputProps = {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
    type?: string;
};

export const Input: FC<InputProps> = ({ className, placeholder, type = 'text', onChange }) => {
    return (
        <input
            className={`input ${className}`}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};
