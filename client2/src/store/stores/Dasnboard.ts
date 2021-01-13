import { flow, makeAutoObservable, observable } from 'mobx';
import globalApi from 'Apis/global';
import statsApi from 'Apis/stats';
import tlsApi from 'Apis/tls';

import { errorChecker } from 'Helpers/apiErrors';
import { Store } from 'Store';
import ServerStatus, { IServerStatus } from 'Entities/ServerStatus';
import Stats, { IStats } from 'Entities/Stats';
import StatsConfig, { IStatsConfig } from 'Entities/StatsConfig';
import TlsConfig, { ITlsConfig } from 'Entities/TlsConfig';

export default class Login {
    rootStore: Store;

    status: ServerStatus | undefined;

    stats: Stats | undefined;

    statsConfig: StatsConfig | undefined;

    tlsConfig: TlsConfig | undefined;

    inited = false;

    constructor(rootStore: Store) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            // status: observable,
            // stats: observable,
            // statsConfig: observable,
            // tlsConfig: observable,
            rootStore: false,
            init: flow,
            getServerStatus: flow,
            getStatsConfig: flow,
            getTlsConfig: flow,
        });
        if (this.rootStore.login.loggedIn) {
            this.init();
        }
    }

    * init() {
        yield this.getServerStatus();
        yield this.getStatsConfig();
        yield this.getTlsConfig();
        this.inited = true;
    }

    // UNDOCUMENTED;
    // * getStats() {
    //     const response = yield globalApi.stats();
    //     const { result } = errorChecker<IServerStatus>(response);
    //     if (result) {
    //         this.status = new ServerStatus(result);
    //     }
    // }

    * getServerStatus() {
        const response = yield globalApi.status();
        const { result } = errorChecker<IServerStatus>(response);
        console.log(result);
        if (result) {
            this.status = new ServerStatus(result);
        }
    }

    * getStatsConfig() {
        const response = yield statsApi.statsInfo();
        const { result } = errorChecker<IStatsConfig>(response);
        if (result) {
            this.statsConfig = new StatsConfig(result);
        }
    }

    * getTlsConfig() {
        const response = yield tlsApi.tlsStatus();
        const { result } = errorChecker<ITlsConfig>(response);
        if (result) {
            this.tlsConfig = new TlsConfig(result);
        }
    }
}
