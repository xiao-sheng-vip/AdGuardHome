import React, { FC, useContext } from 'react';
import { Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import Store from 'Store';
import { CommonLayout } from 'Common/ui/layouts';
import theme from 'Lib/theme';
import { BlockCard } from './components';

const Dashboard:FC = observer(() => {
    const store = useContext(Store);

    const { ui: { intl }, dashboard } = store;

    const { stats } = dashboard;
    if (!stats) {
        return null;
    }

    const {
        numBlockedFiltering,
        numDnsQueries,
        numReplacedParental,
        numReplacedSafebrowsing,
        numReplacedSafesearch,
        dnsQueries,
        replacedParental,
        replacedSafebrowsing,
        avgProcessingTime,
        blockedFiltering,
    } = stats;
    return (
        <CommonLayout className={cn(theme.content.content, theme.content.content_dashboard)}>
            <div className={theme.content.container}>
                <Row gutter={[24, 24]}>
                    <Col span={24} md={12} />
                    <Col span={24} md={12}>
                        <Row gutter={[24, 24]}>
                            <Col span={12}>
                                <BlockCard
                                    // TODO: title
                                    title="Blocked Ads"
                                    overal={numBlockedFiltering!}
                                    data={blockedFiltering!}
                                    color={theme.chartColors.red}
                                />
                            </Col>
                            <Col span={12}>
                                <BlockCard
                                    // TODO: title
                                    title="Blocked trackers"
                                    overal={numBlockedFiltering!}
                                    data={blockedFiltering!}
                                    color={theme.chartColors.orange}
                                />
                            </Col>
                            <Col span={12}>
                                <BlockCard
                                    // TODO: title
                                    title="Blocked adult websites"
                                    overal={numReplacedParental!}
                                    data={replacedParental!}
                                    color={theme.chartColors.purple}
                                />
                            </Col>
                            <Col span={12}>
                                <BlockCard
                                    // TODO: title
                                    title="Blocked malware/phishing"
                                    overal={numReplacedSafebrowsing!}
                                    data={replacedSafebrowsing!}
                                    color={theme.chartColors.red}
                                />
                            </Col>
                            <Col span={12}>
                                <BlockCard
                                    // TODO: title
                                    title="Average processing time"
                                    overal={avgProcessingTime!}
                                    data={blockedFiltering!}
                                    color={theme.chartColors.green}
                                />
                            </Col>
                            <Col span={12}></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </CommonLayout>
    );
});

export default Dashboard;
