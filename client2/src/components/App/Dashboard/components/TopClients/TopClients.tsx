import React, { FC, useContext } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import Store from 'Store';

import s from './TopClients.module.pcss';

const TopClients: FC = () => {
    const store = useContext(Store);
    const { ui: { intl }, dashboard } = store;
    return (
        <div className={s.container}>
            <div>{intl.getMessage('Top Clients')}</div>
        </div>
    );
};

export default TopClients;
