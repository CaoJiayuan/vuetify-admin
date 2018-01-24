<template>
    <v-layout row>
        <v-flex xs4 md3 offset-md1 style="margin-top: 50px">
            <v-card ripple color="blue lighten-2">
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">用户数</h3>
                        <div>{{data.users}}</div>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
        <v-flex xs4 md3 style="margin-top: 50px;margin-left: 5px">
            <v-card ripple color="orange">
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">营业额</h3>
                        <div>{{data.sales | moneny}}</div>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
        <v-flex xs4 md3 style="margin-top: 50px;margin-left: 5px">
            <v-card ripple color="grey">
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">文章数</h3>
                        <div>{{data.articles}}</div>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import TopBar from '../components/layouts/TopBar.vue'
    import HomeApi from '../apis/HomeApi';

    export default {
        data() {
            return {
                data: {}
            }
        },
        components: {TopBar},
        methods   : {},
        mounted() {
            HomeApi.stats().then(data => this.data = data)
        },
        created() {

        },
        filters:{
            moneny(v){
                return accounting.formatMoney(v / 100, "¥");
            }
        }
    }
</script>
