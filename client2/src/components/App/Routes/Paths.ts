import qs from 'qs';
import { Locale } from 'Localization';

const BasicPath = '/';
const pathBuilder = (path: string) => (`${BasicPath}${path}`);

export enum RoutePath {
    Dashboard = 'Dashboard',
}
export const Paths: Record<RoutePath, string> = {
    Dashboard: pathBuilder('dashboard'),
};

export enum LinkParamsKeys {}
export enum QueryParams {}
export type LinkParams = Partial<Record<LinkParamsKeys, string | number>>;

export const linkPathBuilder = (
    route: RoutePath,
    lang?: Locale,
    params?: LinkParams,
    query?: Partial<Record<QueryParams, string | number | boolean>>,
) => {
    let path = Paths[route].replace(BasicPath, `/${lang}`);
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
