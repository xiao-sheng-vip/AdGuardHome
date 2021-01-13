// This file was autogenerated. Please do not change.
// All changes will be overwrited on commit.
export interface IAddressInfoBeta {
    ip: string[];
    port: number;
}

export default class AddressInfoBeta {
    readonly _ip: string[];

    /**
     * Description: undefined
     * Example: 127.0.0.1
     */
    get ip(): string[] {
        return this._ip;
    }

    static get ipMinItems() {
        return 1;
    }

    static ipValidate(ip: string[]): boolean {
        return ip.reduce<boolean>((result, p) => result && (typeof p === 'string' && !!p.trim()), true);
    }

    readonly _port: number;

    /**
     * Description: undefined
     * Example: 53
     */
    get port(): number {
        return this._port;
    }

    static portValidate(port: number): boolean {
        return typeof port === 'number';
    }

    constructor(props: IAddressInfoBeta) {
        this._ip = props.ip;
        this._port = props.port;
    }

    serialize(): IAddressInfoBeta {
        const data: IAddressInfoBeta = {
            ip: this._ip,
            port: this._port,
        };
        return data;
    }

    validate(): string[] {
        const validate = {
            ip: this._ip.reduce((result, p) => result && typeof p === 'string', true),
            port: typeof this._port === 'number',
        };
        const isError: string[] = [];
        Object.keys(validate).forEach((key) => {
            if (!(validate as any)[key]) {
                isError.push(key);
            }
        });
        return isError;
    }

    update(props: Partial<IAddressInfoBeta>): AddressInfoBeta {
        return new AddressInfoBeta({ ...this.serialize(), ...props });
    }
}