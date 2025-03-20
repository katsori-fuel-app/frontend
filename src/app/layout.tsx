'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'shared/uiKit/button';
import './layout.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const router = useRouter();

    const login = localStorage.getItem('login');

    const toMain = () => {
        router.push('/');
    };

    const logout = () => {
        router.push('/auth');
    };

    const toProfile = () => {
        router.push(`/profile/${login}`);
    };

    const navConfig = [
        {
            value: 'Главная',
            onClick: toMain,
            showButton: true,
        },
        {
            value: 'Профиль',
            onClick: toProfile,
            showButton: Boolean(toProfile),
        },
        {
            value: 'Выйти',
            onClick: logout,
            showButton: path !== '/auth',
        },
    ];

    return (
        <html lang="en">
            <body>
                <header>
                    {navConfig.map(({ onClick, showButton, value }) => {
                        if (!showButton) return;

                        return (
                            <Button
                                key={value}
                                classname="nav-button"
                                onClick={onClick}
                                value={value}
                            />
                        );
                    })}
                </header>

                <main>{children}</main>
            </body>
        </html>
    );
}
