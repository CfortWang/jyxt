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
            style: {
                fill: '#fff'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        // formatter: function (params) {
        //     var newParamsName = ''
        //     var paramsNameNumber = params.length
        //     //一行显示几个字
        //     var provideNumber = 2
        //     var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
        //     if (paramsNameNumber > provideNumber) {
        //         for (var p = 0; p < rowNumber; p++) {
        //             var tempStr = ""
        //             var start = p * provideNumber
        //             var end = start + provideNumber
        //             if (p == rowNumber - 1) {
        //                 tempStr = params.substring(start, paramsNameNumber);
        //             } else {
        //                 tempStr = params.substring(start, end) + "\n"
        //             }
        //             newParamsName += tempStr
        //         }

        //     } else {
        //         newParamsName = params
        //     }
        //     return newParamsName
        // }
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
        data: [],
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
        data: ['委托', '任务分配', '检测', '报告'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            style: {
                fill: '#fff'
            }
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
        data: [],
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
    legend: {
        data: [
            {
                name: '委托',
                itemStyle: {
                    color: '#00baff'
                }
            },
            {
                name: '受理',
                itemStyle: {
                    color: '#f5d94e'
                }
            }
        ],
        textStyle: {
            color: '#fff',
        },
        bottom: 10
    },
    title: {
        show: true,
        text: '检测委托受理量',
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
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            style: {
                fill: '#fff'
            }
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
        axisLabel: {
            style: {
                fill: '#fff'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    series: [
        {
            type: 'bar',
            name: '委托',
            data: [],
            barMaxWidth: '35px',
            barStyle: {
                fill: 'rgba(0, 186, 255, 0.4)'
            },
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
        },
        {
            type: 'line',
            name: '受理',
            data: [],
            symbol: 'circle',
            symbolSize: 10,
            lineArea: {
                show: true,
                gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            },
            itemStyle: {
                color: '#f5d94e'
            }
        }
        
    ],
    tooltip: {
        show: true,
        trigger: 'axis'
    }
}

export const sampleOption = {
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
        data: ['已委托未收样1', '已收样', '已收不合格', '留样'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            style: {
                fill: '#fff'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        formatter: function (params) {
            var newParamsName = ''
            var paramsNameNumber = params.length
            //一行显示几个字
            var provideNumber = 2
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
            if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ''
                    var start = p * provideNumber
                    var end = start + provideNumber
                    if (p == rowNumber - 1) {
                        tempStr = params.substring(start, paramsNameNumber);
                    } else {
                        tempStr = params.substring(start, end) + "\n"
                    }
                    newParamsName += tempStr
                }

            } else {
                newParamsName = params
            }
            return newParamsName
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
        data: [],
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
    legend: {
        data: [
            {
                name: '任务总数',
                itemStyle: {
                    color: '#00baff'
                }
            },
            {
                name: '已完成',
                itemStyle: {
                    color: '#f5d94e'
                }
            }
        ],
        textStyle: {
            color: '#fff',
        },
        bottom: 10
    },
    title: {
        show: true,
        text: '检测任务月度完成量',
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
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            style: {
                fill: '#fff'
            }
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
        axisLabel: {
            style: {
                fill: '#fff'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    series: [
        {
            type: 'bar',
            name: '任务总数',
            data: [],
            barMaxWidth: '35px',
            barStyle: {
                fill: 'rgba(0, 186, 255, 0.4)'
            },
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
        },
        {
            type: 'line',
            name: '已完成',
            data: [],
            symbol: 'circle',
            symbolSize: 10,
            lineArea: {
                show: true,
                gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            },
            itemStyle: {
                color: '#f5d94e'
            }
        }
        
    ],
    tooltip: {
        show: true,
        trigger: 'axis'
    }
}

export const yearOption = {
    title: {
        show: true,
        text: '检测任务年度完成量',
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
        bottom: 10,
        z: 3,
        itemWidth: 25,
        itemHeight: 14,
        itemGap: 10,
        data: [
            {
                name: '未完成',
                textStyle: {
                    color: '#00baff'
                }
            },
            {
                name: '已完成',
                textStyle: {
                    color: '#f5d94e'
                }
            }
        ]
    },
    series: [
        {
            name: '任务完成情况',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                    label: {
                        show: true,
                        position: 'outer',
                        // formatter: '{d}%'
                        formatter: `占比：{d}%\n\n\r{b}:{c}`,
                        // formatter: `{b}:{c}\n\n\r占比：{d}%`,
                        fontSize: 12,
                        // padding: [0, 5]
                    },
                    labelLine: {
                        show: true
                    }
                }
            }
        }
    ],
    color: ['#00baff', '#f5d94e'],
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: '任务情况<br/>{b}：{c}<br/>占比：{d}%'
    }
}