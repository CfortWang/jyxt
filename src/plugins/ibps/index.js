// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
// flex 布局库
import 'flex.css'
// ibps平台字体库
import '@/assets/fonts/iconfont.css'
// :focus-visible https://github.com/WICG/focus-visible/blob/master/explainer.md
import 'focus-visible'
// Internationalization 国际化
import i18n from '@/i18n'
// store
import store from '@/store'
// 工具类
import Utils from '@/utils/util'
// global filters 全局过滤
import * as filters from '@/filters'
// 拼音指令
import pinyin from '@/directives/pinyin'
// 置顶
import sticky from '@/directives/sticky'
// 加载更多
import loadMore from '@/directives/load-more'

import {
  getToken
} from '@/utils/auth'
// 通用组件
import '@/components'
// svg 图标
import '@/assets/svg-icons'

// 功能插件
import pluginError from '@/plugins/error'
import pluginLog from '@/plugins/log'
import pluginOpen from '@/plugins/open'
// 平台配置文件
import setting from '@/setting.js'
import env from '@/env'

export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示。
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$nodeEnv = env.NODE_ENV
    // 当前环境变量
    Vue.prototype.$env = env

    // 当前的 baseUrl   简化代码中 env.VUE_APP_PUBLIC_PATH 取值
    Vue.prototype.$baseUrl = env.VUE_APP_PUBLIC_PATH || '/'
    // 构建时间
    Vue.prototype.$buildTime = env.VUE_APP_BUILD_TIME

    Vue.prototype.$ibpsUrl = env.VUE_APP_BASE_API_0_0_TEST
    /* 中汇瑞德检测中心 */
    let downloadReport = (src, where) => {
      return 'https://www.szjyxt.com/demo/reportServlet?action=6&file=' + encodeURIComponent(src) + '.rpx&columns=0&srcType=file&paramString=' + encodeURIComponent(where)
    }
    let timer = setInterval(() => { //定时循环添加参数
      if (getToken()) {
        Vue.prototype.$reportPash = 'https://www.szjyxt.com/demo/reportJsp/showReport.jsp?access_token = ' + getToken() + '&rpx=中汇瑞德检测中心/' //报表路径
        Vue.prototype.$getReportFile = downloadReport //通过方法函数，拼接url，并将字符串格式化
        // Vue.prototype.$getSealUri = 'https://www.szjyxt.com/getSealFile/' //微签 回显获取文件地址
        Vue.prototype.$getSealUri = ' http://120.77.249.241:9999/no/getSealFile/' //微签 回显获取文件地址

        Vue.prototype.$getFileDow = 'https://www.szjyxt.com/ibps/platform/v3/file/download?attachmentId=' //文件下载地址
        Vue.prototype.$getSealUploadingFile = 'https://www.szjyxt.com/doSeal/' //微签 上传地址
        Vue.prototype.$getSealPreFile = 'https://www.szjyxt.com/preprocess/' //微签 手动签章-预处理
        // Vue.prototype.$getSealPageFile = 'https://www.szjyxt.com/manualSigPage/' //微签 手动签章-页面接口
        Vue.prototype.$getSealPageFile = 'http://120.77.249.241:9999/manualSig/manualSigPage/' //微签 手动签章-页面接口（ 微签服务器地址，非nginx转发）
        Vue.prototype.$getSigFile = 'http://120.77.249.241:8080/doSeal/getSigFile/' //微签 手动签章-页面接口-签章页面完成按钮回调接口

        clearInterval(timer) //添加成功后即删除定时任务
      }
    }, 500)

    // 获得用户设置的全局尺寸
    const size = await store.dispatch('ibps/db/get', {
      dbName: 'sys',
      path: 'size.value',
      defaultValue: setting.system.size,
      user: true
    })

    // 注册Element UI
    Vue.use(ElementUI, {
      size,
      i18n: (key, value) => i18n.t(key, value)
    })
    // 注册全局过滤器（register global utility filters. ）
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
    // 设置拼音指令
    Vue.directive('pinyin', pinyin)
    Vue.directive('sticky', sticky)
    Vue.directive('load-more', loadMore)

    // 插件
    Vue.use(pluginError)
    Vue.use(pluginLog)
    Vue.use(pluginOpen)
    // 使用帮助类
    Vue.prototype.$utils = Utils
    // 快速打印 log
    Vue.prototype.$log = Utils.log
  }
}
