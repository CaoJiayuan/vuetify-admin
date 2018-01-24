<template>
    <v-toolbar app :color="theme.color" :dark="theme.dark" fixed>
        <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
        <v-toolbar-title>{{ user.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-avatar size="42px" class="grey lighten-4">
            <img :src="user.avatar" alt="avatar">
        </v-avatar>
        <v-btn ripple @click="logout" flat>登出</v-btn>
    </v-toolbar>
</template>

<script>
    const mapGetters = Vuex.mapGetters;

    import UserApi from '../../apis/UserApi';
    import {LOGIN_PATH} from '../../constant';

    export default {
        data() {
            return {
                mini: false
            }
        },
        computed  : {
            ...mapGetters({
                user: 'user',
                theme:'theme'
            })
        },
        components: {},
        methods   : {
            mimiNav() {
            },
            logout(){
                UserApi.logout().then(res => {
                    this.$router.push(LOGIN_PATH)
                })
            }
        },
        mounted() {
            this.$store.dispatch('loadUser')
        },
        created() {

        },
        watch     : {
            mini(now) {
                this.$store.commit('miniNavigation', {mini: now})
            }
        }
    }
</script>
