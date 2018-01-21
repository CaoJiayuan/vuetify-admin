import store from '../store';
import {API_PERFIX,TOKEN_CACHE_NAME,LOGIN_PATH} from '../constant';
import {router} from '../router';

axios.interceptors.request.use(config => {
    config.url  = API_PERFIX + config.url;
    let jwt = localStorage.getItem(TOKEN_CACHE_NAME);
    if (jwt) {
        config.headers.common['Authorization'] = 'Bearer ' + jwt;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => response, error => {

    if (error.response.status === 401) {
        router.push(LOGIN_PATH)
    } else  {
        store.dispatch('toast', {
            color : 'error',
            text : error.response.data.message
        });
    }

    return Promise.reject(error);
});