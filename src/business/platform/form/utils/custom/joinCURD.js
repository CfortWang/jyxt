import request from '@/utils/request'
import md5 from 'js-md5';
import { processData } from './process'
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

    if (typeof data == "object") {
        data = JSON.stringify(data)
    }

    if (data && data.slice(2, 1) == "l") {
        // 往主管表提交数据
        data = '{"str":"' + data + '"}'
        requestData = dealData(data)
    } else if (data && data.slice(0, 1) == "s") {
        // 判断是{}的参数，还是纯sql字符串的参数 , 纯sql补全。
        data = '{"sql":"' + data + '"}'
        requestData = dealData(data)
    } else if (method === 'process') { //对象转字符串
        requestData = processData
    } else { //对象转字符串
        requestData = dealData(data)
    }

    let isSpecial = ['notice', 'financial', 'process'].includes(method)
    let requestUrl = isSpecial ? requestPath[method] : `business/v3/sys/universal/${ path }`
    return request({
        url: requestUrl,
        method: 'post',
        data: requestData
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
