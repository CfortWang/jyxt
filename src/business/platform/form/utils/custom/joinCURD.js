import request from '@/utils/request'
import md5 from 'js-md5';
import { processCreate, processEdit } from './process'
import { requestType, requestPath } from './requestType'

// export function Update (name, where, cond) {
//     let cont = {}
//     cont['tableName'] = name
//     cont['paramWhere'] = where
//     cont['paramCond'] = cond
//     return post('update', JSON.stringify(cont))
// }

const post = (method, data) => {
    let path = requestType[method]
    let requestData = ''
    // 部分接口保留参数，用于后续接口传参
    let retainData = null

    const process = {
        createProcess: processCreate,
        setProcess: processEdit
    }
    let isProcess = Object.keys(process).includes(method)

    if (typeof data == "object" && !isProcess) {
        data = JSON.stringify(data)
    }

    // 原有逻辑,根据 data 值判断
    // if (data && data.slice(2, 1) == "l") {
    //     // 往主管表提交数据
    //     data = '{"str":"' + data + '"}'
    //     requestData = dealData(data)
    // } else if (data && data.slice(0, 1) == "s") {
    //     // 判断是{}的参数，还是纯sql字符串的参数 , 纯sql补全。
    //     data = '{"sql":"' + data + '"}'
    //     requestData = dealData(data)
    // } else { //对象转字符串
    //     requestData = dealData(data)
    // }

    // 改为根据 method 判断是否对数据做特殊处理
    if (method === 'str' && data) {
        // 往主管表提交数据
        data = '{"str":"' + data + '"}'
        requestData = dealData(data)
    } else if (method === 'sql' && data) {
        // sql 类型参数补全
        data = '{"sql":"' + data + '"}'
        requestData = dealData(data)
    } else if (isProcess) {
        // 创建流程及编辑流程时数据特殊处理
        requestData = process[method](data)
        retainData = requestData.customParams
        console.log(requestData)
    } else { //对象转字符串
        requestData = dealData(data)
    }

    

    let isSpecial = Object.keys(requestPath).includes(method)
    let requestUrl = isSpecial ? requestPath[method] : `business/v3/sys/universal/${ path }`
    return request({
        url: requestUrl,
        method: 'post',
        data: requestData,
        retainData
    })
}

/* 直接传入sql的签名算法   MD5加密*/
const sig = sql => {
    let rul = (sql.length + 9) * 12 * 3 + 168
    let salt = 'JinYuanXinTong'
    return md5(rul + '' + salt)
}

const dealData = data => {
    //加密，获取md5密文
    let md5 = sig(data)
    // 结果拼接
    return `${data.slice(0, 1)}"sig":"${md5}",${data.slice(1)}`
}

export default post
