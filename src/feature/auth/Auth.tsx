'use client';

// import { ChangeEvent, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
// import { userService } from 'shared/api/services';
// import { AxiosError, AxiosResponse } from 'axios';
// import { Input } from 'shared/uiKit/input';
// import { Button } from 'shared/uiKit/button';
// import { useUserStore } from 'shared/stores/user';

import './auth.scss';
import { RegistrationForm } from './registrationForm';
import { AuthenticationForm } from './authenticationForm';
import { useAuthActions } from './hooks';
import { useCallback, useEffect, useState } from 'react';

export const Auth = () => {
    const { error, login, onChange, toRegistration, router } = useAuthActions();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [curTab, setCurTab] = useState('reg');

    const setTab = useCallback(
        (tabName: 'login' | 'reg') => {
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set('tab', tabName);
            router.replace(`${pathname}?${newParams.toString()}`);
            setCurTab(tabName);
        },
        [pathname, router, searchParams],
    );
    //     if (type === 'reg') {
    //         // TODO: Сделать обработку всех ошибок при аутентификации.
    //         setError(`Ошибка ${error.status}, смотри логи.`);
    //         console.warn(error.response?.data);
    //         return;
    //     }

    //     if (error.status === 404) {
    //         setError(`Пользователь ${userCreds.login} не существует`);
    //         return;
    //     }

    //     // TODO: Сделать обработку ошибок других
    //     setError(`Ошибка ${error.status}, смотри логи.`);
    //     console.warn(error.response?.data);
    // };

    // const setLoginInLocalStorage = (login: string) => {
    //     localStorage.setItem('login', login);
    // };

    // const onChange = (e: ChangeEvent<HTMLInputElement>, type: LoginFormFieldEnum) => {
    //     return setUserCreds((prev) => ({
    //         ...prev,
    //         [type]: e.target.value,
    //     }));
    // };

    // const onClick = () => {
    //     if (!userCreds.login) return;

    //     userService
    //         .createUser(userCreds)
    //         .then((res) => {
    //             const currentUser = res.data;
    //             setUser(res.data);
    //             setLoginInLocalStorage(currentUser.login);

    //             return currentUser.login;
    //         })
    //         .then((currentLogin) => router.push(`/profile/${currentLogin}`))
    //         .catch((e: AxiosError<AxiosResponse>) => handleAxiosError(e, 'reg'));
    // };

    // const login = async () => {
    //     if (!userCreds.login) return;

    //     fetchUser(userCreds.login)
    //         .then((user) => {
    //             setUser(user);
    //             setLoginInLocalStorage(user.login);

    //             return user.login;
    //         })
    //         .then((login) => router.push(`/profile/${login}`))
    //         .catch(handleAxiosError);
    // };

    useEffect(() => {
        const currentTab = searchParams.get('tab') as 'login' | 'reg' | null;
        if (currentTab && ['login', 'reg'].includes(currentTab)) {
            setTab(currentTab);
        } else {
            setTab('login');
        }
    }, [searchParams, setTab]);
    return (
        <div className="auth">
            <p className="auth__block__title">Авторизация</p>

            {curTab === 'reg' ? (
                <RegistrationForm onChange={onChange} onClick={toRegistration} setTab={setTab} />
            ) : (
                <AuthenticationForm
                    onChange={onChange}
                    error={error}
                    onClick={login}
                    setTab={setTab}
                />
            )}
        </div>
    );
};
