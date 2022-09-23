import request from '@/utils/request'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { BASE_API, SYSTEM_URL } from '@/api/baseUrl'
import store from '@/store'

import qs from 'qs'
/**
 * 查询列表数据
 * @param {*} params
 */
export function queryPageList(params) {
  return request({
    url: SYSTEM_URL() + '/file/attachment/query',
    method: 'post',
    data: params
  })
}
/**
 * 删除数据
 * @param {*} params
 */
export function remove(params) {
  return request({
    url: SYSTEM_URL() + '/file/attachment/remove',
    method: 'post',
    isLoading: true,
    params: params
  })
}
/**
 * 保存数据
 * @param {*} params
 */
export function save(params) {
  return request({
    url: SYSTEM_URL() + '/file/attachment/save',
    method: 'post',
    isLoading: true,
    data: params
  })
}

/**
 * 获取数据
 * @param {*} params
 */
export function get(params) {
  return request({
    url: SYSTEM_URL() + '/file/attachment/get',
    method: 'get',
    params
  })
}

/**
 * 获取数据(通过ID转换为名称)
 * @param {*} params
 */
export function transfer(params) {
  return request({
    url: SYSTEM_URL() + '/file/attachment/transfer',
    method: 'post',
    data: params
  })
}

/**
 * 保存修改文件名
 * @param {*} params
 */
export function modifyName(params) {
  return request({
    url: SYSTEM_URL() + '/file/attachment/modifyName',
    method: 'post',
    isLoading: true,
    params: params
  })
}
/**
 * 下载文件url
 * @param {*} params
 */
export function downloadUrl(params) {
  return SYSTEM_URL() + '/file/download?' + qs.parse(params)
}

/**
 * 下载文件
 * @param {*} params
 */
export function download(params) {
  return request({
    url: SYSTEM_URL() + '/file/download',
    method: 'get',
    isLoading: true,
    responseType: 'arraybuffer',
    params: params
  })
}
/* 在线编辑进行实时回调 */
export function showView(params) {
  return request({
    url: SYSTEM_URL() + '/file/showView',
    method: 'get',
    params: params
  })
}

/**
 * 文件上传
 * @param {*} file
 * @param {*} uploadFileVo
 */
export function uploadFile(file, uploadFileVo) {
  const data = new FormData() // 创建form对象
  data.append('file', file)
  // data.append('uploadFileVo', null)

  return request({
    url: SYSTEM_URL() + '/file/upload',
    method: 'post',
    isLoading: true,
    gateway: true,
    data: data
  })
}

/**
 * 获取文件预览地址
 * @param {*} attachmentId
 */
export function previewFile(attachmentId) {
  return BASE_API() + SYSTEM_URL() + '/file/preview?attachmentId=' +
      attachmentId + '&access_token=' + getToken() + '&tenantId=' + store.getters.tenantid
}

/**
 * 获取图片地址
 * @param {*} attachmentId
 */
export function getImage(attachmentId) {
  return BASE_API() + SYSTEM_URL() + '/file/getImage?attachmentId=' +
      attachmentId + '&access_token=' + getToken() + '&tenantId=' + store.getters.tenantid
}

/**
 * 获取照片地址
 * @param {*} attachmentId
 */
export function getPhoto(photo) {
  return BASE_API() + SYSTEM_URL() + photo + '&access_token=' + getToken() + '&tenantId=' + store.getters.tenantid
}

/**
 * 返回保存数据库附件格式地址
 * @param {*} fileId
 */
export function fileUrl(fileId) {
  return '/file/getImage?attachmentId=' + fileId
}
/**
 * 脚本保存文件
 * @param {*} params
 */
export function snapshoot(params) {
  return request({
    url: SYSTEM_URL() + '/file/upload/runQianUpload',
    method: 'post',
    params: params
  })
}
/* 脚本对文件盖章 */
export function seal(url,fileType,type) {
  let Base64 = require('js-base64').Base64
  let data = {
   "signKey": "V1FTMjAyMTEyMjFkOTVjNWM=",
    "signSecret": "YWQwMmY3ZjQ4ZDJmMmYwNDA=",
    "sealUser": "YWRtaW4=",
    "password": "MTIzNA==",
    //"ruleName": "6aqR57yd56ug6KeE5YiZLOmmlumhteeblueroA==",
    "ruleName": type,
    "provideSigFile": Base64.encode(url),
    "fileKey":Base64.encode(generateUUID()+'.'+fileType)
    }
    return axios({
      url: this.$form.$getSealUploadingFile,
      method: 'post',
      data: data
    })
}
 function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
      };
