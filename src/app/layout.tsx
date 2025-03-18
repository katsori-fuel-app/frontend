'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const router = useRouter();

    const logout = () => {
        router.push('/auth');
    };
    return (
        <html lang="en">
            <body>
                <header>{path !== '/auth' && <button onClick={logout}>выйти</button>}</header>

                <main>{children}</main>
            </body>
        </html>
    );
}
