<template>
    <v-navigation-drawer :dark="theme.dark" fixed v-model="open" app>
        <v-toolbar flat>
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="title">
                        <strong>Fans</strong><span v-if="!nav.mini">admin</span>
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list>
            <template v-for="item in items">
                <v-list-group v-if="hasNode(item)" :group="item.name">
                    <v-list-tile slot="item" ripple>
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.display_name }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>keyboard_arrow_down</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile :to="node.path" ripple v-model="active === item.name" v-for="node in item.nodes"
                                 :key="node.name" @click="navigate(node)">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ node.display_name }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>{{ node.icon }}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>
                <v-list-tile v-else :to="item.path" v-model="active === item.name" ripple :key="item.name"
                             @click="navigate(item)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.display_name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    const mapGetters = Vuex.mapGetters;
    export default {
        data() {
            return {
                active: false
            }
        },
        computed  : {
            items() {
                return this.nav.items;
            },
            open : {
                get(){
                    return !this.nav.mini
                },
                set(open){
                    this.$store.commit('miniNavigation', {mini: !open})
                }
            },
            ...mapGetters({
                nav: 'navigation',
                theme : 'theme'
            })
        },
        components: {},
        methods   : {
            navigate(item) {
                this.active = item.name;
            },
            hasNode(item) {
                return this.getNode(item).length > 0;
            },
            getNode(item) {
                return item.nodes ? item.nodes : [];
            }
        },
        mounted() {
            this.$store.dispatch('loadNavigation')
        },
        created() {

        }
    }
</script>
