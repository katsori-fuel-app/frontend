'use client';

import { ChangeEvent, useState } from 'react';
import './auth.scss';
import { useRouter } from 'next/navigation';
import { userService } from 'shared/api/services';
import { AxiosError, AxiosResponse } from 'axios';
import { Input } from 'shared/uiKit/input';
import { Button } from 'shared/uiKit/button';

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
            localStorage.setItem('login', userCreds.login);
            router.push(`/profile/${userCreds.login}`);
        });
    };

    const login = () => {
        if (!userCreds.login) return;
        localStorage.setItem('login', userCreds.login);

        // TODO Переделать на Find, а не Get.
        // Или здесь сетить данные в стор и потом уже на страницу вытягивать их.
        userService
            .getUser(userCreds.login)
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

                    <div className="form">
                        <Input
                            placeholder="Укажите ваш email"
                            onChange={(e) => onChange(e, 'email')}
                        />
                        <Input
                            placeholder="Придумайте логин"
                            onChange={(e) => onChange(e, 'login')}
                        />
                        <Input
                            placeholder="Придумайте пароль"
                            onChange={(e) => onChange(e, 'password')}
                        />
                        <Input
                            placeholder="Подтвердите пароль"
                            onChange={(e) => onChange(e, 'password')}
                        />
                    </div>

                    <Button onClick={onClick} value="Зарегистрироваться" />
                </div>
            ) : (
                <div className="auth__block">
                    <p className="auth__block__title">Авторизация</p>

                    <div className="form">
                        <Input placeholder="Логин" onChange={(e) => onChange(e, 'login')} />
                        <Input placeholder="Пароль" onChange={(e) => onChange(e, 'password')} />

                        {error && error}

                        <Button onClick={login} value="Войти" />
                    </div>
                </div>
            )}
        </div>
    );
};
