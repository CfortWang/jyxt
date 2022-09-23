import request from '@/utils/request'
const FANGFACHAXING_URL = '/business/v3'

/**
 * 查询列表数据
 * @param {*} params
 */
export function queryPageList(data) {
  return request({
    url: FANGFACHAXING_URL + '/fangFaChaXing/query',
    method: 'post',
    data: data
  })
}
/**
 * 删除数据
 * @param {*} params
 */
export function remove(params) {
  return request({
    url: FANGFACHAXING_URL + '/fangFaChaXing/remove',
    method: 'post',
    params: params
  })
}
/**
 * 保存数据
 * @param {*} params
 */
export function save(params) {
  return request({
    url: FANGFACHAXING_URL + '/fangFaChaXing/save',
    method: 'post',
    data: params
  })
}

/**
 * 获取数据
 * @param {*} params
 */
export function get(params) {
  return request({
    url: FANGFACHAXING_URL + '/fangFaChaXing/get',
    method: 'get',
    params: params
  })
}