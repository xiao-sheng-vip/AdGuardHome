import React, { FC, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { observer } from 'mobx-react-lite';

import Store from 'Store';
import { Link } from 'Common/ui';
import { RoutePath } from '../Routes/Paths';

const { Sider } = Layout;
const { Item: MenuItem } = Menu;

const Sidebar: FC = observer(() => {
    const store = useContext(Store);
    const { ui: { intl } } = store;
    return (
        <Sider
            collapsedWidth={0}
            collapsible
            // onClick={handleSidebar}
            className="sidebar"
            trigger={null}
            width={200}
        >
            <Menu
                mode="inline"
                className="sidebar__menu"
                theme="dark"
            >
                <MenuItem key="dashboard">
                    <Link to={RoutePath.Dashboard}>
                        {intl.getMessage('menu_dashboard')}
                    </Link>
                </MenuItem>
            </Menu>
        </Sider>
    );
});

export default Sidebar;
