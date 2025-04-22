'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from 'shared/api/types';

type HeaderButtons = {
    value: string;
    onClick: () => void;
    showButton: boolean;
};

export const useRoutesSetting = (user?: User): HeaderButtons[] => {
    const path = usePathname();
    const router = useRouter();

    const [stateLogin, setStateLogin] = useState<string | null>(null);

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
            showButton: Boolean(stateLogin),
        },
        {
            value: 'Таблица',
            onClick: toFuel,
            showButton: Boolean(stateLogin),
        },
        {
            value: 'Выйти',
            onClick: logout,
            showButton: path !== '/auth',
        },
    ];

    const testRoutes = [
        {
            value: 'Главная',
            onClick: () => router.push('/test-component'),
            showButton: true,
        },
    ];

    useEffect(() => {
        const login = localStorage.getItem('login');
        if (login) setStateLogin(login);

        if (!process.env.NEXT_PUBLIC_IS_ONLY_FRONT) return;

        console.warn('Приложение запущено без сервера.');
    }, [router]);

    const routes = process.env.NEXT_PUBLIC_IS_ONLY_FRONT ? testRoutes : routesConfig;

    return routes;
};
