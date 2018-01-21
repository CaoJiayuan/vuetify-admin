import UserApi from '../../apis/UserApi';
const state = {
    theme: {
        color : 'white',
        dark : false,
    }
};

const getters = {
    theme: state => state.theme
};

const actions = {

};

const mutations = {
    changeTheme(state, {color = dark ? 'dark' : 'white', dark = false}){
        state.theme.color = color;
        state.theme.dark = dark;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}