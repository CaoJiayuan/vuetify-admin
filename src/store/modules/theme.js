import {Store} from '../../app/utils'
const store = new Store()
const STORAGE_KEY = 'v_theme';
const state = {
    theme: {
        color : 'white',
        dark : false,
    }
};

const getters = {
    theme: state => {
        let s = store.get(STORAGE_KEY);
        if (s) {
            state.theme = s;
        }
        return state.theme;
    }
};

const actions = {

};

const mutations = {
    changeTheme(state, {color = dark ? 'dark' : 'white', dark = false}){
        state.theme.color = color;
        state.theme.dark = dark;
        store.put(STORAGE_KEY, state.theme);
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}
