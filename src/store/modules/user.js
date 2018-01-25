import UserApi from '../../apis/UserApi';
const state = {
    user: {},
    tokenStatus : 2
};

const getters = {
    user: state => state.user,
    tokenStatus: state => state.tokenStatus
};

const actions = {
    loadUser({commit}) {
        UserApi.getUser().then(user => {
            commit('setUser', {user})
        })
    }
};

const mutations = {
    setUser(state, {user}) {
        state.user = user;
    },
    setTokenStatus(state, status){
        state.tokenStatus = status;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}
