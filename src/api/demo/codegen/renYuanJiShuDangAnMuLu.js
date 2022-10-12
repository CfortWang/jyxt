import request from '@/utils/request'
const RENYUANJISHUDANGANMULU_URL = '/business/v3'

/**
 * 查询列表数据
 * @param {*} params
 */
export function queryPageList(data) {
  return request({
    url: RENYUANJISHUDANGANMULU_URL + '/renYuanJiShuDangAnMuLu/query',
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
    url: RENYUANJISHUDANGANMULU_URL + '/renYuanJiShuDangAnMuLu/remove',
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
    url: RENYUANJISHUDANGANMULU_URL + '/renYuanJiShuDangAnMuLu/save',
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
    url: RENYUANJISHUDANGANMULU_URL + '/renYuanJiShuDangAnMuLu/get',
    method: 'get',
    params: params
  })
}