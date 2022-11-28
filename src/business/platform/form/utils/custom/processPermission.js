// 流程权限数据

let hideList = [
    {
        "name": "id",
        "code": "jchzb",
        "field_type": "hidden",
        "label": "主键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "jianCeZhuangTai",
        "code": "jchzb",
        "field_type": "hidden",
        "label": "检测状态",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "weiTuoZhanShiBiao",
        "code": "jchzb",
        "field_type": "hidden",
        "label": "委托展示表外键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "beiYongZiDuana",
        "code": "jchzb",
        "field_type": "hidden",
        "label": "检测项目类别",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "shiFouGuoShen",
        "code": "jchzb",
        "field_type": "hidden",
        "label": "是否过审",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "heTongId",
        "code": "jchzb",
        "field_type": "hidden",
        "label": "合同id",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "shenQingDanId",
        "code": "jchzb",
        "field_type": "hidden",
        "label": "申请单id",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    }
]

let readList1 = [
    {
        "name": "jianCeXiangMu",
        "code": "jchzb",
        "field_type": "customDialog",
        "label": "检测项目　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "jianCeYuan",
        "code": "jchzb",
        "field_type": "selector",
        "label": "检测员　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "fuHeYuan",
        "code": "jchzb",
        "field_type": "selector",
        "label": "复核员　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "yangPinBianHao",
        "code": "jchzb",
        "field_type": "text",
        "label": "样品编号　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "yangPinMingCheng",
        "code": "jchzb",
        "field_type": "text",
        "label": "样品名称",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiFouFenBao",
        "code": "jchzb",
        "field_type": "text",
        "label": "是否分包",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    }
]

let readList2 = [
    {
        "name": "shiYanShiMi",
        "code": "jchzb",
        "field_type": "text",
        "label": "实验室名称",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "jianCeShiJian",
        "code": "jchzb",
        "field_type": "datePicker",
        "label": "检测时间",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "alert_02qsqny",
        "code": "jchzb",
        "field_type": "alert",
        "label": "设备信息",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "alert_1pyrohj",
        "code": "jchzb",
        "field_type": "alert",
        "label": "耗材试剂",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "alert_0928b96",
        "code": "jchzb",
        "field_type": "alert",
        "label": "操作步骤",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "alert_1r399of",
        "code": "jchzb",
        "field_type": "alert",
        "label": "检测结果",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "jianCeYiJu",
        "code": "jchzb",
        "field_type": "text",
        "label": "检测依据",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "canKaoBiaoZhun",
        "code": "jchzb",
        "field_type": "text",
        "label": "参考标准",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "detection",
        "code": "jchzb",
        "field_type": "attachment",
        "label": "查阅方法",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "sop",
        "code": "jchzb",
        "field_type": "attachment",
        "label": "查阅sop",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    }
]

