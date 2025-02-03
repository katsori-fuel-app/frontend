'use client';

import { useEffect, useState } from 'react';
import { userService } from 'shared/api/services';

export default function Profile() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userService
            .getAllUser()
            .then((res) => {
                if (res) setUser(res.data[0]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h1>Loading...</h1>;

    if (!user) return <h1>no user...</h1>;

    return (
        <div>
            <h1>привет, {user.login}</h1>
        </div>
    );
}
