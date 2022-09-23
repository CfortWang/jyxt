import request from '@/utils/request'
const CAIGOUYANSHOU_URL = '/business/v3'

/**
 * 查询列表数据
 * @param {*} params
 */
export function queryPageList(data) {
  return request({
    url: CAIGOUYANSHOU_URL + '/caiGouYanShou/query',
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
    url: CAIGOUYANSHOU_URL + '/caiGouYanShou/remove',
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
    url: CAIGOUYANSHOU_URL + '/caiGouYanShou/save',
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
    url: CAIGOUYANSHOU_URL + '/caiGouYanShou/get',
    method: 'get',
    params: params
  })
}