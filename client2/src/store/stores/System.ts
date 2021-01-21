import { flow, makeAutoObservable, observable, action } from 'mobx';
import globalApi from 'Apis/global';

import { Store } from 'Store';
import { errorChecker } from 'Helpers/apiErrors';
import ProfileInfo, { IProfileInfo } from 'Entities/ProfileInfo';
import ServerStatus, { IServerStatus } from 'Entities/ServerStatus';

import { IStore } from './utils';

export default class System implements IStore {
    rootStore: Store;

    status: ServerStatus | undefined;

    profile: ProfileInfo | undefined;

    constructor(rootStore: Store) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            rootStore: false,
            getServerStatus: flow,
            init: flow,
            setProfile: action,
            switchServerStatus: flow,
            getProfile: flow,
            status: observable,
            profile: observable,
        });
        if (this.rootStore.login.loggedIn) {
            this.init();
        }
    }

    * init() {
        yield this.getServerStatus();
        if (!this.profile) {
            yield this.getProfile();
        }
    }

    setProfile(profile: ProfileInfo) {
        this.profile = profile;
    }

    * getProfile() {
        const response = yield globalApi.getProfile();
        const { result } = errorChecker<IProfileInfo>(response);
        if (result) {
            this.profile = new ProfileInfo(result);
        }
    }

    * getServerStatus() {
        console.log('hello');
        const response = yield globalApi.status();
        const { result } = errorChecker<IServerStatus>(response);
        if (result) {
            this.status = new ServerStatus(result);
        }
    }

    * switchServerStatus(enable: boolean) {
        const response = yield globalApi.dnsConfig({
            protection_enabled: enable,
        });
        const { result } = errorChecker(response);
        if (result) {
            yield this.getServerStatus();
        }
    }
}
