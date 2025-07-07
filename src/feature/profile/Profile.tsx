'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { messageService } from 'shared/api/services';
import { useUserStore } from 'shared/stores/user';
import { AvatarOfMe } from '../../../public/img/avatar';
import { parseDate } from 'shared/utils';

import './profilePage.scss';

export const Profile = () => {
    const { user } = useUserStore();

    const [message, setMessage] = useState<string>();
    const [messageList, setMessageList] = useState<{ message: string }[]>([]);

    const [loading, setLoading] = useState(false);

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
            userId: user?.uuid,
            message: message,
        };
        messageService.createMessage(req).then(() => setLoading(false));
    };

    const deleteMessage = () => {
        setLoading(true);

        const copyList = [...messageList];

        copyList.pop();

        setMessageList(copyList);
        setLoading(false);
    };

    useEffect(() => {
        if (user?.uuid) {
            setLoading(true);
            messageService.getMessages(Number(user.uuid)).then(({ data }) => {
                setMessageList(data);
                setLoading(false);
            });
        }
    }, [user?.uuid]);

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
};
