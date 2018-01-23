<template>
    <v-layout>
        <v-flex xs12 md4 offset-md4 style="margin-top: 50px">
            <v-card>
                <v-toolbar :color="theme.color" :dark="theme.dark" flat>
                    <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-progress-linear :indeterminate="true" height="3" color="green" style="margin: 0" v-if="requesting"></v-progress-linear>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field
                                label="E-mail"
                                required
                                v-model="post.email"
                        ></v-text-field>
                        <v-text-field
                                label="密码"
                                :append-icon="showPass ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="() => (showPass = !showPass)"
                                :type="showPass ?  'text' : 'password'"
                                v-model="post.password"
                                counter
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="login">登陆</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import UserApi from '../../apis/UserApi';
    const mapGetters = Vuex.mapGetters;
    export default {
        data() {
            return {
                showPass : false,
                requesting : false,
                post :{}
            }
        },
        computed:{
                ...mapGetters({
                    theme: 'theme'
                })
        },
        components: {},
        methods   : {
            login(){
                this.requesting = true;
                UserApi.login(this.post).then(re => {
                    this.requesting = false;
                    this.$router.push('/dashboard');
                }).catch(error => this.requesting = false)
            }
        },
        mounted() {

        },
        created() {

        },

    }
</script>
