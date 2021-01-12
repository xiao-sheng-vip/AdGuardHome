import { createContext } from 'react';
import UI from './stores/ui';
import Login from './stores/Login';

export class Store {
    ui: UI;

    login: Login;

    constructor() {
        this.ui = new UI(this);
        this.login = new Login(this);
    }
}

export const storeValue = new Store();

const StoreContext = createContext<Store>(storeValue);
export default StoreContext;
