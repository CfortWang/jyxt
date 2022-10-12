import request from '@/utils/request'
const JCWTD_URL = '/business/v3/entrust/sysjcwtdb'


/**
 * 保存数据
 * @param {*} params
 */
export function save(params) {
  return request({
    url: JCWTD_URL + '/save',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: JCWTD_URL + '/update',
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
    url: JCWTD_URL + '/get',
    method: 'post',
    params: params
  })
}

/**
 * 查询列表数据
 * @param {*} params
 */
export function query(data) {
  return request({
    url: JCWTD_URL + '/query',
    method: 'post',
    data: data
  })
}

export function selects(data) {
  return request({
    url: JCWTD_URL + '/selects',
    method: 'post',
    data: data
  })
}
/*
列表删除功能 （批量删除接口）
*/
export function deleteMe(data){
  return request({
    url:JCWTD_URL + '/delete',
    method: 'post',
    params: data
  })
}
