'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { userService } from 'shared/api/services';
import '../profilePage.scss';
import { AvatarOfMe } from '../../../../public/img/avatar';
import { User } from 'shared/api/types';
import { useParams } from 'next/navigation';

export default function Profile() {
    const { login } = useParams<{ login: string }>();

    const [user, setUser] = useState<User>();
    const [message, setMessage] = useState<string>();
    const [messageList, setMessageList] = useState<{ message: string }[]>([]);

    const [loading, setLoading] = useState(true);

    const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const createMessage = () => {
        setLoading(true);

        if (!message) return;

        const copyList = [...messageList];
        copyList.push({ message });

        setMessageList(copyList);

        const req = {
            userId: user?.id,
            message: message,
        };
        userService.createMessage(req).then(() => setLoading(false));
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
            .getUser(login)
            .then((res) => {
                const user = res.data;
                setUser(user);
                return user;
            })
            .then((user) => {
                if (!user) return;

                userService.getMessages(Number(user.id)).then(({ data }) => {
                    setMessageList(data);
                });
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

                <input placeholder="введите текст" value={message} onChange={handleMessage} />

                <button onClick={createMessage}>создать</button>
                <button onClick={deleteMessage}>удалить</button>

                <div>
                    <p>Сообщения:</p>
                    {messageList.length ? (
                        messageList.map((message, index) => <p key={index}>{message.message}</p>)
                    ) : (
                        <p>Нет сообщений</p>
                    )}
                </div>
            </div>
        </div>
    );
}
