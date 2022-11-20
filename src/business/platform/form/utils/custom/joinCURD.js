import request from '@/utils/request'
import md5 from 'js-md5';

// export function Update (name,where,cond) {
// 	  let cont = {}
// 	  cont['tableName'] = name
// 	  cont['paramWhere'] = where
// 	  cont['paramCond'] = cond
// 	  return post('update',JSON.stringify(cont))
// 	}

const post = (url, data) => {
  let pash = ''
  let requestData = ''
  if (url == 'select') {
    pash = 'selectDataContextTable'
  } else if (url == 'selects') {
    pash = 'selectDatasContextTable'
  } else if (url == 'batchDelete') {
    pash = 'batchDelete'
  } else if (url == 'delete') {
    pash = 'deleteDataContextTable'
  } else if (url == 'batchDelete') {
    pash = 'batchDelete'
  } else if (url == 'add') {
    pash = 'addDataContextTable'
  } else if (url == 'update') {
    pash = 'updateDataContextTable' //
  } else if (url == 'updates') { //批量修改
    pash = 'updateDatasContextTable'
  } else if (url == "sql") { //直接传入sql
    pash = 'inputSqlSelectData'
  } else if (url == "str") { //插入主管提醒数据
    pash = 'crudZhuGuan'
  } else if (url == "send") { //插入主管提醒数据
    pash = 'sendmessage'
  }
  else if (url == "sendCms") { //插入主管提醒数据
    pash = 'sendCms'
  }
  else if (url == "sendmessages") { //插入主管提醒数据
    pash = 'sendmessages'
  }
  else if (url == "notice") { //插入公告短信
    pash = 'sendNoticeMsg'
  }
  else if (url == "financial") { //插入财务短信
    pash = 'sendFinancialMsg'
  }

  if (typeof data == "object") {
    data = JSON.stringify(data)
  }
  if (data && data.slice(2, 1) == "l") { //往主管表提交数据

    data = '{"str":"' + data + '"}'
    let md5 = sig(data) //加密， 获取md5密文
    requestData = data.slice(0, 1) + '"sig":"' + md5 + '",' + data.slice(1) //结果拼接

  } else if (data && data.slice(0, 1) == "s") { //判断是{}的参数，还是纯sql字符串的参数 , 纯sql补全。

    data = '{"sql":"' + data + '"}'
    let md5 = sig(data) //加密， 获取md5密文
    requestData = data.slice(0, 1) + '"sig":"' + md5 + '",' + data.slice(1) //结果拼接

  } else { //对象转字符串

    let md5 = sig(data) //加密， 获取md5密文
    requestData = data.slice(0, 1) + '"sig":"' + md5 + '",' + data.slice(1) //结果拼接

  }

  let isMsg = ['sendNoticeMsg', 'sendFinancialMsg'].includes(pash)
  let requestUrl = isMsg ? 'business/v3/hwsys/universal/' : 'business/v3/sys/universal/'
  return request({
    url: requestUrl + pash,
    method: 'post',
    data: requestData
  })

}
/* 直接传入sql的签名算法   MD5加密*/
function sig(sql) {
  let rul = (sql.length + 9) * 12 * 3 + 168
  let salt = "JinYuanXinTong"
  return md5(rul + '' + salt)
}

export default post
