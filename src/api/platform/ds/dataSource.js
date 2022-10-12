import request from '@/utils/request'
import { DS_URL } from '@/api/baseUrl'

/**
 * 查询列表数据
 * @param {*} params
 */
export function queryPageList(data) {
  return request({
    url: DS_URL() + +'/ds/dataSource/query',
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
    url: DS_URL() + +'/ds/dataSource/remove',
    method: 'post',
    isLoading: true,
    params: params
  })
}

/**
 * 获取数据
 * @param {*} params
 */
export function get(params) {
  return request({
    url: DS_URL() + +'/ds/dataSource/get',
    method: 'get',
    params
  })
}
