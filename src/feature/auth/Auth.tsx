'use client';

import { ChangeEvent, useState } from 'react';
import './auth.scss';
import { useRouter } from 'next/navigation';
import { userService } from 'shared/api/services';
import { AxiosError, AxiosResponse } from 'axios';

export const Auth = () => {
    const isReg = false;
    const router = useRouter();

    const [userCreds, setUserCreds] = useState({
        email: '',
        login: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>, type: 'email' | 'login' | 'password') => {
        if (type === 'email') {
            return setUserCreds((prev) => ({
                ...prev,
                email: e.target.value,
            }));
        }

        if (type === 'login') {
            return setUserCreds((prev) => ({
                ...prev,
                login: e.target.value,
            }));
        }

        if (type === 'password') {
            return setUserCreds((prev) => ({
                ...prev,
                password: e.target.value,
            }));
        }
    };

    const onClick = () => {
        userService.createUser(userCreds).then(() => {
            router.push('/profile');
        });
    };

    const login = () => {
        if (!userCreds.login) return;

        // TODO Переделать на Find, а не Get
        userService
            .getUser({ login: userCreds.login })
            .then(() => {
                router.push(`/profile/${userCreds.login}`);
            })
            .catch((e: AxiosError<AxiosResponse>) => {
                if (e.status === 404) {
                    setError(`Пользователь ${userCreds.login} не существует`);
                }
                console.warn(e.response?.data);
            });
    };

    return (
        <div className="auth">
            {isReg ? (
                <div className="auth__block">
                    <p className="auth__block__title">Регистрация</p>

                    <div className="auth__block__input-wrapper">
                        <input
                            className="input"
                            placeholder="Укажите ваш email"
                            onChange={(e) => onChange(e, 'email')}
                        />
                    </div>

                    <div className="auth__block__input-wrapper">
                        <input
                            className="input"
                            placeholder="Придумайте логин"
                            onChange={(e) => onChange(e, 'login')}
                        />
                    </div>

                    <div className="auth__block__input-wrapper">
                        <input
                            className="input"
                            placeholder="Придумайте пароль"
                            onChange={(e) => onChange(e, 'password')}
                        />
                    </div>

                    <div className="auth__block__input-wrapper">
                        <input className="input" placeholder="Подтвердите пароль" />
                    </div>

                    <button className="button" onClick={onClick}>
                        Зарегистрироваться
                    </button>
                </div>
            ) : (
                <div className="auth__block">
                    <p className="auth__block__title">Авторизация</p>

                    <div className="auth__block__input-wrapper">
                        <input
                            className="input"
                            placeholder="Логин"
                            onChange={(e) => onChange(e, 'login')}
                        />

                        {error && error}
                    </div>

                    <div className="auth__block__input-wrapper">
                        <input
                            className="input"
                            placeholder="Пароль"
                            onChange={(e) => onChange(e, 'password')}
                        />
                    </div>

                    <button className="button" onClick={login}>
                        войти
                    </button>
                </div>
            )}
        </div>
    );
};