const fieldList1 = [
    ...hideList,
    {
        "name": "baoGaoWanChengShi",
        "code": "jchzb",
        "field_type": "text",
        "label": "报告完成时间",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "grid_1w6qsm0",
        "code": "jchzb",
        "field_type": "grid",
        "label": "栅格布局",
        "show": [{ "type": "all" }]
    },
    {
        "name": "shiYanShiMi",
        "code": "jchzb",
        "field_type": "text",
        "label": "实验室名称",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "jianCeShiJian",
        "code": "jchzb",
        "field_type": "datePicker",
        "label": "检测时间",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    ...readList1
]

const fieldList2 = [
    ...hideList,
    {
        "name": "yuBaoGaoChaXunZhi",
        "code": "jchzb",
        "field_type": "hidden",
        "label": "预报告查询之前外键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "grid_1w6qsm0",
        "code": "jchzb",
        "field_type": "grid",
        "label": "栅格布局",
        "show": [{ "type": "all" }]
    },
    {
        "name": "grid_17caoqt",
        "code": "jchzb",
        "field_type": "grid",
        "label": "栅格布局",
        "show": [{ "type": "all" }]
    },
    ...readList1,
    ...readList2,
    {
        "name": "fuJian",
        "code": "jchzb",
        "field_type": "attachment",
        "label": "操作附件",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "jieGuoFuJian",
        "code": "jchzb",
        "field_type": "attachment",
        "label": "结果附件",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "grid_1acxudy",
        "code": "jchzb",
        "field_type": "grid",
        "label": "栅格布局",
        "show": [{ "type": "all" }]
    },
    {
        "name": "jieGuoPanDing",
        "code": "jchzb",
        "field_type": "radio",
        "label": "结论　　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "panDuanBiaoZhun",
        "code": "jchzb",
        "field_type": "text",
        "label": "其他",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    }
]

const fieldList3 = [
    ...hideList,
    {
        "name": "yuBaoGaoChaXunZhi",
        "code": "jchzb",
        "field_type": "hidden",
        "label": "预报告查询之前外键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "grid_1w6qsm0",
        "code": "jchzb",
        "field_type": "grid",
        "label": "栅格布局",
        "show": [{ "type": "all" }]
    },
    {
        "name": "grid_17caoqt",
        "code": "jchzb",
        "field_type": "grid",
        "label": "栅格布局",
        "show": [{ "type": "all" }]
    },
    {
        "name": "fuJian",
        "code": "jchzb",
        "field_type": "attachment",
        "label": "上传附件",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "grid_1acxudy",
        "code": "jchzb",
        "field_type": "grid",
        "label": "栅格布局",
        "show": [{ "type": "all" }]
    },
    {
        "name": "alert_17kbvfy",
        "code": "jchzb",
        "field_type": "alert",
        "label": "生成附件文件",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "grid_16enqxy",
        "code": "jchzb",
        "field_type": "grid",
        "label": "栅格布局",
        "show": [{ "type": "all" }]
    },
    {
        "name": "hyperlink_0up9u6q",
        "code": "jchzb",
        "field_type": "hyperlink",
        "label": "链接",
        "show": [{ "type": "all" }]
    },
    ...readList1,
    ...readList2,
    {
        "name": "baoGaoWanChengShi",
        "code": "jchzb",
        "field_type": "text",
        "label": "复核时间",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "jieGuoPanDing",
        "code": "jchzb",
        "field_type": "radio",
        "label": "结论　　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "panDuanBiaoZhun",
        "code": "jchzb",
        "field_type": "text",
        "label": "其他",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "tiJiaoKuaiZhaoKai",
        "code": "jchzb",
        "field_type": "switch",
        "label": "提交快照开关",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "kuaiZhaoKaiGuan",
        "code": "jchzb",
        "field_type": "switch",
        "label": "驳回快照开关",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "tiJiaoKuaiZhao",
        "code": "jchzb",
        "field_type": "attachment",
        "label": "提交快照",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "boHuiKuaiZhao",
        "code": "jchzb",
        "field_type": "attachment",
        "label": "驳回快照",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    }
]

const opinion1 = [
    {
        "name": "approval_opinion_1ifs4mo",
        "label": "环境监控",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "approval_opinion_1dm76ow",
        "label": "数据输入",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "approval_opinion_0nphdzy",
        "label": "数据校验",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    }
]

const opinion2 = [
    {
        "name": "approval_opinion_1ifs4mo",
        "label": "环境监控",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "approval_opinion_1dm76ow",
        "label": "数据输入",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "approval_opinion_0nphdzy",
        "label": "数据校验",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    }
]

const opinion3 = [
    {
        "name": "approval_opinion_1ifs4mo",
        "label": "环境监控",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "approval_opinion_1dm76ow",
        "label": "数据输入",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "approval_opinion_0nphdzy",
        "label": "数据校验",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    }
]

const subfield1 = [
    {
        "name": "id",
        "code": "jchjb",
        "field_type": "hidden",
        "label": "主键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "parentId",
        "code": "jchjb",
        "field_type": "hidden",
        "label": "外键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "grid_0fp2voy",
        "code": "jchjb",
        "field_type": "grid",
        "label": "栅格布局",
        "show": [{ "type": "all" }]
    },
    {
        "name": "beiZhu",
        "code": "jchjb",
        "field_type": "textarea",
        "label": "备注　　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "xiangMu",
        "code": "jchjb",
        "field_type": "customDialog",
        "label": "项目名称",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "huanJingYaoQiu",
        "code": "jchjb",
        "field_type": "text",
        "label": "环境要求",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "jiLuRen",
        "code": "jchjb",
        "field_type": "selector",
        "label": "记录人　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "jiLuWeiZhi",
        "code": "jchjb",
        "field_type": "text",
        "label": "记录位置",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "wenDu",
        "code": "jchjb",
        "field_type": "text",
        "label": "温度　　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "jiLuRiQi",
        "code": "jchjb",
        "field_type": "datePicker",
        "label": "记录日期",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "qiYa",
        "code": "jchjb",
        "field_type": "text",
        "label": "负压　　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiDu",
        "code": "jchjb",
        "field_type": "text",
        "label": "湿度　　",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    }
]

const subfield21 = [
    {
        "name": "sheBeiBianHao",
        "code": "jcsysbb",
        "field_type": "customDialog",
        "label": "设备编号",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "sheBeiMingCheng",
        "code": "jcsysbb",
        "field_type": "text",
        "label": "设备名称",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "xiaoZhunYouXiaoQi",
        "code": "jcsysbb",
        "field_type": "datePicker",
        "label": "校准有效期",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "zhuangTai",
        "code": "jcsysbb",
        "field_type": "text",
        "label": "使用情况",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "beiZhu",
        "code": "jcsysbb",
        "field_type": "text",
        "label": "备注",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiYongQiZhiShiJi",
        "code": "jcsysbb",
        "field_type": "datePicker",
        "label": "使用时间",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiYongRen",
        "code": "jcsysbb",
        "field_type": "selector",
        "label": "使用人",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "waiJian",
        "code": "jcsysbb",
        "field_type": "hidden",
        "label": "外键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "id",
        "code": "jcsysbb",
        "field_type": "hidden",
        "label": "主键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    }
]

const subfield22 = [
    {
        "name": "mingCheng",
        "code": "mjsjhcb",
        "field_type": "customDialog",
        "label": "名称",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "bianHao",
        "code": "mjsjhcb",
        "field_type": "text",
        "label": "编号",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "ruKuPiHao",
        "code": "mjsjhcb",
        "field_type": "text",
        "label": "入库批号",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "youXiaoQiZhi",
        "code": "mjsjhcb",
        "field_type": "datePicker",
        "label": "有效期至",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiYongShiJian",
        "code": "mjsjhcb",
        "field_type": "datePicker",
        "label": "使用时间",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiYongRen",
        "code": "mjsjhcb",
        "field_type": "selector",
        "label": "使用人",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "all" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "parentId",
        "code": "mjsjhcb",
        "field_type": "hidden",
        "label": "外键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "id",
        "code": "mjsjhcb",
        "field_type": "hidden",
        "label": "主键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    }
]

const subfield31 = [
    {
        "name": "sheBeiBianHao",
        "code": "jcsysbb",
        "field_type": "customDialog",
        "label": "设备编号",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "sheBeiMingCheng",
        "code": "jcsysbb",
        "field_type": "text",
        "label": "设备名称",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "xiaoZhunYouXiaoQi",
        "code": "jcsysbb",
        "field_type": "datePicker",
        "label": "校准有效期",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "zhuangTai",
        "code": "jcsysbb",
        "field_type": "text",
        "label": "使用情况",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "beiZhu",
        "code": "jcsysbb",
        "field_type": "text",
        "label": "备注",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiYongQiZhiShiJi",
        "code": "jcsysbb",
        "field_type": "datePicker",
        "label": "使用时间",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiYongRen",
        "code": "jcsysbb",
        "field_type": "selector",
        "label": "使用人",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "waiJian",
        "code": "jcsysbb",
        "field_type": "hidden",
        "label": "外键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "id",
        "code": "jcsysbb",
        "field_type": "hidden",
        "label": "主键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    }
]

const subfield32 = [
    {
        "name": "mingCheng",
        "code": "mjsjhcb",
        "field_type": "customDialog",
        "label": "名称",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "bianHao",
        "code": "mjsjhcb",
        "field_type": "text",
        "label": "编号",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "ruKuPiHao",
        "code": "mjsjhcb",
        "field_type": "text",
        "label": "入库批号",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "youXiaoQiZhi",
        "code": "mjsjhcb",
        "field_type": "datePicker",
        "label": "有效期至",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiYongShiJian",
        "code": "mjsjhcb",
        "field_type": "datePicker",
        "label": "使用时间",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "shiYongRen",
        "code": "mjsjhcb",
        "field_type": "selector",
        "label": "使用人",
        "read": [{ "type": "all" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "none" }]
    },
    {
        "name": "parentId",
        "code": "mjsjhcb",
        "field_type": "hidden",
        "label": "外键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    },
    {
        "name": "id",
        "code": "mjsjhcb",
        "field_type": "hidden",
        "label": "主键",
        "read": [{ "type": "none" }],
        "edit": [{ "type": "none" }],
        "required": [{ "type": "none" }],
        "hide": [{ "type": "all" }]
    }
]

export const processPermission = [
    {
        "formKey": "",
        "flowKey": "",
        "nodeId": "",
        "parentflowKey": null,
        "isInst": false,
        "rightsScope": "node",
        "permission": {
            "field": fieldList1,
            "subfield": subfield1,
            "table": [
                {
                    "code": "jchjb",
                    "name": "jchjb",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "all" }]
                }
            ],
            "button": [],
            "opinion": opinion1
        },
        "permissionLabel": {
            "table": [
                {
                    "label": "环境监控（通用检测）",
                    "name": "jchzb",
                    "isMain": "Y",
                    "fields": fieldList1
                },
                {
                    "label": "",
                    "name": "jchjb",
                    "isMain": "N",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "all" }],
                    "buttons": [],
                    "fields": subfield1
                }
            ],
            "opinion": opinion1
        }
    },
    {
        "formKey": "",
        "flowKey": "",
        "nodeId": "",
        "parentflowKey": null,
        "isInst": false,
        "rightsScope": "node",
        "permission": {
            "field": fieldList2,
            "subfield": [
                ...subfield21,
                ...subfield22
            ],
            "table": [
                {
                    "code": "jcsysbb",
                    "name": "jcsysbb",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "all" }]
                },
                {
                    "code": "mjsjhcb",
                    "name": "mjsjhcb",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "all" }]
                }
            ],
            "button": [
                {
                    "type": "add",
                    "name": "add",
                    "label": "添加",
                    "show": [{ "type": "all" }],
                    "code": "jcsysbb"
                },
                {
                    "type": "remove",
                    "name": "remove",
                    "label": "删除",
                    "show": [{ "type": "all" }],
                    "code": "jcsysbb"
                },
                {
                    "type": "add",
                    "name": "add",
                    "label": "添加",
                    "show": [{ "type": "all" }],
                    "code": "mjsjhcb"
                },
                {
                    "type": "remove",
                    "name": "remove",
                    "label": "删除",
                    "show": [{ "type": "all" }],
                    "code": "mjsjhcb"
                }
            ],
            "opinion": opinion2
        },
        "permissionLabel": {
            "table": [
                {
                    "label": "数据输入（通用检测）",
                    "name": "jchzb",
                    "isMain": "Y",
                    "fields": fieldList2
                },
                {
                    "label": "",
                    "name": "jcsysbb",
                    "isMain": "N",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "all" }],
                    "buttons": [
                        {
                            "type": "add",
                            "name": "add",
                            "label": "添加",
                            "show": [{ "type": "all" }]
                        },
                        {
                            "type": "remove",
                            "name": "remove",
                            "label": "删除",
                            "show": [{ "type": "all" }]
                        }
                    ],
                    "fields": subfield21
                },
                {
                    "label": "",
                    "name": "mjsjhcb",
                    "isMain": "N",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "all" }],
                    "buttons": [
                        {
                            "type": "add",
                            "name": "add",
                            "label": "添加",
                            "show": [{ "type": "all" }]
                        },
                        {
                            "type": "remove",
                            "name": "remove",
                            "label": "删除",
                            "show": [{ "type": "all" }]
                        }
                    ],
                    "fields": subfield22
                }
            ],
            "opinion": opinion2
        }
    },
    {
        "formKey": "",
        "flowKey": "",
        "nodeId": "",
        "parentflowKey": null,
        "isInst": false,
        "rightsScope": "node",
        "permission": {
            "field": fieldList3,
            "subfield": [
                ...subfield31,
                ...subfield32
            ],
            "table": [
                {
                    "code": "jcsysbb",
                    "name": "jcsysbb",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "none" }]
                },
                {
                    "code": "mjsjhcb",
                    "name": "mjsjhcb",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "none" }]
                }
            ],
            "button": [
                {
                    "type": "add",
                    "name": "add",
                    "label": "添加",
                    "show": [{ "type": "none" }],
                    "code": "jcsysbb"
                },
                {
                    "type": "remove",
                    "name": "remove",
                    "label": "删除",
                    "show": [{ "type": "none" }],
                    "code": "jcsysbb"
                },
                {
                    "type": "add",
                    "name": "add",
                    "label": "添加",
                    "show": [{ "type": "none" }],
                    "code": "mjsjhcb"
                },
                {
                    "type": "remove",
                    "name": "remove",
                    "label": "删除",
                    "show": [{ "type": "none" }],
                    "code": "mjsjhcb"
                }
            ],
            "opinion": opinion3
        },
        "permissionLabel": {
            "table": [
                {
                    "label": "数据校验（通用检测）",
                    "name": "jchzb",
                    "isMain": "Y",
                    "fields": fieldList3
                },
                {
                    "label": "",
                    "name": "jcsysbb",
                    "isMain": "N",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "none" }],
                    "buttons": [
                        {
                            "type": "add",
                            "name": "add",
                            "label": "添加",
                            "show": [{ "type": "none" }]
                        },
                        {
                            "type": "remove",
                            "name": "remove",
                            "label": "删除",
                            "show": [{ "type": "none" }]
                        }
                    ],
                    "fields": subfield31
                },
                {
                    "label": "",
                    "name": "mjsjhcb",
                    "isMain": "N",
                    "read": [{ "type": "all" }],
                    "edit": [{ "type": "none" }],
                    "buttons": [
                        {
                            "type": "add",
                            "name": "add",
                            "label": "添加",
                            "show": [{ "type": "none" }]
                        },
                        {
                            "type": "remove",
                            "name": "remove",
                            "label": "删除",
                            "show": [{ "type": "none" }]
                        }
                    ],
                    "fields": subfield32
                }
            ],
            "opinion": opinion3
        }
    }
]

