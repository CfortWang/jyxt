(function (global) {
  global.__IBPS_CONFIG__={
    // 是否启用配置
    ENABLE_CONFIG:false,
    //  api
    BASE_API:'http://192.168.3.230:15100/ibps',
    // GATEWAY API
    BASE_GATEWAY_API:'http://192.168.3.230:15100/ibps',
    // WEBSOCKET api
    BASE_WEBSOCKET_API :'ws://192.168.3.230:15888',
    // report api
    BASE_REPORT_API : 'http://192.168.3.230:8080/raqsoft',

    //是否单体应用
    SINGLE:false,
    //是否启用多域名 
    MULTIPLE_DOMAIN:false,
    // 域名
    API_DOMAIN_NAMES:['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12','a13','a14','a15','a16','a17','a18','a19','a20'],

    // 后台配置的Token key
    HEADER_TOKEN_KEY :'X-Authorization-access_token',
    // 后台配置的Token key(url使用的key)
    FORM_TOKEN_KEY :'access_token',
    // 系统ID
    HEADER_SYSTEM_ID :'X-Authorization-systemid',
    //  租户ID
    HEADER_TENANT_ID:'X-Authorization-tenantid',

    //================认证中心=====================
    //申请应用时分配的AppKey
    CLIENT_ID:'ibps',
    //申请应用时分配的AppSecret
    CLIENT_SECRET:'58b65297-3467-0859-8337-8cbaf81ef68a',
    //授权方式:authorization_code ：授权码方式，  password_credentials：密码模式
    GRANT_TYPE:'authorization_code',

    //================Token存储=====================
    //TOKEN存储方式  default:默认，domain：域名限制
    TOKEN_STORE:'default',
    //TOKEN 存储域名限制,TOKEN_STORE为domain有效，
    TOKEN_DOMAIN:'bpmhome.cn',
    //TOKEN存储的前缀  default：默认，加前缀和版本。 custom:自定义，写的输出什么
    TOKEN_STORE_PREFIX:'default',
    //TOKEN存储方式 key
    TOKEN_STORE_KEY:'token',
    //刷新TOKEN存储方式 key
    REFRESH_TOKEN_STORE_KEY:'refresh_token',

    //转换数据
    TRANSFER_DATA:'transfer',

    //国际化配置
    I18N_LOCALE:'zh-CN',
    I18N_FALLBACK_LOCALE:'zh-CN',

    //element 颜色
    ELEMENT_COLOR:'#409EFF'
  }

})(window)