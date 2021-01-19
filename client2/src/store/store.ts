import { createContext } from 'react';
import UI from './stores/ui';
import Login from './stores/Login';
import Dashboard from './stores/Dasnboard';
import System from './stores/System';

export class Store {
    ui: UI;

    login: Login;

    dashboard: Dashboard;

    system: System;

    constructor() {
        this.ui = new UI(this);
        this.login = new Login(this);
        this.dashboard = new Dashboard(this);
        this.system = new System(this);
    }

    init() {
        this.dashboard.init();
        this.system.init();
    }
}

export const storeValue = new Store();

const StoreContext = createContext<Store>(storeValue);
export default StoreContext;
