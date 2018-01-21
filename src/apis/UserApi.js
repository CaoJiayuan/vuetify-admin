import {TOKEN_CACHE_NAME,TOKEN_EXPIRE_NAME} from '../constant';
function Token() {

}
Token.prototype.access_token = null;
Token.prototype.expires_in = 0;
Token.prototype.type = null;
let localStorage = window.localStorage;

const UserApi = {
    getUser() {
        return axios.get('/user').then(response => response.data)
    },
    login(credentials){
        return axios.post('/login', credentials).then(response =>{
            return this.afterLogin(response.data)
        })
    },
    logout(){
        return axios.post('/logout').then(response => response.data)
    },
    afterLogin(token){
        localStorage.setItem(TOKEN_CACHE_NAME, token.access_token);
        if ( token.expires_in > 0 ) {
            localStorage.setItem(TOKEN_EXPIRE_NAME, new Date().getTime() + token.expires_in * 1000 - 5000);
        }
        return token;
    },
    refresh(){
        return axios.post('/refresh').then(response =>{
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
