import { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useState } from 'react';
import { useUserStore } from 'shared/stores/user';
import { LoginFormFieldEnum } from '../types';
import { userService } from 'shared/api/services';
import { useRouter } from 'next/navigation';

export const useAuthActions = () => {
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

    const toRegistration = () => {
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((user: any) => {
                setUser(user);
                setLoginInLocalStorage(user.login);

                return user.login;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((login: any) => router.push(`/profile/${login}`))
            .catch(handleAxiosError);
    };

    return {
        error,
        userCreds,
        onChange,
        login,
        toRegistration,
        router,
    };
};
