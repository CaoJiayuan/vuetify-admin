import { LOGIN_PATH } from './constant'

const routes = [
    {
        path: '/dashboard',
        component: require('./pages/Dashboard.vue'),
        meta: {
            title: 'Dashboard'
        }
    },
    {
        path: '/users',
        component: require('./pages/account/Index.vue'),
        meta: {
            title: 'Accounts'
        }
    },
    {
        path: LOGIN_PATH,
        component: require('./pages/login/Index.vue'),
        meta: {
            title: 'Login',
            guest: true
        }
    },
    {
        path: '*',
        redirect: '/dashboard'
    }
]

const router = new VueRouter({
    routes
})

export {
    routes,
    router
}
