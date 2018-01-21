<template>
    <v-layout>
        <v-flex xs12 md4 offset-md4 style="margin-top: 50px">
            <v-card>
                <v-toolbar dark color="primary" flat>
                    <v-toolbar-title class="white--text">Hello</v-toolbar-title>
                </v-toolbar>
                <v-progress-linear :indeterminate="true" color="green" style="margin: 0" v-if="requesting"></v-progress-linear>
                <v-card-text>

                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import TopBar from '../components/layouts/TopBar.vue'

    export default {
        data() {
            return {}

        },
        components: {TopBar},
        methods   : {},
        mounted() {

        },
        created() {

        },

    }
</script>
