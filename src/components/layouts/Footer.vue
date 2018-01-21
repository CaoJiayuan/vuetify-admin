<template>
    <v-footer fixed :color="theme.color" :dark="theme.dark">
        <div :style="{color:color}">fanscome.zdhdtech.cn ©{{ new Date().getFullYear() }}</div>
        <v-spacer></v-spacer>
        <v-btn color="dark" dark small bottom right fab @click="changeTheme({color:'grey darken-2', dark :true})">
        </v-btn>
        <v-btn color="white" dark small bottom right fab @click="changeTheme({color:'white'})">
        </v-btn>
        <v-btn color="primary" dark small bottom right fab @click="changeTheme({color:'primary', dark:true})">
        </v-btn>
    </v-footer>
</template>

<script>
    const mapMutations = Vuex.mapMutations;
    const mapGetters = Vuex.mapGetters;
    export default {
        data() {
            return {}
        },
        computed  : {
            color(){
                return this.theme.color !== 'white' ? 'white' : 'black'
            },
            ...mapGetters({
                theme:'theme'
            })
        },
        components: {},
        methods   : {
            ...mapMutations({
                changeTheme: 'changeTheme'
            })
        },
        mounted() {

        },
        created() {

        },

    }
</script>
