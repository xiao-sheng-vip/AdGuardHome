import { flow, makeAutoObservable, observable } from 'mobx';

import clientsApi from 'Apis/clients';
import statsApi from 'Apis/stats';
import tlsApi from 'Apis/tls';

import { errorChecker } from 'Helpers/apiErrors';
import { Store } from 'Store';
import Stats, { IStats } from 'Entities/Stats';
import StatsConfig, { IStatsConfig } from 'Entities/StatsConfig';
import TlsConfig, { ITlsConfig } from 'Entities/TlsConfig';
import { IClientsFindEntry } from 'Entities/ClientsFindEntry';
import ClientFindSubEntry from 'Entities/ClientFindSubEntry';

import { IStore } from './utils';

export default class Dashboard implements IStore {
    rootStore: Store;

    stats: Stats | undefined;

    statsConfig: StatsConfig | undefined;

    clientsInfo: Map<string, ClientFindSubEntry>;

    tlsConfig: TlsConfig | undefined;

    constructor(rootStore: Store) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            rootStore: false,
            init: flow,
            getStatsConfig: flow,
            getTlsConfig: flow,
            getClient: flow,
            stats: observable,
            statsConfig: observable,
            clientsInfo: observable,
            tlsConfig: observable,
        });
        this.clientsInfo = new Map();
        if (this.rootStore.login.loggedIn) {
            this.init();
        }
    }

    * init() {
        yield this.getStatsConfig();
        yield this.getTlsConfig();
        yield this.getStats();
    }

    * getStats() {
        const response = yield statsApi.stats();
        const { result } = errorChecker<IStats>(response);
        if (result) {
            this.stats = new Stats(result);
            if (this.stats.topClients) {
                const topClient = Object.keys(this.stats.topClients[0].numberData)[0];
                yield this.getClient(topClient);
            }
        }
    }

    * getClient(ip: string) {
        const response = yield clientsApi.clientsFind(ip);
        const { result } = errorChecker<IClientsFindEntry[]>(response);
        if (result) {
            const client = result[0];
            if (client) {
                const [, data] = Object.entries(client)[0];
                this.clientsInfo = new Map();
                this.clientsInfo.set(ip, new ClientFindSubEntry(data));
            }
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
