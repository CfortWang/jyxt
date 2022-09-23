

export default {
  namespaced: true,
  state: {
    // 所有菜单
    jianCeDuiXiangId: '',
    jianCeCanShuId:'',
    myform: '',
  },

  mutations: {

    jianCeDuiXiangIdSet(state, jianCeDuiXiang) {
      state.jianCeDuiXiangId = jianCeDuiXiang.jianCeDuiXiangId || ''
    },
    myformSet(state, myform) {
      state.myform = myform.myform || ''
    },
    jianCeCanShuIdSet(state, jianCeCanShu) {
      state.jianCeCanShuId = jianCeCanShu.jianCeCanShuId || ''
    },
  }
}
