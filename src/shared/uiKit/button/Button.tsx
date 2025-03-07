import { FC } from 'react';
import './button.scss';

type ButtonProps = {
    value?: string;
    classname?: string;

    onClick?: () => void;
};
export const Button: FC<ButtonProps> = ({ classname, value, onClick }) => {
    return (
        <button className={`button ${classname}`} onClick={onClick}>
            {value}
        </button>
    );
};
