import React, { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Store from 'Store';
import { CommonLayout } from 'Common/ui/layouts';

const Dashboard:FC = observer(() => {
    const store = useContext(Store);

    const { ui: { intl }, dashboard } = store;

    useEffect(() => {
        if (!dashboard.inited) {
            dashboard.init();
        }
    }, [dashboard.inited]);

    if (!dashboard.inited) {
        return null;
    }

    console.log(dashboard);

    return (
        <CommonLayout>
            hello
        </CommonLayout>
    );
});

export default Dashboard;
