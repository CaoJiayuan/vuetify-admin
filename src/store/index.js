import user from './modules/user';
import toast from './modules/toast';
import navigation from './modules/navigation';

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules : {
        user,
        navigation,
        toast
    },
    strict: debug,
})