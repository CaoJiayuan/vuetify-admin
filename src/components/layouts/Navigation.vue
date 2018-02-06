<template>
    <v-navigation-drawer :dark="theme.dark" fixed v-model="open" app>
        <v-toolbar flat>
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="title">
                        <strong>Admin</strong><span v-if="!nav.mini">test</span>
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list>
            <template v-for="item in items">
                <v-list-group :prepend-icon="item.icon"
                              no-action v-if="hasNode(item) && item.granted !== false" :group="item.name">
                    <v-list-tile slot="activator" ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.display_name }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile :to="node.path" ripple v-model="active === item.name" v-for="node in item.nodes"
                                 :key="node.name" @click="navigate(node)" v-if="node.granted !== false">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ node.display_name }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>{{ node.icon }}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>
                <v-list-tile :to="item.path"  v-if="item.granted !== false && !hasNode(item)" v-model="active === item.name" ripple :key="item.name"
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
                let node = this.getNode(item)
                let hasOne = false;
                node.forEach(n => {
                    if (n.granted !== false) {
                        hasOne = true;
                    }
                })

                return node.length > 0 && hasOne;
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
