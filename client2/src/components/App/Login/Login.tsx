import React, { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Button, Input } from 'Common/controls';
import { CommonLayout } from 'Common/ui/layouts';
import Store from 'Store';

import s from './Login.module.pcss';

const Login: FC = observer(() => {
    const store = useContext(Store);
    const { ui: { intl }, login } = store;
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        login.login({
            name,
            password,
        });
    };
    return (
        <CommonLayout className={s.container}>
            <div className={s.form}>
                <Input
                    name="login"
                    type="text"
                    placeholder={intl.getMessage('name')}
                    value={name}
                    onChange={(e) => setName(e)}
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
