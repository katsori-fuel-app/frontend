'use client';

import { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { RegistrationForm } from './registrationForm';
import { AuthenticationForm } from './authenticationForm';
import { useAuthActions } from './hooks';
import './auth.scss';

export const Auth = () => {
    const { error, login, onChange, toRegistration } = useAuthActions();

    const searchParams = useSearchParams();

    const [curTab, setCurTab] = useState('reg');

    // TODO мб стоит разделить это не на табы, а на страницы просто.
    // И написать общую логику в entity для auth, например.
    const setTab = useCallback(
        (tabName: 'login' | 'reg') => {
            const newParams = new URLSearchParams(searchParams.toString());

            newParams.set('tab', tabName);
            window.history.replaceState(window.history.state, '', `auth?${newParams}`);
            setCurTab(tabName);
        },
        [searchParams]
    );

    return (
        <div className="auth">
            {curTab === 'reg' ? (
                <RegistrationForm onChange={onChange} onClick={toRegistration} setTab={setTab} />
            ) : (
                <AuthenticationForm
                    onChange={onChange}
                    error={error}
                    onClick={login}
                    setTab={setTab}
                />
            )}
        </div>
    );
};
