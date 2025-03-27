'use client';

import { usePathname, useRouter } from 'next/navigation';
import { User } from 'shared/api/types';

export const useRoutesSetting = (user?: User) => {
    const path = usePathname();
    const router = useRouter();

    const login = localStorage.getItem('login');

    const toMain = () => {
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('login');
        router.push('/auth');
    };

    const toProfile = () => {
        router.push(`/profile/${user?.login}`);
    };
    const toFuel = () => {
        router.push(`/fuel`);
    };

    const routesConfig = [
        {
            value: 'Главная',
            onClick: toMain,
            showButton: true,
        },
        {
            value: 'Профиль',
            onClick: toProfile,
            showButton: Boolean(login),
        },
        {
            value: 'Таблица',
            onClick: toFuel,
            showButton: Boolean(login),
        },
        {
            value: 'Выйти',
            onClick: logout,
            showButton: path !== '/auth',
        },
    ];

    return routesConfig;
};
