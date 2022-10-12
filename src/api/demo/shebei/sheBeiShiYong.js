import request from '@/utils/request'
const SHEBEISHIYONG_URL = '/business/v3'

/**
 * 查询列表数据
 * @param {*} params
 */
export function queryPageList(data) {
  return request({
    url: SHEBEISHIYONG_URL + '/sheBeiShiYong/query',
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
    url: SHEBEISHIYONG_URL + '/sheBeiShiYong/remove',
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
    url: SHEBEISHIYONG_URL + '/sheBeiShiYong/save',
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
    url: SHEBEISHIYONG_URL + '/sheBeiShiYong/get',
    method: 'get',
    params: params
  })
}