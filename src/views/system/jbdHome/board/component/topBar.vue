<template>
    <div id="top-bar">
        <div :class="$style.bar">
            <div
                v-for="(item, index) in topBarData"
                :key="index"
                :class="$style.item"
            >
                <div :class="$style.title">{{ item.title }}</div>
                <div :class="$style.count">
                    <dv-digital-flop
                        :config="item.data"
                        :class="$style.flop"
                        :style="`color:${fontColor[index]}`"
                    />
                    <div :class="$style.unit">{{ item.unit }}</div>
                </div>
            </div>
        </div>
        <dv-decoration-10 />
    </div>
</template>
<script>
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
                topBarData: [],
                fontColor: [
                    '#d20962',
                    '#f47721',
                    '#7ac143',
                    '#00a78e',
                    '#00bce4',
                    '#7d3f98',
                    '#037ef3',
                    '#f85a40',
                    '#00c16e',
                    '#ffd900',
                    '#0cb9c1',
                    '#7552cc'
                ]
            }
        },
        created() {
            this.update()
        },
        methods: {
            //随机颜色
            getRandom(minNum, maxNum) {
                if (arguments.length === 1) {
                    return parseInt(Math.random() * minNum + 1, 10)
                } else {
                    return parseInt(
                        Math.random() * (maxNum - minNum + 1) + minNum,
                        10
                    )
                }
            },
            // 数据更新
            update() {
                let temp = []
                this.info.forEach((item, index) => {
                    const obj = {
                        title: item.title,
                        data: {
                            number: [item.value],
                            content: '{nt}',
                            textAlign: 'right',
                            style: {
                                fill: this.fontColor[this.getRandom(0, 11)],
                                fontWeight: 'bold'
                            }
                        },
                        unit: '件'
                    }
                    temp.push(obj)
                })
                this.topBarData = JSON.parse(JSON.stringify(temp))
            }
        }
    }
</script>
<style lang="scss" module>
    .bar {
        position: relative;
        height: 150px;
        margin: 20px 2%;
        display: flex;
        // flex-shrink: 0;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(6, 30, 93, 0.5);
        .item {
            width: 25%;
            height: 60%;
            padding: 20px;
            border-left: 5px solid rgb(6, 30, 93);
            .title {
                text-align: center;
                font-size: 16px;
                margin: 10px 0 24px;
            }
            .count {
                display: flex;
                align-items: center;
                justify-content: center;
                .flop {
                    width: 80px;
                    height: 50px;
                    font-size: 18px;
                }
                .unit {
                    margin-left: 10px;
                    box-sizing: border-box;
                }
            }
        }
    }
    :global {
        .dv-decoration-10 {
            width: 96%;
            margin: 0 2%;
            height: 5px;
        }
    }
</style>
