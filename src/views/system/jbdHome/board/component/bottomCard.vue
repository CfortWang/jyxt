<template>
    <div id="middle-card">
        <div :class="$style.chart_box">
            <div
                v-for="(item, index) in cards"
                :key="index"
                :class="$style.item"
            >
                <div :id="item" style="width: 100%; height: 100%"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import { trustOption, sampleOption, monthOption, yearOption } from '../data'
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
            info(v) {
                console.log(v)
                this.update()
            }
        },
        data() {
            return {
                cards: ['trust', 'sample', 'month', 'year']
            }
        },
        created() {},
        mounted() {
            this.init()
        },
        methods: {
            init() {
                const trust = echarts.init(document.getElementById('trust'))
                const sample = echarts.init(document.getElementById('sample'))
                const month = echarts.init(document.getElementById('month'))
                const year = echarts.init(document.getElementById('year'))
                trust.setOption(trustOption)
                sample.setOption(sampleOption)
                month.setOption(monthOption)
                year.setOption(yearOption)
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
        padding: 0 2% 20px;
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
