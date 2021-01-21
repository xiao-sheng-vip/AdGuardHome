import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout } from 'antd';

import { Icon } from 'Common/ui';
import { Button } from 'Common/controls';
import Store from 'Store';
import { LANGUAGES } from 'Localization';

import s from './Header.module.pcss';

const { Header: AntdHeader } = Layout;

const Header: FC = observer(() => {
    const store = useContext(Store);
    const { ui: { intl, currentLang }, system } = store;
    const { status, profile } = system;

    const updateServerStatus = () => {
        system.switchServerStatus(!status?.protectionEnabled);
    };
    return (
        <AntdHeader className={s.header}>
            <div className={s.content}>
                <Icon icon="logo_shield" />
                <div className={s.status}>
                    {status?.protectionEnabled
                        ? intl.getMessage('header_adguard_status_enabled')
                        : intl.getMessage('header_adguard_status_disabled')}
                </div>
                <Button
                    type="border"
                    size="small"
                    className={s.changeStatus}
                    onClick={updateServerStatus}
                >
                    {status?.protectionEnabled
                        ? intl.getMessage('disable')
                        : intl.getMessage('enable')}
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
                    { /* TODO: language selector */}
                    <Icon icon="language" />
                    <span className={s.lang}>
                        {LANGUAGES.find((e) => e.code === currentLang)!.name}
                    </span>
                </div>
            </div>
        </AntdHeader>
    );
});

export default Header;
