'use client';
import { Input } from 'shared/uiKit/input';
import { LoginFormFieldEnum, loginFormFieldEnum } from '../types';
import { ChangeEvent, FC } from 'react';
import { Button } from 'shared/uiKit/button';

type RegistrationForm = {
    onChange: (e: ChangeEvent<HTMLInputElement>, type: LoginFormFieldEnum) => void;
    onClick: () => Promise<void>;
    error: string | null;
    setTab: (tabName: 'login' | 'reg') => void;
};

export const AuthenticationForm: FC<RegistrationForm> = ({ error, onChange, onClick, setTab }) => {
    return (
        <div className="auth__block">
            <div className="form">
                <Input
                    placeholder="Логин"
                    onChange={(e) => onChange(e, loginFormFieldEnum.LOGIN)}
                />

                <Input
                    placeholder="Пароль"
                    type="password"
                    onChange={(e) => onChange(e, loginFormFieldEnum.PASSWORD)}
                />

                {error && error}

                <Button onClick={onClick} value="Войти" />
            </div>

            <div>
                <span>Нет аккаунта?</span>
                <button onClick={() => setTab('reg')}>Создайте новый аккаунт</button>
            </div>
        </div>
    );
};
