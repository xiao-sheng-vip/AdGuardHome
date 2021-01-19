/* eslint-disable no-else-return */
import React, { FC, useContext } from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Store from 'Store';
import { Paths } from './Paths';

import Dashboard from '../Dashboard';
import Login from '../Login';
import Sidebar from '../Sidebar';
import Header from '../Header';

import s from './Routes.module.pcss';

const { Content } = Layout;

const AuthRoutes: FC = React.memo(() => {
    return (
        <Login />
    );
});

const AppRoutes: FC = observer(() => {
    return (
        <Layout className={s.app}>
            <Sidebar />
            <Layout>
                <Header />
                <Content>
                    <Switch>
                        <Route
                            exact
                            path={Paths.Dashboard}
                            component={Dashboard}
                        />
                        <Redirect to={Paths.Dashboard} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
});

const Routes: FC = observer(() => {
    const store = useContext(Store);
    const { login: { loggedIn } } = store;
    if (loggedIn) {
        return <AppRoutes />;
    }
    return <AuthRoutes />;
});

export default Routes;
