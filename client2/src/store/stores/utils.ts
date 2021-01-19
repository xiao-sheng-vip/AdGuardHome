import { Store } from 'Store';

export interface IStore {
    rootStore: Store;
    init: () => void;
}
/*
Each store should implement IStore to work properly if user not loggged in
and after log in like:

import { flow, makeAutoObservable } from 'mobx';
import { Store } from 'Store';
import { IStore } from './utils';
export default class SomeStore implements IStore {
    rootStore: Store;

    constructor(rootStore: Store) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            rootStore: false,
            init: flow,
        });
        if (this.rootStore.login.loggedIn) {
            this.init();
        }
    }

    * init() {

    }
}

*/
