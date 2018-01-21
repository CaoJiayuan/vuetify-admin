const state = {
    toast: {
        active: false
    }
};

const getters = {
    toast: state => state.toast
};

const actions = {
    toast({commit}, options = {}) {

        let {active = true, y = 'top', x = null, mode = '', timeout = 3000,color = 'normal', text} = options;
        return commit('changeToast', {
            active,
            color,
            y,
            x,
            mode,
            timeout,
            text
        })
    }
};

const mutations = {
    changeToast(state, options) {
        state.toast = options;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}