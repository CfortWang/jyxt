<template>
    <div id="middle-card">
        <div :class="$style.chart_box">
            <div :class="$style.item">
                <div :class="$style.title">
                    <span>检测受理类型</span>
                </div>
                <div id="chart1" style="width: 100%; height: 100%;"></div>
            </div>
            <div :class="$style.item">
                <div :class="$style.title">
                    <span>检测任务情况</span>
                </div>
                <!-- <div id="chart2"></div> -->
                <dv-conical-column-chart :config="taskData" style="width:100%;height:100%;min-height: 120px;" />
            </div>
            <div :class="$style.item">
                <dv-scroll-board :config="tableData" style="width:100%;height:100%;" />
            </div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import { chartData1 } from '../data'
    export default {
        name: 'topBar',
        props: {
            info: {
                type: Array,
                default: []
            }
        },
        components: {},
        watch: {
            info(v){
                console.log(v)
                this.update()
            }
        },
        data() {
            return {
                cardData: ['test1', 'test2', 'test3'],
                taskData: {
                    data: [
                        {
                            name: '委托',
                            value: 25
                        },
                        {
                            name: '受理',
                            value: 5
                        },
                        {
                            name: '任务分配',
                            value: 2
                        },
                        {
                            name: '报告',
                            value: 1
                        }
                    ],
                    showValue: true
                },
                tableData: {
                    header: ['列1', '列2', '列3', '列4', '列5'],
                    data: [
                        ['行1列1', '行1列2', '行1列3', '行1列2', '行1列3'],
                        ['行2列1', '行2列2', '行2列3', '行1列2', '行1列3'],
                        ['行3列1', '行3列2', '行3列3', '行1列2', '行1列3'],
                        ['行4列1', '行4列2', '行4列3', '行1列2', '行1列3'],
                        ['行5列1', '行5列2', '行5列3', '行1列2', '行1列3'],
                        ['行6列1', '行6列2', '行6列3', '行1列2', '行1列3'],
                        ['行7列1', '行7列2', '行7列3', '行1列2', '行1列3'],
                        ['行8列1', '行8列2', '行8列3', '行1列2', '行1列3'],
                        ['行9列1', '行9列2', '行9列3', '行1列2', '行1列3'],
                        ['行10列1', '行10列2', '行10列3', '行1列2', '行1列3']
                    ]
                }
            }
        },
        created() {
            
        },
        mounted() {
            const chart1 = echarts.init(document.getElementById('chart1'))
            // chartData1.series[0].data = [100, 200, 300, 400, 500]
            chart1.setOption(chartData1)
        },
        methods: {
            
        }
    }
</script>
<style lang="scss" module>
    .chart_box{
        display: flex;
        width: 96%;
        height: 50%;
        padding: 20px 2%;
        .item{
            width: 25%;
            // height: 100%;
            height: 250px;
            background-color: rgba(6, 30, 93, 0.5);
            &:last-child{
                width: 50%;
            }
            .title{

            }
        }
    }
</style>