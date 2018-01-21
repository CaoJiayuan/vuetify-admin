import store from './store';
import {router} from './router';
import interceptor from './interceptor';
import Toast from './components/Toast.vue';
import TopBar from './components/layouts/TopBar.vue';
import Navigation from './components/layouts/Navigation.vue';
import Mfooter from './components/layouts/Footer.vue';

require('./app/request');
router.beforeEach(interceptor);
const mapGetters = Vuex.mapGetters;
new Vue({
    store,
    router,
    computed  : {
        isLogin() {
            return this.$route.path === '/login';
        },
        ...mapGetters({
            theme: 'theme'
        })
    },
    components: {Toast, TopBar, Navigation, Mfooter},
    el        : '#app'
});