<template>
    <v-container  grid-list-md>
        <v-layout row>
            <v-flex xs4 md3 offset-md1 style="margin-top: 50px">
                <v-card ripple class="light-blue lighten-3">
                    <v-card-media class="light-blue lighten-4" height="50px">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">用户数</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h2>{{data.users}}</h2>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs4 md3 style="margin-top: 50px;margin-left: 5px">
                <v-card ripple color="orange">
                    <v-card-media class="lime lighten-2" color="primary" height="50px">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">营业额</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h2>{{data.sales | moneny}}</h2>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs4 md3 style="margin-top: 50px;margin-left: 5px">
                <v-card ripple color="grey">
                    <v-card-media class="cyan" color="primary" height="50px">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline white--text">文章数</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h2>{{data.articles}}</h2>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 md9 offset-md1>
                <v-card>
                    <v-card-media height="400px">
                        <v-container>
                            <div id="chart" style="width: 100%;height: 400px;" ref="chart"></div>

                        </v-container>
                    </v-card-media>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import TopBar from '../components/layouts/TopBar.vue'
    import HomeApi from '../apis/HomeApi'
    export default {
        data () {
            return {
                data: {}
            }
        },
        components: {TopBar},
        methods: {},
        mounted () {
            HomeApi.stats().then(data => this.data = data);
            this.$nextTick(() => {
                let el = this.$refs.chart;
                var myChart = echarts.init(el);

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            })
        },
        created () {

        },
        filters: {
            moneny (v) {
                return accounting.formatMoney(v / 100, '¥')
            }
        }
    }
</script>
