import {TOKEN_CACHE_NAME,TOKEN_EXPIRE_NAME} from '../constant';
import {Store} from '../app/utils';
function Token() {

}
Token.prototype.access_token = null;
Token.prototype.expires_in = 0;
Token.prototype.type = null;
let store = new Store();

const UserApi = {
    getUser() {
        return axios.get('/user').then(response => response.data)
    },
    login(credentials){
        return axios.post('/login', credentials, {
            guest : true
        }).then(response =>{
            return this.afterLogin(response.data)
        })
    },
    logout(){
        return axios.post('/logout').then(response => response.data)
    },
    afterLogin(token){
        store.put(TOKEN_CACHE_NAME, token.access_token);
        if ( token.expires_in > 0 ) {
            store.put(TOKEN_EXPIRE_NAME, new Date().getTime() + token.expires_in * 1000 - 5000);
        }
        return token;
    },
    refresh(){
        let token = store.get(TOKEN_CACHE_NAME);
        return axios.post('/refresh', {}, {
            guest : true,
            headers : {
                Authorization : 'Bearer ' + token
            },
            toast : false
        }).then(response =>{
            return this.afterLogin(response.data)
        })
    },
    readyToRefresh(ttl, cb){
        setTimeout(() => {
            typeof cb === 'function' || (cb = token => token);
            this.refresh().then(cb);
        }, ttl)
    }
};
export default UserApi;
