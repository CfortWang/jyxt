import echarts from "echarts"

export const acceptOption = {
    // 图表标题
    title: {
        show: true,
        text: '检测受理类型',
        textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '600'
        },
        textAlign: 'center',
        left: '50%',
        top: '20px'
    },
    xAxis: {
        type: 'category',
        data: ['理化', '微生物', '细胞活率', '残留检测', '细胞鉴别'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {

        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        // axisLabel: {
        //     inside: true,
        //     color: "#000",
        // },
        // axisTick: {
        //     show: true,
        // },
        // axisLine: {
        //     show: true,
        // },
        // z: 10
    },
    yAxis: {
        type: 'value',
        name: '',
        nameTextStyle: {
            color: '#fff',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    series: [{
        type: 'bar',
        name: '',
        data: [100, 200, 300, 400, 500],
        barMaxWidth: '35px',
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
            ])
        },
        emphasis: {
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#2378f7" },
                    { offset: 0.7, color: "#2378f7" },
                    { offset: 1, color: "#83bff6" },
                ])
            }
        }
    }],
    tooltip: {
        show: true,
        trigger: 'axis'
    }
}

export const taskOption = {
    // 图表标题
    title: {
        show: true,
        text: '检测任务情况',
        textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '600'
        },
        textAlign: 'center',
        left: '50%',
        top: '20px'
    },
    xAxis: {
        type: 'category',
        data: ['委托', '受理', '任务分配', '报告'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            // rotate: 25
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
    },
    yAxis: {
        type: 'value',
        name: '',
        nameTextStyle: {
            color: '#fff',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    series: [{
        type: 'bar',
        name: '',
        data: [25, 5, 2, 1],
        barMaxWidth: '35px',
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
            ])
        },
        emphasis: {
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#2378f7" },
                    { offset: 0.7, color: "#2378f7" },
                    { offset: 1, color: "#83bff6" },
                ])
            }
        }
    }],
    tooltip: {
        show: true,
        trigger: 'axis'
    }
}

export const trustOption = {
    // 图表标题
    title: {
        show: true,
        text: '检测任务情况',
        textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '600'
        },
        textAlign: 'center',
        left: '50%',
        top: '20px'
    },
    xAxis: {
        type: 'category',
        data: ['委托', '受理', '任务分配', '报告'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            // rotate: 25
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '',
        nameTextStyle: {
            color: '#fff',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    series: [{
        type: 'bar',
        name: '',
        data: [25, 5, 2, 1],
        barMaxWidth: '35px',
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
            ])
        },
        emphasis: {
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#2378f7" },
                    { offset: 0.7, color: "#2378f7" },
                    { offset: 1, color: "#83bff6" },
                ])
            }
        }
    }],
    tooltip: {
        show: true,
        trigger: 'axis'
    }
}

export const sampleOption = {
    // 图表标题
    title: {
        show: true,
        text: '样品受理情况',
        textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '600'
        },
        textAlign: 'center',
        left: '50%',
        top: '20px'
    },
    xAxis: {
        type: 'category',
        data: ['已委托未收样', '已收样', '已收不合格', '留样', '人员检测工作量'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            // rotate: 25
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '',
        nameTextStyle: {
            color: '#fff',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    series: [{
        type: 'bar',
        name: '',
        data: [25, 5, 2, 1],
        barMaxWidth: '35px',
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
            ])
        },
        emphasis: {
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#2378f7" },
                    { offset: 0.7, color: "#2378f7" },
                    { offset: 1, color: "#83bff6" },
                ])
            }
        }
    }],
    tooltip: {
        show: true,
        trigger: 'axis'
    }
}

export const monthOption = {
    // 图表标题
    title: {
        show: true,
        text: '检测月度完成量',
        textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '600'
        },
        textAlign: 'center',
        left: '50%',
        top: '20px'
    },
    xAxis: {
        type: 'category',
        data: ['委托', '受理', '任务分配', '报告'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            // rotate: 25
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        z: 10
    },
    yAxis: {
        type: 'value',
        name: '',
        nameTextStyle: {
            color: '#fff',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    series: [{
        type: 'bar',
        name: '',
        data: [25, 5, 2, 1],
        barMaxWidth: '35px',
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
            ])
        },
        emphasis: {
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#2378f7" },
                    { offset: 0.7, color: "#2378f7" },
                    { offset: 1, color: "#83bff6" },
                ])
            }
        }
    }],
    tooltip: {
        show: true,
        trigger: 'axis'
    }
}

export const yearOption = {
    // 图表标题
    title: {
        show: true,
        text: '检测年度完成量',
        textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '600'
        },
        textAlign: 'center',
        left: '50%',
        top: '20px'
    },
    legend: {
        orient: 'horizontal',
        show: true,
        left: 'center',
        bottom: '0%',
        z: 3,
        itemWidth: 25,
        itemHeight: 14,
        itemGap: 10,
        data: [
            {
                name: '未完成',
                textStyle: {
                    color: '#ff6347'
                }
            },
            {
                name: '已完成',
                textStyle: {
                    color: '#3f3'
                }
            }
        ]
    },
    series: [
        {
            name: '投标结果',
            type: 'pie',
            radius: '55%',
            center: ['50%', '45%'],
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                    label: {
                        show: false,
                        position: 'inner',
                        formatter: '{d}%'
                    },
                    labelLine: {
                        show: false
                    }
                }
            }
        }
    ],
    color: ['#ff6347', '#3f3'],
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: '任务情况<br/>{b}：{c}<br/>占比：{d}%'
    }
}