<template>
    <div :class="$style.content">
        <dv-full-screen-container>
            <!-- 头部内容 -->
            <div :class="$style.header">
                <dv-decoration-8 :class="$style.left" />
                <dv-decoration-5 :class="$style.center" />
                <dv-decoration-8 :class="$style.right" :reverse="true" />
                <div :class="$style.title">{{ titleName }}</div>
                <div :class="$style.time">
                    <el-date-picker
                        v-model="checkDate"
                        type="month"
                        value-format="yyyy-MM"
                        format="yyyy-MM"
                        placeholder="日期选择"
                        style="width: 130px"
                        :readonly="false"
                        :editable="true"
                        :clearable="false"
                        @change="updateAll"
                    />
                </div>
                <div :class="$style.back" @click.prevent="goBack()">
                    <dv-border-box-8>返回</dv-border-box-8>
                </div>
            </div>
            <dv-border-box-1>
                <!-- topBar -->
                <top-bar v-if="topBarData.length" :info="topBarData" />
            </dv-border-box-1>
        </dv-full-screen-container>
    </div>
</template>
<script>
    import screenfull from 'screenfull'
    import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
    export default {
        name: 'checkBoard',
        components: {
            topBar: () => import('./component/topBar')
        },
        data() {
            return {
                titleName: '检测综合信息查询',
                checkDate: new Date().toJSON().slice(0, 7),
                label: ['委托', '受理', '任务发放', '报告'],
                topBarData: []
            }
        },
        created() {
            if (screenfull.isEnabled && !screenfull.isFullscreen) {
                this.allView()
            }
            this.getTopBarData()
        },
        beforeDestroy() {
            if (screenfull.isFullscreen) {
                screenfull.toggle()
            }
        },
        methods: {
            allView() {
                // 默认显示全屏
                screenfull.request()
            },
            goBack() {
                this.$router.back(-1)
            },
            updateAll(e) {
                console.log(e)
                this.getTopBarData()
            },
            // 获取topBar数据
            getTopBarData() {
                // 获取委托数及受理数
                const sql1 = `select count(id_ or null) as total, count(zhuang_tai_ = '委托结束' or null) as accepted from t_mjwtsqb where create_time_ like '%${this.checkDate}%'`
                // 获取任务分配数
                const sql2 = `select count(id_ or null) as task from t_rwfpb where create_time_ like '%${this.checkDate}%'`
                // 获取产生报告数
                const sql3 = `select count(id_ or null) as report from t_mjjcbg where create_time_ like '%${this.checkDate}%'`
                Promise.all([
                    curdPost('sql', sql1),
                    curdPost('sql', sql2),
                    curdPost('sql', sql3)
                ])
                    .then(([res1, res2, res3]) => {
                        const data1 = res1.variables.data
                        const data2 = res2.variables.data
                        const data3 = res3.variables.data

                        if (
                            data1 &&
                            data2 &&
                            data3 &&
                            data1.length &&
                            data2.length &&
                            data3.length
                        ) {
                            let value = [
                                data1[0].total,
                                data1[0].accepted,
                                data2[0].task,
                                data3[0].report
                            ]
                            let result = []

                            this.label.forEach((item, index) => {
                                let obj = {
                                    title: item,
                                    value: value[index]
                                }
                                result.push(obj)
                            })
                            this.topBarData = result
                            console.log(this.topBarData)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>
<style lang="scss" module>
    .content {
        width: 100%;
        height: 100%;
        background-color: #030409;
        position: absolute;
        color: #fff;
        z-index: 999;
        :global {
            #dv-full-screen-container {
                background-image: url('../datav/img/bg.png');
                background-size: 100% 100%;
                box-shadow: 0 0 3px blue;
                display: flex;
                flex-direction: column;
            }
            .main-content {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .block-left-right-content {
                flex: 1;
                display: flex;
                margin-top: 0.8%;
            }

            .block-top-bottom-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding-left: 0.8%;
            }

            .block-top-content {
                height: 55%;
                display: flex;
                flex-grow: 0;
                box-sizing: border-box;
                padding-bottom: 0.8%;
            }
        }
        .header {
            position: relative;
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-between;
            flex-shrink: 0;
            .left,
            .right {
                width: 25%;
                height: 60px;
            }
            .center {
                width: 40%;
                height: 60px;
                margin-top: 30px;
            }
            .title {
                position: absolute;
                font-size: 30px;
                font-weight: bold;
                left: 50%;
                top: 15px;
                transform: translateX(-50%);
            }
            .time,
            .back {
                width: 8%;
                cursor: pointer;
                height: 2.825rem;
                line-height: 2.825rem;
                text-align: center;
                margin-left: 63%;
                margin-top: 2.5%;
                flex: 1;
                position: absolute;
                color: #ffffff;
            }
            .back {
                margin-left: 75%;
            }
        }
    }
</style>
