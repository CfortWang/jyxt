<template>
    <div>
        <div class="jbd-title-cont"> 检测人员任务统计 </div>
        <div class="contain">
            <div class="date">
                统计时间:
                <el-date-picker v-model="monthValues" type="monthrange" align="right" unlink-panels range-separator="至"
                    start-placeholder="开始月份" end-placeholder="结束月份" :picker-options="pickerOptions"
                    @change="changeDate">
                </el-date-picker>
            </div>
            <div class="chart">
                <div id="echart-line" :style="{ width: '100%', height: '100%', paddingRight: '10px' }"></div>
            </div>

        </div>

        <el-dialog :visible.sync="dialogTableVisible">
            <div class="dialogbox">
                <div class="jbd-title-cont"> {{ setParams.seriesName }}-{{ setParams.name }} </div>
                <div class="ibps">
                    <ibps-crud key="istree" ref="crud" :data="formDataFiiter" :toolbars="listConfig.toolbars"
                        :search-form="listConfig.searchForm" :pk-key="pkKey" :columns="listConfig.columns"
                        :loading="loading" @action-event="handleAction" :pagination="pagination"
                        @pagination-change="handlePaginationChange">
                        <template slot="jianceyuan"  slot-scope="scope">
                            <ibps-user-selector :value="scope.row.jian_ce_yuan_" type="user" :multiple="true"
                                :disabled="true" readonly-text="text" @callback="data => formId = data.id" />
                        </template>
                        <template slot="fuheyuan"  slot-scope="scope">
                            <ibps-user-selector :value="scope.row.fu_he_yuan_" type="user" :multiple="true"
                                :disabled="true" readonly-text="text" @callback="data => formId = data.id" />
                        </template>
                    </ibps-crud>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import IbpsUserSelector from '@/business/platform/org/selector'
