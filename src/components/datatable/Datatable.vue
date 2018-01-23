<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-data-table :must-sort="mustSort" :total-items="paginator.total" :dark="theme.dark" disable-initial-sort
                          :headers="fields" :items="paginator.data" hide-actions :loading="loading"
                          :pagination.sync="pagination">
                <template slot="no-data">
                    <div v-html="placeholder"></div>
                </template>
                <template slot="items" slot-scope="props">
                    <td v-if="!field.action" :class="field.align ? 'text-xs-'+ field.align : 'text-xs-left'" v-for="field in fields"
                        v-html="renderField(props.item, field)" @click="clickField(props.item, field)">
                    </td>
                    <td :class="'text-xs-' + actionsAlign" v-if="hasActions">
                        <v-btn :flat="action.flat" :dark="action.dark"
                               small :key="$index"
                               v-for="action in fixedActions" :color="action.color"
                               :fab="!action.text"
                               @click="callParentMethod(action.click, props.item)">
                            <v-icon>{{ action.icon }}</v-icon>{{ action.text }}
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
        <v-flex xs12>
            <div class="text-xs-left pt-2 xs12">
                <v-pagination @input="page" :total-visible="7" circle v-model="pagination.page"
                              :length="paginator.last_page"></v-pagination>
                <v-btn fab small><v-icon>refresh</v-icon></v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Api from './api'
    import theme from '../../mixins/theme'

    export default {
        props: {
            apiUrl: {
                type: String,
                default: () => ''
            },
            actions: {
                type: Array,
                default: () => []
            },
            headers: {
                type: Array,
                default: () => []
            },
            placeholder: {
                type: String,
                default: () => '没有更多数据'
            },
            actionsTitle: {
                type: String,
                default: () => '操作'
            },
            actionsAlign: {
                type: String,
                default: () => 'center'
            },
            mustSort: {
                type: Boolean,
                default: true
            }
        },
        mixins: [theme],
        data () {
            return {
                fields: [],
                loading: false,
                paginator: {
                    total: 0,
                    per_page: 10,
                    current_page: 0,
                    last_page: 0,
                    next_page_url: null,
                    prev_page_url: null,
                    from: 0,
                    to: 0,
                    data: []
                },
                pagination: {},
                fixedActions : []
            }
        },
        computed: {
            hasActions () {
                let has = false

                this.actions.forEach(action => {
                    if (action['granted'] !== false) {
                        has = true
                    }
                })

                return has
            },

        },
        components: {},
        methods: {
            load ({per_page = 10, page = 1, sort}) {
                this.loading = 'green'
                return Api.getData(this.apiUrl, {
                    per_page,
                    page,
                    sort
                }).then(paginator => {
                    this.loading = false
                    this.paginator = paginator
                    this.pagination.page = paginator.current_page
                    this.pagination.rowsPerPage = paginator.per_page
                    this.pagination.totalItems = paginator.total
                    this.emit('loaded', paginator)
                }).catch(error => this.loading = false)
            },
            formatHeaders () {
                this.fields = this.headers.map(header => {
                    header.align = header.align || 'left'
                    return header;
                })
                this.hasActions && this.fields.push({
                    text: this.actionsTitle,
                    align: this.actionsAlign,
                    sortable:false,
                    action : true
                })
            },
            fixActions(){
                let actions = _.clone(this.actions);

                this.fixedActions = actions.map(action => {
                    let {icon = '', text = '', color = 'primary', dark = false, flat = false} = action
                    action.icon = icon;
                    action.text = text;
                    action.color = color;
                    action.dark = dark;
                    action.flat = flat;
                    return action;
                });
            },
            renderField (item, field) {
                let value = item[field.value]
                let display  = field.display;
                if (!display) {
                    return value;
                }

                return this.callParentMethod(display, value, item)
            },
            page (page) {
                this.load({
                    page: page
                })
            },

            getParentMethod (method) {
                if (typeof method === 'function') {
                    return method
                }
                let m = this.$parent[method]
                if (m && typeof m === 'function') {
                    return m
                }
                return false
            },
            callParentMethod (method, ...args) {
                let m = this.getParentMethod(method)
                if (m) {
                    return m.call(this.$parent, ...args)
                }
                return m
            },
            clickField(item, field){
                let value = item[field.value]
                let click = field.click;
                if (click) {
                    this.callParentMethod(click, value, item);
                }
            }
        },
        mounted () {
            this.formatHeaders();
            this.fixActions();
            this.apiUrl && this.load({});
        },
        created () {

        },
        watch: {
            pagination (now) {
                if (now.sortBy) {
                    let key = now.sortBy
                    key += now.descending ? '|desc' : '|asc'
                    this.load({
                        sort: key,
                    })
                }
            }
        }
    }
</script>
