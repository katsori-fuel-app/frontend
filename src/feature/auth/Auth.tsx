'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from 'shared/api/services';
import { AxiosError, AxiosResponse } from 'axios';
import { Input } from 'shared/uiKit/input';
import { Button } from 'shared/uiKit/button';
import { useUserStore } from 'shared/stores/user';

import './auth.scss';

const loginFormFieldEnum = {
    EMAIL: 'email',
    LOGIN: 'login',
    PASSWORD: 'password',
} as const;

type LoginFormFieldEnum = (typeof loginFormFieldEnum)[keyof typeof loginFormFieldEnum];

export const Auth = () => {
    const isReg = false;

    const router = useRouter();
    const { fetchUser, setUser } = useUserStore();

    const [error, setError] = useState<string | null>(null);
    const [userCreds, setUserCreds] = useState({
        email: '',
        login: '',
        password: '',
    });

    const handleAxiosError = (error: AxiosError<AxiosResponse>, type?: string): void => {
        if (type === 'reg') {
            // TODO: Сделать обработку всех ошибок при аутентификации.
            setError(`Ошибка ${error.status}, смотри логи.`);
            console.warn(error.response?.data);
            return;
        }

        if (error.status === 404) {
            setError(`Пользователь ${userCreds.login} не существует`);
            return;
        }

        // TODO: Сделать обработку ошибок других
        setError(`Ошибка ${error.status}, смотри логи.`);
        console.warn(error.response?.data);
    };

    const setLoginInLocalStorage = (login: string) => {
        localStorage.setItem('login', login);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>, type: LoginFormFieldEnum) => {
        return setUserCreds((prev) => ({
            ...prev,
            [type]: e.target.value,
        }));
    };

    const onClick = () => {
        if (!userCreds.login) return;

        userService
            .createUser(userCreds)
            .then((res) => {
                const currentUser = res.data;
                setUser(res.data);
                setLoginInLocalStorage(currentUser.login);

                return currentUser.login;
            })
            .then((currentLogin) => router.push(`/profile/${currentLogin}`))
            .catch((e: AxiosError<AxiosResponse>) => handleAxiosError(e, 'reg'));
    };

    const login = async () => {
        if (!userCreds.login) return;

        fetchUser(userCreds.login)
            .then((user) => {
                setUser(user);
                setLoginInLocalStorage(user.login);

                return user.login;
            })
            .then((login) => router.push(`/profile/${login}`))
            .catch(handleAxiosError);
    };

    return (
        <div className="auth">
            {isReg ? (
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
                </div>
            ) : (
                <div className="auth__block">
                    <p className="auth__block__title">Авторизация</p>

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

                        <Button onClick={login} value="Войти" />
                    </div>
                </div>
            )}
        </div>
    );
};
