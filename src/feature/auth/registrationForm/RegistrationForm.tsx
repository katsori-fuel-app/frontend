'use client';
import { Input } from 'shared/uiKit/input';
import { LoginFormFieldEnum, loginFormFieldEnum } from '../types';
import { ChangeEvent, FC } from 'react';
import { Button } from 'shared/uiKit/button';
import Link from 'next/link';

type RegistrationForm = {
    onChange: (e: ChangeEvent<HTMLInputElement>, type: LoginFormFieldEnum) => void;
    onClick: () => void;
    setTab: (tabName: 'login' | 'reg') => void;
};

export const RegistrationForm: FC<RegistrationForm> = ({ onChange, onClick, setTab }) => {
    return (
        <div className="auth__block">
            <p className="auth__block__title">Регистрация</p>

            <div className="form">
                <Input
                    placeholder="Укажите ваш email"
                    onChange={(e) => onChange(e, loginFormFieldEnum.EMAIL)}
                />

                <Input
                    placeholder="Придумайте логин"
                    onChange={(e) => onChange(e, loginFormFieldEnum.LOGIN)}
                />

                <Input
                    placeholder="Придумайте пароль"
                    onChange={(e) => onChange(e, loginFormFieldEnum.PASSWORD)}
                />
            </div>

            <Button onClick={onClick} value="Зарегистрироваться" />

            <div>
                <span>Уже есть аккаунт? Тогда</span>
                <button
                    onClick={() => {
                        setTab('login');
                    }}
                >
                    авторизируйтесь
                </button>
            </div>
        </div>
    );
};
