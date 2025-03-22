import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from 'shared/stores/user';

export const useAuth = () => {
    const router = useRouter();

    const { fetchUser, setUser, user } = useUserStore();

    useEffect(() => {
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
