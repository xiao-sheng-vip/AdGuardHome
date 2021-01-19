import React, { FC, useContext } from 'react';
import { Layout } from 'antd';

import { Icon } from 'Common/ui';
import { Button } from 'Common/controls';
import Store from 'Store';
import { LANGUAGES } from 'Localization';

import s from './Header.module.pcss';

const { Header: AntdHeader } = Layout;

const Header: FC = () => {
    const store = useContext(Store);
    const { ui: { intl, currentLang }, system } = store;
    const { status, profile } = system;
    return (
        <AntdHeader className={s.header}>
            <div className={s.content}>
                <Icon icon="logo_shield" />
                <div className={s.status}>
                    {status?.running
                        ? intl.getMessage('header_adguard_status_enabled')
                        : intl.getMessage('header_adguard_status_disabled')}
                </div>
                <Button
                    type="border"
                    size="small"
                    className={s.changeStatus}
                >
                    {intl.getMessage('disable')}
                </Button>
                <div className={s.serverUptime}>
                    {/* TODO: add serverUptime */}
                    {intl.getMessage('header_server_uptime')}
                </div>
                <Icon icon="user" className={s.userIcon} />
                <div className={s.user}>
                    { profile?.name }
                </div>
                <div className={s.langContainer}>
                    <Icon icon="language" />
                    <span className={s.lang}>
                        {LANGUAGES.find((e) => e.code === currentLang)!.name}
                    </span>
                </div>
            </div>
        </AntdHeader>
    );
};

export default Header;
