'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { messageService } from 'shared/api/services';
import { useUserStore } from 'shared/stores/user';
import { AvatarOfMe } from '../../../public/img/avatar';
import { parseDate } from 'shared/utils';

import './profilePage.scss';

export const Profile = () => {
    const { user } = useUserStore();

    const [loading, setLoading] = useState(false);


    if (loading) return <h1>Loading...</h1>;
    if (!user) return <h1>no user...</h1>;

    const { stringFormat: createdUserDate } = parseDate(user.createdAt);
    const { stringFormat: updatedUserDate } = parseDate(user.updatedAt);

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

            <div>
            </div>
        </div>
    );
};
