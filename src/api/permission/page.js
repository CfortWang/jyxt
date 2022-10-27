import request from '@/utils/request'


/**
 * 查询-获取指定用户的所有页面及其权限信息
 * @param {*} params
 * string userId
 */
export function getAllIncludeUserStaticPage(params) {
    return request({
        url: 'http://192.168.2.247:5100/ibps/business/v3/static/getAllIncludeUserStaticPage',
        method: 'post',
        data: params
    })
}
/**
 * 查询-获取所有用户信息
 * @param {*} params
 * 
 */
export function getAllUserInfor(params) {
    return request({
        url: 'http://192.168.2.247:5100/ibps/business/v3/static/getAllUserInfor',
        method: 'post',
        data: params
    })
}
/**
 * 保存-用户权限的所有静态页面
 * @param {*} params
 * saveUserData = []
 */
export function saveStaticPage(params) {
    return request({
        url: 'http://192.168.2.247:5100/ibps/business/v3/static/saveStaticPage',
        method: 'post',
        data: params
    })
}