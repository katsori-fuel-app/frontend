'use client';

import { useEffect, useState } from 'react';
import { userService } from 'shared/api/services';
import '../profilePage.scss';
import { AvatarOfMe } from '../../../../public/img/avatar';

export default function Profile() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userService
            .getAllUser()
            .then((res) => {
                setUser(res.data[0]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h1>Loading...</h1>;

    if (!user) return <h1>no user...</h1>;

    const createdUserDate = new Date(user.createdAt).toISOString();
    const updatedUserDate = new Date(user.updatedAt).toISOString();

    return (
        <div className="profile-page">
            <div className="image-wrapper">
                <AvatarOfMe />
            </div>

            <div className="profile-page__fields">
                <p>login: {user.login}</p>
                <p>email: {user.email}</p>
                <p>дата создания профиля: {createdUserDate}</p>
                <p>последннее обновление было: {updatedUserDate}</p>
            </div>
        </div>
    );
}
