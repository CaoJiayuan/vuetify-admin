import {LOGIN_PATH} from './constant';
const routes = [
    {
        path : '/dashboard',
        component: require('./pages/Dashboard.vue'),
        meta:{
            title:'Dashboard'
        }
    },
    {
        path: LOGIN_PATH,
        component: require('./pages/login/Index.vue'),
        meta:{
            title : 'Login'
        }
    }
];


const router = new VueRouter({
    routes
});


export {
    routes,
    router
}
