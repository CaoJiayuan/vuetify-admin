const mapGetters = Vuex.mapGetters;

export default {
    computed : {
        ...mapGetters({
            theme : 'theme'
        })
    }
}
