import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from 'shared/stores/user';
import { needUseOnlyMock } from 'shared/utils/constants';

export const useAuth = () => {
    const router = useRouter();

    const { fetchUser, setUser, user } = useUserStore();

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_IS_ONLY_FRONT === needUseOnlyMock) {
            router.push('/test-component');
            return;
        }

        const login = localStorage.getItem('login');

        if (!login) {
            router.push('/auth');
            return;
        }

        fetchUser(login).then((user) => {
            setUser(user);
        });
    }, [fetchUser, router, setUser]);

    return user;
};
