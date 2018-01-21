import HomeApi from '../../apis/HomeApi';

const state = {
    navigation: {
        mini: false,
        items : []
    }
};

const getters = {
    navigation: state => state.navigation
};

const actions = {
    loadNavigation({commit}){
        return HomeApi.getNavigation().then(items => commit('changeNavigation', {
            items
        }))
    }
};

const mutations = {
    changeNavigation(state, {items = []}) {
        state.navigation.items = items;
    },
    miniNavigation(state, {mini = true}) {
        state.navigation.mini = mini
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}