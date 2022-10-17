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
                        v-model="month"
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
                <!-- middleCard -->
                <middle-card v-if="middleCardData.flag" :info="middleCardData" />
                <!-- bottomCard -->
                <bottom-card v-if="bottomCardData.flag" :info="bottomCardData" />
            </dv-border-box-1>
        </dv-full-screen-container>
    </div>
</template>
<script>
    // const sql1 = `select wt.total as wtTotal, wt.accepted as aaccepted, jc.total as jcTotal, jc.finished as jcFinish, rw.task as task, rw.finished as rwFinish, bg.report as report, bg.process as process,bg.approval as approval
    // from
    // (select count(id_) as total, count(zhuang_tai_ = '委托结束' or null) as accepted, count(create_time_ like '${today}' or null) as today from t_mjwtsqb where create_time_ LIKE '${month}%') wt,
    // (select count(id_) as total, count(jian_ce_zhuang_ta = '已完成' or null) as finished from t_jchzb where create_time_ LIKE '${month}%') jc,
    // (select count(id_) as task, count(zhuang_tai_ = '任务已完成' or null) as finished from t_rwfpb where create_time_ LIKE '${month}%') rw,
    // (select count(id_) as report, count(zhuang_tai_ = '报告待审核' or null) as process, count(zhuang_tai_ = '报告待审批' or null) as approval from t_mjjcbg where create_time_ LIKE '${month}%') bg`

    import screenfull from 'screenfull'
    import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
    export default {
        name: 'checkBoard',
        components: {
            topBar: () => import('./component/topBar'),
            middleCard: () => import('./component/middleCard'),
            bottomCard: () => import('./component/bottomCard')
        },
        data() {
            const d = new Date()
            return {
                titleName: '检测综合信息查询',
                year: d.toJSON().slice(0, 4),
                month: d.toJSON().slice(0, 7),
                today: d.toJSON().slice(0, 10),
                label: ['委托', '受理', '任务发放', '报告'],
                topBarData: [],
                middleCardData: {
                    tableData: {
                        header: [
                            '检测任务',
                            '检测类型',
                            '计划完成时间',
                            '当前状态',
                            '人员'
                        ],
                        data: [],
                        rowNum: 7,
                        columnWidth: ['300','100','150','100','100']
                    },
                    acceptData:[],
                    taskData: [],
                    flag: false
                },
                bottomCardData: {
                    flag: false
                }
            }
        },
        // beforeRouteEnter(to, from, next){
        //     Promise.all([  ]).done(([ res ]) => {
        //         console.log(res)
        //     }).then(err => {
        //         window.observer.trigger('error', err)
        //         next()
        //     })
        // },
        created() {
            if (screenfull.isEnabled && !screenfull.isFullscreen) {
                this.allView()
            }
            this.updateAll()
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
                this.getTopBarData()
                this.getMiddleData()
                this.getBottomData()
            },
            // 获取topBar数据
            /**
             *  委托——t_mjwtsqb
             *  检测——t_jchzb
             *  任务——t_rwfpb
             *  报告——t_mjjcbg
             */
            getTopBarData() {
                // 获取委托数及受理数
                const sql = `select wt.total as wtTotal, wt.today as today, wt.accepted as accepted, jc.total as jcTotal, jc.finished as jcFinish, rw.task as task, rw.finished as rwFinish, bg.report as report, bg.process as process,bg.approval as approval
                from
                (select count(id_) as total, count(zhuang_tai_ = '委托结束' or null) as accepted, count(create_time_ like '${this.today}' or null) as today from t_mjwtsqb where create_time_ LIKE '${this.month}%') wt,
                (select count(id_) as total, count(jian_ce_zhuang_ta = '已完成' or null) as finished from t_jchzb where create_time_ LIKE '${this.month}%') jc,
                (select count(id_) as task, count(zhuang_tai_ = '任务已完成' or null) as finished from t_rwfpb where create_time_ LIKE '${this.month}%') rw,
                (select count(id_) as report, count(zhuang_tai_ = '报告待审核' or null) as process, count(zhuang_tai_ = '报告待审批' or null) as approval from t_mjjcbg where create_time_ LIKE '${this.month}%') bg`
                
                curdPost('sql', sql).then(res => {
                    const data = res.variables.data
                    console.log(data)
                    
                    if ( data && data.length ) {
                        const { accepted, approval, jcFinish, jcTotal, process, report, rwFinish, task, today, wtTotal } = data[0]
                        this.middleCardData.taskData = [wtTotal, jcTotal, task, report]
                        let result = [
                            {
                                title: '委托',
                                children: [
                                    {
                                        label: '总数',
                                        value: wtTotal
                                    },
                                    {
                                        label: '受理',
                                        value: accepted
                                    },
                                    {
                                        label: '今日',
                                        value: today
                                    }
                                ]
                            },
                            {
                                title: '检测',
                                children: [
                                    {
                                        label: '总数',
                                        value: jcTotal
                                    },
                                    {
                                        label: '已完成',
                                        value: jcFinish
                                    },
                                    {
                                        label: '未完成',
                                        value: jcTotal - jcFinish
                                    }
                                ]
                            },
                            {
                                title: '任务发放',
                                children: [
                                    {
                                        label: '总数',
                                        value: task
                                    },
                                    {
                                        label: '已完成',
                                        value: rwFinish
                                    },
                                    {
                                        label: '未完成',
                                        value: task - rwFinish
                                    }
                                ]
                            },
                            {
                                title: '报告',
                                children: [
                                    {
                                        label: '总数',
                                        value: report
                                    },
                                    {
                                        label: '已完成',
                                        value: report - approval - process
                                    },
                                    {
                                        label: '待审批',
                                        value: approval
                                    },
                                    {
                                        label: '待审核',
                                        value: process
                                    }
                                ]
                            }
                        ]
                        
                        this.topBarData = result
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            // 获取中间图表数据
            getMiddleData() {
                // 获取检测数据
                const sql1 = `select tm.jian_ce_xiang_mu_, tm.jian_ce_lei_bie_, IFNULL(rw.qi_wang_wan_cheng, '') as qi_wang_wan_cheng, rw.zhuang_tai_, ipe.NAME_ from t_rwfpb rw, ibps_party_employee ipe, t_mjjcnlfw tm where rw.jian_ce_yuan_ = ipe.ID_ and rw.jian_ce_xiang_mu_ = tm.id_ and rw.create_time_ like '${this.month}%'`
                // 获取检测受理类型数据
                const sql2 = `select count(tm.jian_ce_lei_bie_ = '理化' or null) as lh, count(tm.jian_ce_lei_bie_ = '微生物' or null) as wsw, count(tm.jian_ce_lei_bie_ = '细胞活率' or null) as xbhl, count(tm.jian_ce_lei_bie_ = '残留检测' or null) as cljc, count(tm.jian_ce_lei_bie_ = '细胞鉴别' or null) as xbjb from t_jchzb tj, t_mjjcnlfw tm where tj.jian_ce_xiang_mu_ = tm.id_ and tj.create_time_ like '${this.month}%'`

                Promise.all([
                    curdPost('sql', sql1),
                    curdPost('sql', sql2)
                ]).then(([res1, res2]) => {
                    const data1 = res1.variables.data
                    const data2 = res2.variables.data
                    // console.log(data1, data2)

                    this.middleCardData.tableData.data = []
                    data1.forEach(item => {
                        this.middleCardData.tableData.data.push(Object.values(item))
                    })

                    this.middleCardData.acceptData = Object.values(data2[0])
                    this.middleCardData.flag = true
                }).catch(error => {
                    console.log(error)
                })
            },
            // 获取底部图表数据
            getBottomData() {
                // 获取检测委托受理情况数据
                const sql1 = `select tm.zhuang_tai_ as state, DATE_FORMAT(tm.create_time_, '%Y-%m-%d %H:%i:%s') as time from t_mjwtsqb tm where tm.create_time_ like '${this.year}%'`
                // 获取检测月度年度任务完成情况数据
                const sql2 = `select rw.zhuang_tai_ as state, DATE_FORMAT(rw.create_time_, '%Y-%m-%d %H:%i:%s') as time from t_rwfpb rw where rw.create_time_ like '${this.year}%'`
                // 获取已委托样品数量
                const sql3 = `select count(yp.id_) as unReceive from t_mjypb yp, t_mjwtsqb wt where yp.wai_jian_ = wt.id_ and yp.create_time_ like '${this.month}%'`
                // 获取样品 收样/留样/不合格数量
                const sql4 = `select count(id_) as receive, count(shi_fou_liu_yang_ = '是' or null) as keep, count(yan_shou_zhuang_t = '残缺' or null) as incomplete from t_mjypdjb where create_time_ like '${this.month}%'`
                Promise.all([
                    curdPost('sql', sql1),
                    curdPost('sql', sql2),
                    curdPost('sql', sql3),
                    curdPost('sql', sql4),
                ]).then(([ res1, res2, res3, res4]) => {
                    const data1 = res1.variables.data
                    const data2 = res2.variables.data
                    const data3 = res3.variables.data
                    const data4 = res4.variables.data
                    // console.log(data1, data2, data3, data4)

                    let trust = new Array(12).fill(0)
                    let accepted = new Array(12).fill(0)
                    let task = new Array(12).fill(0)
                    let complete = new Array(12).fill(0)
                    data1.forEach(item => {
                        const index = parseInt(item.time.slice(5,7)) - 1
                        if (item.state === '委托结束') {
                            accepted[index]++
                        }
                        trust[index]++
                    })
                    data2.forEach(item => {
                        const index = parseInt(item.time.slice(5,7)) - 1
                        if (item.state === '任务已完成') {
                            complete[index]++
                        }
                        task[index]++
                    })
                    let taskCount = task.reduce((pre, cur) => pre + cur)
                    let completeCount = complete.reduce((pre, cur) => pre + cur)
                    let year = [
                        {
                            name: '未完成',
                            value: taskCount - completeCount
                        },
                        {
                            name: '已完成',
                            value: completeCount
                        }
                    ]
                    let sample = [data3[0].unReceive - data4[0].receive, data4[0].receive, data4[0].incomplete, data4[0].keep]
                    this.bottomCardData.trust = trust
                    this.bottomCardData.accepted = accepted
                    this.bottomCardData.task = task
                    this.bottomCardData.complete = complete
                    this.bottomCardData.year = year
                    this.bottomCardData.sample = sample
                    this.bottomCardData.flag = true

                    // console.log(this.bottomCardData)
                }).catch(error => {
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
