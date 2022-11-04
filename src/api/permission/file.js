import request from '@/utils/request'
/**
 * 查询-根据用户id,获取文件信息
 * @param {*} params
 * {
  "deptName": "string",
  "fileCode": "string",
  "fileName": "string",
  "fileType": "string",
  "userId": "string"
}
 */
export function getFileByUserId(params) {
    return request({
        url: 'http://192.168.2.247:5100/ibps/business/v3/consult/getFileByUserId',
        method: 'post',
        data: params
    })
}
/**
 * 查询-获取文档类型
 * @param {*} params
 * 
 */
export function getFileType(params) {
    return request({
        url: 'http://192.168.2.247:5100/ibps/business/v3/consult/getFileType',
        method: 'post',
        data: params
    })
}
/**
 * 查询-指定人员未授权的受限文件
 * @param {*} params
 * userId
 */
export function getLmitedFile(params) {
    return request({
        url: 'http://192.168.2.247:5100/ibps/business/v3/consult/getLmitedFile',
        method: 'post',
        data: params
    })
}

/**
 * 查询-指定人员已授权的受限文件
 * @param {*} params
 * userId
 */
export function getUserByFile(params) {
    return request({
        url: 'http://192.168.2.247:5100/ibps/business/v3/consult/getUserByFile',
        method: 'post',
        data: params
    })
}

/**
 * 保存-用户的文档权限
 * @param {*} params
 *  fileData = []
 */
export function saveUserByFile(params) {
    return request({
        url: 'http://192.168.2.247:5100/ibps/business/v3/consult/saveUserByFile',
        method: 'post',
        data: params
    })
}

