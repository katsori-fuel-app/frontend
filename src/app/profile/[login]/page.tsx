'use client';

import { useEffect, useState } from 'react';
import { userService } from 'shared/api/services';
import '../profilePage.scss';
import { AvatarOfMe } from '../../../../public/img/avatar';
import { User } from 'shared/api/types';

export default function Profile() {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    const [messageList, setMessageList] = useState<string[]>([]);

    const createMessage = () => {
        setLoading(true);

        const copyList = [...messageList];
        copyList.push('newMessage');

        setMessageList(copyList);

        setLoading(false);
    };

    const deleteMessage = () => {
        setLoading(true);

        const copyList = [...messageList];
        copyList.pop();

        setMessageList(copyList);

        setLoading(false);
    };

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

            <div>
                <p>создание сообщений для разных users</p>

                <input type="text" placeholder="введите текст" />
                <button onClick={createMessage}>создать</button>
                <button onClick={deleteMessage}>удалить</button>

                <div>
                    <p>Сообщения:</p>
                    {messageList.length ? (
                        messageList.map((message, index) => <p key={index}>{message}</p>)
                    ) : (
                        <p>Нет сообщений</p>
                    )}
                </div>
            </div>
        </div>
    );
}
