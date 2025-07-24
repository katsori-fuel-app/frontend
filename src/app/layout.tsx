'use client';

import { Button } from 'shared/uiKit/button';
import { useAuth, useRoutesSetting } from 'shared/hooks';

import './index.scss';
import './layout.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const user = useAuth();
    const routesConfig = useRoutesSetting(user);

    return (
        <html lang="en">
            <body>
                <header>
                    {routesConfig.map(({ onClick, showButton, value }) => {
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
