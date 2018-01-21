import {flattenNode} from './app/utils';
import {routes} from './router';

const flattened = flattenNode(routes, 'children');

export default function (to, from, next) {
    setTitle(to);
    next();
}

function setTitle(route) {
    let title = route.meta.title;
    if (title){
        document.title = title
    }
}

function findRoute(route) {
    return _.head(flattened.filter(f => f.path === route.path));
}