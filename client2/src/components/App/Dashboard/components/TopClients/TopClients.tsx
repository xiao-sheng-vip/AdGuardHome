import React, { FC, useContext } from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import Store from 'Store';

import s from './TopClients.module.pcss';

const TopClients: FC = observer(() => {
    const store = useContext(Store);
    const { ui: { intl }, dashboard } = store;
    const { clientsInfo, stats } = dashboard;
    const topClients = stats?.topClients;
    const clients = Array.from(clientsInfo.entries());
    return (
        <div className={s.container}>
            <div className={s.title}>{intl.getMessage('Top Clients')}</div>
            <div className={s.content}>
                <div className={cn(s.tableTitle, s.tableGrid)}>
                    <div>{intl.getMessage('client_table_header')}</div>
                    <div>{intl.getMessage('requests')}</div>
                    <div>{intl.getMessage('show_blocked_responses')}</div>
                    <div>%</div>
                    <div/>
                    <div/>
                </div>
                {clients.map(([id, c]) => {
                    const request = topClients?.find(
                        (e) => Object.keys(e.numberData)[0] === id,
                    )?.numberData[id];
                    return (
                        <div className={s.tableGrid} key={id}>
                            <div>
                                {c.name}
                            </div>
                            <div>
                                {request}
                            </div>
                            <div>
                                API
                                {/* TODO: api */}
                            </div>
                            <div>
                                API / {request}
                            </div>
                            <div>
                                <Button>
                                    {intl.getMessage('Block')}
                                </Button>
                            </div>
                            <div>
                                ...
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default TopClients;
