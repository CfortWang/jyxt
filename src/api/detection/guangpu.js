import request from '@/utils/request'
const concrete_url = '/business/v3/entrust' // 具体的url 前缀 需拼接


/*
url: concrete_url + '/'+ tableName +'/'+methodName&param,

let param={}
param['userId'] = 'lll'
param['userName'] = 'xxx'
param['data'] = {}
param['data']['id']='sss'

最后要toString
*/

/**
 * 查询列表数据
 * @param {*} params
 */
export function query(tableName,methodName,data) {
  return request({
    url: concrete_url +'/'+ tableName +'/'+methodName,
    method: 'post',
    data: data
  })
}

/**
 * 删除数据
 * @param {*} params
 */
export function remove(tableName,methodName,params) {
  return request({
    url: concrete_url + '/'+ tableName +'/'+methodName,
    method: 'post',
    data: params
  })
}
export function removeMulti(tableName,methodName,params) {
  return request({
    url: concrete_url + '/'+ tableName +'/'+methodName,
    method: 'post',
    data: params
  })
}
/**
 * 保存数据
 * @param {*} params
 */
export function saveData(tableName,methodName,params) {
  return request({
    url: concrete_url + '/'+ tableName +'/'+methodName,
    method: 'post',
    data: params
  })
}
export function updateData(tableName,methodName,params) {
  return request({
    url: concrete_url + '/'+ tableName +'/'+methodName,
    method: 'post',
    data: params
  })
}
/**
 * 获取数据
 * @param {*} params
 */
export function get(tableName,methodName,params) {
  return request({
    url: concrete_url + '/'+ tableName +'/'+methodName,
    method: 'post',
    data: params
  })
}


/*
右侧办理按钮统一接口
*/
export function selectById(tableName,methodName,params){
  return request({
    url:concrete_url + '/' + tableName + '/' + methodName,
    method:'post',
    data: params
  })
}

/*
光谱检测输入提交
*/
export function upOrAdd(tableName,methodName,params){
  return request({
    url:concrete_url + '/' + tableName + '/' + methodName,
    method:'post',
    data: params
  })
}
/*
光谱检测校验提交
*/
export function submIt(tableName,methodName,params){
  return request({
    url:concrete_url + '/' + tableName + '/' + methodName,
    method:'post',
    data: params
  })
}

/*
光谱检测校验退回
*/
export function rejectEd(tableName,methodName,params){
  return request({
    url:concrete_url + '/' + tableName + '/' + methodName,
    method:'post',
    data: params
  })
}