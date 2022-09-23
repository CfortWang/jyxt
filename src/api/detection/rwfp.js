import request from '@/utils/request'
const WTSL_URL = '/business/v3/entrust/sysjcwtdb'
const JCWTD_URL = '/business/v3/entrust/sysjcwtdb'


/**
 * 保存数据
 * @param {*} params
 */
export function taskAllocation(params) {
  return request({
    url: WTSL_URL + '/taskAllocation',
    method: 'post',
    data: params
  })
}
export function updatePeople(params) {
  return request({
    url: JCWTD_URL + '/updatePeople',
    method: 'post',
    data: params
  })
}
export function getRwfp(params) {
  return request({
    url: JCWTD_URL + '/get',
    method: 'post',
    params: params
  })
}