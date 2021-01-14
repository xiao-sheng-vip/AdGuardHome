import React, { FC } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import s from './BlockCard.module.pcss';

interface BlockCardProps {
    overal: number;
    data: number[];
    color: string;
    title: string;
}

const BlockCard: FC<BlockCardProps> = ({ overal, data, color, title }) => {
    return (
        <div className={s.container}>
            <div className={s.title}>{title}</div>
            <div className={s.overal}>{overal}</div>
            <ResponsiveContainer width="100%" height={25}>
                <AreaChart data={data.map((n) => ({ name: 'data', value: n }))}>
                    <Area dataKey="value" stroke={color} fill={color} dot={false} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BlockCard;