import ActionUtils from '@/utils/action'
export default {
    components: {
        'ibps-user-selector': IbpsUserSelector
    },
    props: {},
    data() {
        return {
            pkKey: 'id', // 主键  如果主键不是pk需要传主键
            pickerOptions: {
                shortcuts: [{
                    text: '本月',
                    onClick(picker) {
                        const start = new Date();
                        start.setDate(1);
                        picker.$emit('pick', [start, new Date()]);
                    }
                }, {
                    text: '今年至今',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date(new Date().getFullYear(), 0);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近六个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setMonth(start.getMonth() - 6);
                        start.setDate(1);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            monthValues: [],
            dialogTableVisible: false,
            getchart: null,
            option: {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: '5',
                    top: 'top'
                },
                grid: {
                    left: '2%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    name: '任务数量(项)',
                    axisLabel: {
                        formatter: function (v) {
                            return parseInt(v)//表示整数。其他数值类型以此类推
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    name: '检测人员',
                    data: []
                },
                series: [
                    {
                        name: '检测未完成数',
                        type: 'bar',
                        data: [],
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        }
                    },
                    {
                        name: '检测已完成数',
                        type: 'bar',
                        data: [],
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        }
                    },
                    {
                        name: '复核未完成数',
                        type: 'bar',
                        data: [],
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        }
                    },
                    {
                        name: '复核已完成数',
                        type: 'bar',
                        data: [],
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        }
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: 0,
                        filterMode: 'filter'
                    },
                    {
                        type: 'inside',
                        left: 'left',
                        yAxisIndex: 0,
                        filterMode: 'none'
                    }
                ]
            },
            setParams: {},
            formData: [],
            formDataFiiter: [],
            listConfig: {
                // 工具栏
                toolbars: [
                    { key: 'search' }
                ],
                // 查询条件
                searchForm: {
                    forms: [
                        { prop: 'yang_pin_bian_hao', label: '样品编号' },
                        { prop: 'yang_pin_ming_che', label: '样品名称' },
                        { prop: 'jian_ce_shi_jian_', label: '检测时间' },
                        { prop: 'shi_yan_shi_ming', label: '实验室名' },
                    ]
                },
                // 表格字段配置
                columns: [
                    { prop: 'yang_pin_bian_hao', label: '样品编号' },
                    { prop: 'yang_pin_ming_che', label: '样品名称' },
                    { prop: 'jian_ce_shi_jian_', label: '检测时间' },
                    { prop: 'shi_yan_shi_ming', label: '实验室名' },
                    { prop: 'fu_jian_', label: '附件' },
                    { prop: 'jian_ce_yuan_', label: '检测员', slotName: "jianceyuan" },
                    { prop: 'fu_he_yuan_', label: '复核员', slotName: "fuheyuan" },
                    { prop: 'jie_guo_pan_ding_', label: '结果判定' },
                    { prop: 'jian_ce_zhuang_ta', label: '检测状态' }
                ]
            },
            startDate: '2022-1-1',
            endDate: '',
            chartData: [],
            pagination: { limit: 20, page: 1 },
            loading: false
        };
    },
    computed: {},
    methods: {
        initChart() {
            this.getchart = echarts.init(document.getElementById('echart-line'));
            document.getElementById('echart-line').setAttribute('_echarts_instance_', '');
            this.getchart.setOption(this.option, true);
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                this.getchart.resize();
            });
            this.getchart.on('click', (params) => {
                this.pagination = { limit: 20, page: 1 }
                this.dialogTableVisible = true
                this.setParams["dataIndex"] = params.dataIndex
                this.setParams["name"] = params.name
                switch (params.seriesName) {
                    case "检测未完成数":
                        this.setParams["seriesName"] = "未完成检测项目情况"
                        break;
                    case "检测已完成数":
                        this.setParams["seriesName"] = "已完成检测项目情况"
                        break;
                    case "复核未完成数":
                        this.setParams["seriesName"] = "未完成复核项目情况"
                        break;
                    case "复核已完成数":
                        this.setParams["seriesName"] = "已完成复核项目情况"
                        break;
                    default:
                        break;
                }
                this.formLoading()
            });
        },
        /**
        * 处理按钮事件
        */
        handleAction(command, position, selection, data) {
            switch (command) {
                case 'search':// 查询
                    console.log("搜索")
                    const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
                    console.log("params:", params)
                    this.formLoading()
                    break
                default:
                    break
            }
        },
        /**
     * 处理分页事件
     */
        handlePaginationChange(page) {
            this.pagination = page
            this.paginationFunc(this.formData)
        },
        // 图表数据加载
        chartLoading() {
            // 获取所有检测人员任务统计
            const sql = `select  *from (select ie.ID_ as jcId,ie.NAME_ as jcName,count(tj.jian_ce_zhuang_ta != '已完成' or null) as jianCeWeiWanCheng,count(tj.jian_ce_zhuang_ta = '已完成' or null) as jianCeYiWanCheng from 
                        t_jchzb tj,ibps_party_employee ie 
                        where tj.jian_ce_yuan_ = ie.ID_ and tj.update_time_ between '${this.startDate}' and '${this.endDate}' group by jian_ce_yuan_ 
                        ) jc  LEFT JOIN 
                        (
                        select ie.ID_ as fhId,ie.NAME_ as fhName,count(tj.jian_ce_zhuang_ta != '已完成' or null) as fuHeWeiWanCheng,count(tj.jian_ce_zhuang_ta = '已完成' or null) as fuHeYiWanCheng from 
                        t_jchzb tj,ibps_party_employee ie 
                        where tj.fu_he_yuan_ = ie.ID_ and tj.update_time_ between '${this.startDate}' and '${this.endDate}' group by fu_he_yuan_ 
                        ) fh on jc.jcName = fh.fhName
                        UNION (
                        select  *from (select ie.ID_ as jcId, ie.NAME_ as jcName,count(tj.jian_ce_zhuang_ta != '已完成' or null) as jianCeWeiWanCheng,count(tj.jian_ce_zhuang_ta = '已完成' or null) as jianCeYiWanCheng from 
                        t_jchzb tj,ibps_party_employee ie 
                        where tj.jian_ce_yuan_ = ie.ID_ and tj.update_time_ between '${this.startDate}' and '${this.endDate}' group by jian_ce_yuan_ 
                        ) jc  RIGHT JOIN 
                        (
                        select ie.ID_ as fhId,ie.NAME_ as fhName,count(tj.jian_ce_zhuang_ta != '已完成' or null) as fuHeWeiWanCheng,count(tj.jian_ce_zhuang_ta = '已完成' or null) as fuHeYiWanCheng from 
                        t_jchzb tj,ibps_party_employee ie 
                        where tj.fu_he_yuan_ = ie.ID_ and tj.update_time_ between '${this.startDate}' and '${this.endDate}' group by fu_he_yuan_ 
                        ) fh on jc.jcName = fh.fhName
                        )`
            this.option.yAxis.data = []
            this.option.series[0].data = []
            this.option.series[1].data = []
            this.option.series[2].data = []
            this.option.series[3].data = []
            this.chartData = []
            curdPost('sql', sql).then(res => {
                const data = res.variables.data
                for (let i of data) {
                    this.option.yAxis.data.push(i.jcName ? i.jcName : i.fhName)
                    // 检测未完成数
                    this.option.series[0].data.push(i.jianCeWeiWanCheng ? i.jianCeWeiWanCheng : 0)
                    // 检测已完成数
                    this.option.series[1].data.push(i.jianCeYiWanCheng ? i.jianCeYiWanCheng : 0)
                    // 复核未完成数
                    this.option.series[2].data.push(i.fuHeWeiWanCheng ? i.fuHeWeiWanCheng : 0)
                    // 复核已完成数
                    this.option.series[3].data.push(i.fuHeYiWanCheng ? i.fuHeYiWanCheng : 0)
                    this.chartData.push(i)
                }
                this.initChart()
            }).catch(error => {
                console.log(error)
            })
        },
        formLoading() {
            this.loading = true
            let formsql = `select jian_ce_zhuang_ta,fu_jian_,yang_pin_bian_hao,yang_pin_ming_che,shi_yan_shi_ming,
                        bao_gao_jian_ce_r,jie_guo_pan_ding_,jian_ce_yuan_,fu_he_yuan_,jian_ce_shi_jian_ FROM t_jchzb
                        where update_time_ BETWEEN '${this.startDate}' AND '${this.endDate}' and `
            let sql = ''

            const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
            // console.log("params:", params)

            switch (this.setParams.seriesName) {
                case "未完成检测项目情况":
                    sql = formsql + `jian_ce_zhuang_ta != '已完成' and jian_ce_yuan_='${this.chartData[this.setParams.dataIndex].jcId}'`
                    break;
                case "已完成检测项目情况":
                    sql = formsql + `jian_ce_zhuang_ta = '已完成' and jian_ce_yuan_='${this.chartData[this.setParams.dataIndex].jcId}'`
                    break;
                case "未完成复核项目情况":
                    sql = formsql + `jian_ce_zhuang_ta != '已完成' and fu_he_yuan_='${this.chartData[this.setParams.dataIndex].fhId}'`
                    break;
                case "已完成复核项目情况":
                    sql = formsql + `jian_ce_zhuang_ta = '已完成' and fu_he_yuan_='${this.chartData[this.setParams.dataIndex].fhId}'`
                    break;
                default:
                    break;
            }
            sql = sql + `${params.jian_ce_shi_jian_ ? ` and jian_ce_shi_jian_ like '%${params.jian_ce_shi_jian_}%'` : ``}`
            sql = sql + `${params.shi_yan_shi_ming ? ` and shi_yan_shi_ming like '%${params.shi_yan_shi_ming}%'` : ``}`
            sql = sql + `${params.yang_pin_bian_hao ? ` and yang_pin_bian_hao like '%${params.yang_pin_bian_hao}%'` : ``}`
            sql = sql + `${params.yang_pin_ming_che ? ` and yang_pin_ming_che like '%${params.yang_pin_ming_che}%'` : ``}`

            curdPost('sql', sql).then(res => {
                this.loading = false
                const data = res.variables.data
                this.formData = res.variables.data
                document.getElementsByClassName("el-pagination__rightwrapper")[0].style.display = "none";
                this.paginationFunc(res.variables.data)
            }).catch(error => {
                console.log(error)
                this.loading = false
            })
        },
        /**
         * 数据分页
         * par:[]
         * pagination: { limit: 20, page: 1 },
         */
        paginationFunc(par) {
            this.formDataFiiter = []
            for (var i = (this.pagination.limit * this.pagination.page - this.pagination.limit); i < (this.pagination.limit * this.pagination.page); i++) {
                if (i < this.formData.length) {
                    this.formDataFiiter.push(this.formData[i])
                }
            }
        },
        changeDate(value) {
            let year = value[1].getFullYear()
            let month = value[1].getMonth() + 1
            // 这里传入的是整数时间，返回的是下个月的第一天，因为月份是0-11
            let nextMonthFirthDay = new Date(year, month, 1) // 下个月的第一天
            let oneDay = 1000 * 60 * 60 * 24 // 一天的时间毫秒数
            let endDay = new Date(nextMonthFirthDay - oneDay)
            let day = endDay.getDate() // 本月最后一天
            this.endDate = value[1].getFullYear() + '-' + (value[1].getMonth() + 1) + '-' + day
            this.startDate = value[0].getFullYear() + '-' + (value[0].getMonth() + 1) + '-' + value[0].getDate()
            this.chartLoading()
        }
    },
    created() {
        const initendDate = new Date();
        this.endDate = initendDate.getFullYear() + '-' + (initendDate.getMonth() + 1) + '-' + initendDate.getDate()
        this.monthValues = [new Date(this.startDate), new Date(initendDate.getFullYear() + '-' + (initendDate.getMonth() + 1) + '-' + initendDate.getDate())]
        this.chartLoading()
    },
    mounted() {
        this.initChart()
    }
};
</script>
<style lang="less" scoped>
.contain {
    width: 100%;
    height: 800px;
    border-left: 1px solid #dfdcdc;
}

.date {
    text-align: right;
    padding-right: 20px;
}

.chart {
    width: 95%;
    height: 800px;
}

.jbd-title-cont {
    text-align: center;
    font-weight: bold;
    background-color: rgb(249, 255, 255);
    width: 100%;
    font-size: 18px;
}

.dialogbox {
    display: flex;
    flex-direction: column;
}

.ibps {
    top: 55px;
    border: 1px solid rgb(241, 238, 238);
}



/deep/ .el-dialog {
    height: 700px;
    width: 80%;
}

/deep/ .el-dialog__header {
    border: 0;
}

/deep/ .el-pagination__rightwrapper1 {
    display: none;
}

/deep/ .ibps-container-crud__header {
    margin-top: 55px;
}

/deep/ .el-dialog__headerbtn {
    z-index: 9999;
}
</style>