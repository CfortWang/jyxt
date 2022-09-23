import request from '@/utils/request'
const WTSL_URL = '/business/v3/entrust/syswtsl'


/**
 * 保存数据
 * @param {*} params
 */
export function wtsl(params) {
  return request({
    url: WTSL_URL + '/wtsl',
    method: 'post',
    data: params
  })
}

export function rejected(params) {
  return request({
    url: WTSL_URL + '/rejected',
    method: 'post',
    data: params
  })
} 