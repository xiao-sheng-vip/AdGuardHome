import React, { FC, useContext } from 'react';
import { Layout } from 'antd';

import { Icon } from 'Common/ui';
import Store from 'Store';

import s from './Header.module.pcss';

const { Header: AntdHeader } = Layout;

const Header: FC = () => {
    const store = useContext(Store);
    const { ui: { intl } } = store;
    return (
        <AntdHeader className={s.header}>
            <div>
                <Icon icon="logo_shield" />
                <span>
                    {intl.getMessage('adguardStatus') as any}
                </span>
            </div>
        </AntdHeader>
    );
};

export default Header;
