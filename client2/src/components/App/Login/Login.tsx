import React, { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Button, Input } from 'Common/controls';
import { CommonLayout } from 'Common/ui/layouts';
import Store from 'Store';

import s from './Login.module.pcss';

const Login: FC = observer(() => {
    const store = useContext(Store);
    const { ui: { intl }, login } = store;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        login.login({
            username,
            password,
        });
    };
    return (
        <CommonLayout className={s.container}>
            <div className={s.form}>
                <Input
                    name="login"
                    type="text"
                    placeholder={intl.getMessage('username')}
                    value={username}
                    onChange={(e) => setUsername(e)}
                />
                <Input
                    name="login"
                    type="password"
                    placeholder={intl.getMessage('password')}
                    value={password}
                    onChange={(e) => setPassword(e)}
                />
                <Button
                    type="primary"
                    onClick={onSubmit}
                >
                    {intl.getMessage('login')}
                </Button>
            </div>
        </CommonLayout>
    );
});

export default Login;
