<template>
    <v-toolbar app dark color="primary">
        <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{ user.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-avatar class="grey lighten-4">
            <img :src="user.avatar" alt="avatar">
        </v-avatar>
        <v-menu bottom left>
            <v-btn icon slot="activator" dark>
                <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
                <v-list-tile ripple @click="logout">
                    <v-list-tile-title>登出</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>

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
                user: 'user'
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
