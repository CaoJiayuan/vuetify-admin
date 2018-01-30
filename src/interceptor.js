import {flattenNode,Store} from './app/utils';
import {routes} from './router';
import {TOKEN_CACHE_NAME, LOGIN_PATH} from './constant';

const storage = new Store();
const flattened = flattenNode(routes, 'children');

export default function (to, from, next) {
    setTitle(to);
    checkToken(to, next);
}

function setTitle(route) {
    let title = route.meta.title;
    if (title){
        document.title = title
    }
}

function checkToken (to, next) {
    if (!storage.get(TOKEN_CACHE_NAME) && to.meta.guest !== true) {
        return next(LOGIN_PATH)
    }
    return next();
}

function findRoute(route) {
    return _.head(flattened.filter(f => f.path === route.path));
}
