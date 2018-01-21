import store from './store';
import {router} from './router';
import interceptor from './interceptor';
import Toast from './components/Toast.vue';
import TopBar from './components/layouts/TopBar.vue';
import Navigation from './components/layouts/Navigation.vue';

require('./app/request');
router.beforeEach(interceptor);

new Vue({
    store,
    router,
    computed:{
        isLogin(){
            return this.$route.path === '/login';
        }
    },
    components: {Toast,TopBar,Navigation},
    el        : '#app'
});