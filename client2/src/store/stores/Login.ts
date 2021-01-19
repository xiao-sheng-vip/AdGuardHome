import { flow, makeAutoObservable, observable } from 'mobx';
import globalApi from 'Apis/global';

import { Store } from 'Store';
import { errorChecker } from 'Helpers/apiErrors';
import { IProfileInfo } from 'Entities/ProfileInfo';
import { ILogin } from 'Entities/Login';

export default class Login {
    rootStore: Store;

    loggedIn = false;

    constructor(rootStore: Store) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            loggedIn: observable,
            rootStore: false,
            checkLoggedIn: flow,
            login: flow,
        });
        this.checkLoggedIn();
    }

    * checkLoggedIn() {
        const response = yield globalApi.getProfile();
        const { error } = errorChecker<IProfileInfo>(response);
        if (!error) {
            this.loggedIn = true;
        }
        // TODO: make smth with result, to not duplicate the request;
    }

    * login(login: ILogin) {
        const response = yield globalApi.login(login);
        const { result, error } = errorChecker(response);
        if (result === 200) {
            this.loggedIn = true;
            return;
        }
        return error;
    }
}
