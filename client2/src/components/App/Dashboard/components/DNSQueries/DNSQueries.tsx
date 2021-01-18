import React, { FC, useContext } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import Store from 'Store';

import s from './DNSQueries.module.pcss';

const DNSQueries: FC = () => {
    const store = useContext(Store);
    const { ui: { intl }, dashboard } = store;
    return (
        <div className={s.container}>

        </div>
    );
};

export default DNSQueries;
