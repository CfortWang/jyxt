export const lineOption = {
    // 图表标题
    title: {
        show: true,
        text: '未来12个月的项目投标时间分布预测',
        textStyle: {
            color: '#535353',
            fontSize: 14,
            fontWeight: '600'
        },
        textAlign: 'center',
        left: '50%'
    },
    xAxis: {
        type: 'category',
        data: [],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            rotate: 45
        },
        axisLine: {
            lineStyle: {
                color: '#535353'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '预计投标量',
        nameTextStyle: {
            color: '#535353',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#535353'
            }
        }
    },
    series: [
        {
            name: '预计投标数',
            data: [],
            type: 'line',
            smooth: true,
            lineStyle: {
                color: '#1890ff'
            },
            itemStyle: {
                color: '#1890ff'
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(58,134,255,1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(58,134,255,0)'
                            }
                        ],
                        globalCoord: false
                    }
                }
            }
        }
    ],
    tooltip: {
        show: true,
        trigger: 'axis',
        // triggerOn: 'click'
        axisPointer: {
            type: 'none'
        }
        // formatter: '预计投标数<br />{b}：{c}'
    }
}

export const pieOption = {
    // 图表标题
    title: {
        show: true,
        text: '今年截止至9月份项目投标结果分布',
        textStyle: {
            color: '#535353',
            fontSize: 14,
            fontWeight: '600'
        },
        textAlign: 'center',
        left: '50%'
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
                name: '未入围',
                textStyle: {
                    color: '#ffd700'
                }
            },
            {
                name: '未中标',
                textStyle: {
                    color: '#ff6347'
                }
            },
            {
                name: '重新招标',
                textStyle: {
                    color: '#69f'
                }
            },
            {
                name: '放弃投标',
                textStyle: {
                    color: '#33ffff'
                }
            },
            {
                name: '已中标',
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
    color: ['#ffd700', '#ff6347', '#69f', '#33ffff', '#3f3'],
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: '投标结果<br/>{b}：{c}<br/>占比：{d}%'
    }
}

export const barOption = {
    // 图表标题
    title: {
        show: true,
        text: '',
        textStyle: {
            color: '#535353',
            fontSize: 14,
            fontWeight: '600'
        },
        textAlign: 'center',
        left: '50%'
    },
    xAxis: {
        type: 'category',
        data: [],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            rotate: 45
        },
        axisLine: {
            lineStyle: {
                color: '#535353'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '投标量',
        nameTextStyle: {
            color: '#535353',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#535353'
            }
        }
    },
    series: [{
        type: 'bar',
        name: '当月投标数',
        data: [],
        barMaxWidth: '35px',
        itemStyle: {
            color: '#3a86ff'
        }
    }],
    tooltip: {
        show: true,
        trigger: 'item'
    }
}