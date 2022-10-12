import request from '@/utils/request'
const JTSJPZ_URL = '/business/v3/entrust/sysjtsjpz'


/**
 * 保存数据
 * @param {*} params
 */
export function save(params) {
  return request({
    url: JTSJPZ_URL + '/save',
    method: 'post',
    data: params
  })
}


export function update(params) {
  return request({
    url: JTSJPZ_URL + '/update',
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
    url: JTSJPZ_URL + '/get',
    method: 'post',
    data: params
  })
}
/**
 * 查询列表数据
 * @param {*} params
 */
export function query(data) {
  return request({
    url: JTSJPZ_URL + '/query',
    method: 'post',
    data: data
  })
}

export function selects(data) {
  return request({
    url: JTSJPZ_URL + '/selects',
    method: 'post',
    data: data
  })
}
/*
列表删除功能 （批量删除接口）
*/
export function deleteMe(data){
  return request({
    url:JTSJPZ_URL + '/delete',
    method: 'post',
    params: data
  })
}
