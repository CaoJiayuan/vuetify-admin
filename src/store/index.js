import user from './modules/user';
import toast from './modules/toast';
import navigation from './modules/navigation';
import theme from './modules/theme';

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules : {
        user,
        navigation,
        theme,
        toast
    },
    strict: debug,
})