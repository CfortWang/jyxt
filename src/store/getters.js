export default {
  // ===========  用户相关
  userId: state => state.ibps.user.info && state.ibps.user.info.user ? state.ibps.user.info.user.id : '', // 用户ID
  name: state => state.ibps.user.info && state.ibps.user.info.employee ? state.ibps.user.info.employee.name : '', // 姓名
  status: state => state.ibps.user.info && state.ibps.user.info.employee ? state.ibps.user.info.employee.status : '', // 用户状态
  isSuper: state => state.ibps.user.info && state.ibps.user.info.user ? state.ibps.user.info.user.isSuper === 'Y' : false, // 是否超级管理员
  account: state => state.ibps.user.info && state.ibps.user.info.user ? state.ibps.user.info.user.account : '', // 用户名
  regOpen: state => state.ibps.user.regOpen, // 注册状态

  userInfo: state => state.ibps.user.info, // 用户信息

  // =========== 租户
  tenant: state => state.ibps.user.info && state.ibps.user.info.mainTenant ? state.ibps.user.info.mainTenant || {} : {}, // 当前租户
  tenants: state => state.ibps.user.info && state.ibps.user.info.tenants ? state.ibps.user.info.tenants || [] : [], // 当前拥有的租户
  tenantid: state => state.ibps.user.info && state.ibps.user.info.tenantId ? state.ibps.user.info.tenantId || '' : '', // 租户id
  isTenantAdmin: state => state.ibps.user.info && state.ibps.user.info.isTenantAdmin ? state.ibps.user.info.isTenantAdmin || false : false, // 是否租户管理员

  single: state => state.ibps.api.single, // 单体应用
  baseApi: state => state.ibps.api.base, // baseAPI地址
  websocket: state => state.ibps.api.websocket, // websocket地址

  isTenantOpen: state => state.ibps.sass ? state.ibps.sass.tenantOpen : false, // 是否租户模式

  designTenantid: state => state.ibps.user && state.ibps.user.designTenantid ? state.ibps.user.designTenantid || '' : '',
  // =========== 菜单
  menus: state => state.ibps.menu.menus, // 菜单
  routers: state => state.ibps.menu.routers, // 新增的路由表
  // =========== 子系统
  system: state => state.ibps.system.system, // 子系统
  systemid: state => state.ibps.system.system ? state.ibps.system.system.id : '', // 子系统id

  permissions: state => state.ibps.menu.permissions, //  拥有的权限
  jianCeDuiXiangId: state => state.ibps.jianCeDuiXiangId ? state.ibps.jianCeDuiXiangId : '',
  myform: state => state.ibps.myform ? state.ibps.myform : '',
  jianCeCanShuId: state => state.ibps.jianCeCanShuId ? state.ibps.jianCeCanShuId : '',
  // 罗湖项目新增，所有检测项目名称及流程key数组
  testingList: state => state.ibps.param && state.ibps.param.testingList ? state.ibps.param.testingList : []
}
