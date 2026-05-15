import { Auth } from 'feature/auth';
import { Suspense } from 'react';

export default async function AuthPage() {
    return (
        <Suspense fallback={null}>
            <Auth />
        </Suspense>
    );
}
