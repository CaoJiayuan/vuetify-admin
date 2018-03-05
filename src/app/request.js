import store from '../store';
import {API_PREFIX,TOKEN_CACHE_NAME,LOGIN_PATH,TOKEN_EXPIRE_NAME} from '../constant';
import {Store} from '../app/utils';
import {router} from '../router';
import UserApi from '../apis/UserApi'

const UNRERFESH = 0;
const REFRESHING = 1;
const REFRESHED = 2;
let storage = new Store();

axios.interceptors.request.use(config => {
    config.url  = API_PREFIX + config.url;
    if (config.guest !== true) {
        let jwt = storage.get(TOKEN_CACHE_NAME);
        let expire = storage.get(TOKEN_EXPIRE_NAME);
        if (jwt && expire && expire <= new Date().getTime()){
            store.getters.tokenStatus === REFRESHING || store.commit('setTokenStatus', UNRERFESH)
        }
        return refreshToken(config);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => response, error => {

    if (error.response.status === 401) {
        router.push(LOGIN_PATH)
    } else  {
       error.config.toast !== false && store.dispatch('toast', {
            color : 'error',
            text : error.response.data.message
        });
    }

    return Promise.reject(error);
});

function refreshToken (config) {
    if (store.getters.tokenStatus === UNRERFESH) {
        store.commit('setTokenStatus', REFRESHING)
        return UserApi.refresh().then(token => {
            config.headers.common['Authorization'] = 'Bearer ' + token.access_token;
            store.commit('setTokenStatus', REFRESHED)

            return Promise.resolve(config);
        }).catch(error => {
            router.push(LOGIN_PATH)
        })
    } else {
        if (store.getters.tokenStatus === REFRESHING) {
            let timer = null;
            return new Promise((resolve, reject) => {
                timer = setInterval(() => {
                    if (store.getters.tokenStatus === REFRESHED) {
                        setToken(config, resolve, reject);
                        clearInterval(timer)
                    }
                }, 500)
            })
        } else {
            return new Promise((resolve, reject) => {
                setToken(config, resolve, reject)
            })
        }
    }
}

function setToken (config, resolve, reject) {
    let jwt = storage.get(TOKEN_CACHE_NAME);
    config.headers.common['Authorization'] = 'Bearer ' + jwt;
    resolve(config)
}
