<template>
    <div id="middle-card">
        <div :class="$style.chart_box">
            <div :class="$style.item">
                <!-- <div :class="$style.title">
                    <span>检测受理类型</span>
                </div> -->
                <div id="accept" style="width: 100%; height: 100%"></div>
            </div>
            <div :class="$style.item">
                <!-- <div :class="$style.title">
                    <span>检测任务情况</span>
                </div> -->
                <div id="task" style="min-width: 300px; height: 100%"></div>
                <!-- <dv-conical-column-chart
                    :config="taskData"
                    style="width: 100%; height: 100%; min-height: 120px"
                /> -->
            </div>
            <div :class="$style.item">
                <dv-scroll-board
                    v-if="tableData.data && tableData.data.length"
                    :config="tableData"
                    style="width: 100%; height: 100%"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import { acceptOption, taskOption } from '../data'
    export default {
        name: 'topBar',
        props: {
            info: {
                type: Object,
                default: {}
            }
        },
        components: {},
        watch: {
            info: {
                handler() {
                    this.updata()
                },
                deep: true
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
                tableData: {}
            }
        },
        created() {
            this.tableData = this.info.tableData
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                const accept = echarts.init(document.getElementById('accept'))
                const task = echarts.init(document.getElementById('task'))
                accept.setOption(acceptOption)
                task.setOption(taskOption)
            },
            updata() {
                this.tableData = JSON.parse(JSON.stringify(this.info.tableData))
            }
        }
    }
</script>
<style lang="scss" module>
    .chart_box {
        position: relative;
        display: flex;
        width: 96%;
        height: 350px;
        padding: 20px 2%;
        .item {
            width: 30%;
            height: 100%;
            // height: 250px;
            background-color: rgba(6, 30, 93, 0.5);
            &:last-child {
                width: 40%;
            }
            .title {
            }
        }
    }
</style>
