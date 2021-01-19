import qs from 'qs';
import { Locale } from 'Localization';

const BasicPath = '/';
const pathBuilder = (path: string) => (`${BasicPath}${path}`);

export enum RoutePath {
    Dashboard = 'Dashboard',
    Login = 'Login',
    ForgotPassword = 'ForgotPassword',
}
export const Paths: Record<RoutePath, string> = {
    Dashboard: pathBuilder('dashboard'),
    Login: pathBuilder('login'),
    ForgotPassword: pathBuilder('forgot_password'),
};

export enum LinkParamsKeys {}
export enum QueryParams {}
export type LinkParams = Partial<Record<LinkParamsKeys, string | number>>;

export const linkPathBuilder = (
    route: RoutePath,
    params?: LinkParams,
    lang?: Locale,
    query?: Partial<Record<QueryParams, string | number | boolean>>,
) => {
    let path = Paths[route]; //  .replace(BasicPath, `/${lang}`);
    if (params) {
        Object.keys(params).forEach((key: unknown) => {
            path = path.replace(`:${key}`, String(params[key as LinkParamsKeys]));
        });
    }
    if (query) {
        path += `?${qs.stringify(query)}`;
    }
    return path;
};
