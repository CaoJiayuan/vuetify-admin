<template>
    <v-container>
        <v-card :dark="theme.dark">
            <v-toolbar light flat>
                <v-toolbar-title>Users</v-toolbar-title>
            </v-toolbar>
            <v-card-title>
                <data-table v-model="selected" :selectable="true" :actions="actions" :headers="headers" api-url="/users"></data-table>
            </v-card-title>
        </v-card>
        <v-dialog transition="slide-y-transition" v-model="dialog" max-width="480" lazy>
            <v-card-media>
                <img src="/images/placeholder@256.png" class="lazyload" :data-src="img" alt="">
            </v-card-media>
        </v-dialog>
    </v-container>
</template>

<script>
    import DataTable from '../../components/datatable/Datatable.vue'
    import theme from '../../mixins/theme'

    export default {
        data () {
            return {
                headers: [
                    {
                        text: 'ID',
                        value: 'id'
                    },
                    {
                        text: 'Avatar',
                        value: 'avatar',
                        display: (v) => `<div class="avatar" style="height: 32px;width: 32px"><img src="${v}"/></div>`,
                        click: (v) => {
                            this.img = v
                            this.dialog = true
                        }
                    },
                    {
                        text: 'Nickname',
                        value: 'nickname'
                    },
                    {
                        text: 'Vip expire',
                        value: 'vip_expire'
                    },
                    {
                        text: 'Created at',
                        value: 'created_at'
                    },
                ],
                img: null,
                dialog: false,
                actions: [
                    {
                        icon: 'edit',
                        color: 'green',
                        click: item => console.log(item)
                    },
                    {
                        icon: 'delete',
                        color: 'error',
                        click: item => console.log(this.selected),
                        granted: item => {
                            return item.id % 2 === 1;
                        }
                    },
                ],
                selected: []
            }
        },
        mixins: [theme],
        components: {DataTable},
        methods: {},
        mounted () {

        },
        created () {

        },

    }
</script>
