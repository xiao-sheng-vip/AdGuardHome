import { createContext } from 'react';
import UI from './stores/ui';
import Login from './stores/Login';
import Dashboard from './stores/Dasnboard';

export class Store {
    ui: UI;

    login: Login;

    dashboard: Dashboard;

    constructor() {
        this.ui = new UI(this);
        this.login = new Login(this);
        this.dashboard = new Dashboard(this);
    }
}

export const storeValue = new Store();

const StoreContext = createContext<Store>(storeValue);
export default StoreContext;
