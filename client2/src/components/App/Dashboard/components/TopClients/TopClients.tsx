import React, { FC, useContext } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import Store from 'Store';

import s from './TopClients.module.pcss';

const TopClients: FC = () => {
    const store = useContext(Store);
    const { ui: { intl }, dashboard } = store;
    const { clientsInfo } = dashboard;
    return (
        <div className={s.container}>
            <div className={s.title}>{intl.getMessage('Top Clients')}</div>
            <div className={s.content}>
                <div className={s.tableTitle}>
                    <div>{intl.getMessage('client_table_header')}</div>
                    <div>{intl.getMessage('client_table_header')}</div>
                    <div>{intl.getMessage('client_table_header')}</div>
                    <div>{intl.getMessage('client_table_header')}</div>
                    <div/>
                    <div/>
                </div>
            </div>
        </div>
    );
};

export default TopClients;
