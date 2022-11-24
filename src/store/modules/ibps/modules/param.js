export default {
    namespaced: true,
    state: {
        // 所有菜单
        jianCeDuiXiangId: '',
        jianCeCanShuId: '',
        myform: '',
        // 罗湖项目新增，所有检测项目名称及流程key数组
        testingList: []
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
        testingList(state, data) {
            state.testingList = data.length ? data : []
        }
    },
    actions: {
        setTestingList({ commit }, data){
            commit('testingList', data)
        }
    }
}
