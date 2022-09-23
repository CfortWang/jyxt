<template>
  <div class="main-container">
    <ibps-crud
      ref="crud"
      :height="height"
      :data="listData"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :pk-key="pkKey"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :loading="loading"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    />
    <edit
      :id="editId"
      :title="title"
      :visible="dialogFormVisible"
      :readonly="readonly"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />
  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/demo/codegen/renYuanJiBengQingKuang'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './edit'

export default {
  components: {
    Edit
  },
  mixins: [FixHeight],
  data() {
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键

      title: '',

      loading: true,
      height: document.clientHeight,

      listData: [],
      pagination: {},
      sorts: {},
      listConfig: {
        toolbars: [
          {
            key: 'search'
          },
          {
            key: 'add'
          },
          {
            key: 'edit'
          },
          {
            key: 'remove'
          }
        ],
        searchForm: {
          forms: [
            { prop: 'Q^PARENT_ID_^SL', label: '外键' }
            ,{ prop: 'Q^TENANT_ID_^SL', label: '租户ID' }
            ,{ prop: 'Q^IP_^SL', label: 'IP地址' }
            ,{ prop: 'Q^CREATE_BY_^SL', label: '创建人' }
            ,{ prop: 'Q^CREATE_TIME_^DG', label: '创建时间' }
            ,{ prop: 'Q^UPDATE_BY_^SL', label: '更新人' }
            ,{ prop: 'Q^UPDATE_TIME_^DG', label: '更新时间' }
            ,{ prop: 'Q^CHU_SHENG_NIAN_YUE_^DG', label: '出生年月' }
            ,{ prop: 'Q^SHEN_FEN_ZHENG_HAO_^SL', label: '身份证号码' }
            ,{ prop: 'Q^JI_GUAN_^SL', label: '籍贯' }
            ,{ prop: 'Q^MIN_ZU_^SL', label: '民族' }
            ,{ prop: 'Q^GONG_ZUO_BU_MEN_^SL', label: '工作部门' }
            ,{ prop: 'Q^CAN_JIA_GONG_ZUO^DG', label: '参加工作时间' }
            ,{ prop: 'Q^CAN_JIA_GONG_AN_^SL', label: '参加公安时间' }
            ,{ prop: 'Q^ZHENG_ZHI_MIAN_MAO_^SL', label: '政治面貌' }
            ,{ prop: 'Q^RU_DANG_TUAN_SHI_^DG', label: '入党团时间' }
            ,{ prop: 'Q^XING_ZHENG_ZHI_WU_^SL', label: '行政职务' }
            ,{ prop: 'Q^REN_ZHI_SHI_JIAN_^SL', label: '任职时间' }
            ,{ prop: 'Q^XIAN_CONG_SHI_ZHUA^SL', label: '现从事专业' }
            ,{ prop: 'Q^BEN_ZHUAN_YE_GONG_^SL', label: '本专业工作年限' }
            ,{ prop: 'Q^XIAN_ZHUAN_YE_JI_SH^SL', label: '现专业技术职务' }
            ,{ prop: 'Q^QU_DE_ZI_GE_SHI_J^DG', label: '取得资格时间' }
            ,{ prop: 'Q^JING_XIAN_^SL', label: '警衔' }
            ,{ prop: 'Q^JING_HAO_^SL', label: '警号' }
            ,{ prop: 'Q^YUAN_XUE_LI_^SL', label: '原学历' }
            ,{ prop: 'Q^YUAN_XUE_WEI_^SL', label: '原学位' }
            ,{ prop: 'Q^YUAN_BI_YE_YUAN_XI^SL', label: '原毕业院校' }
            ,{ prop: 'Q^YUAN_BI_YE_SHI_JI^DG', label: '原毕业时间' }
            ,{ prop: 'Q^YUAN_ZHUAN_YE_^SL', label: '原专业' }
            ,{ prop: 'Q^YUAN_BI_YE_ZHENG^SL', label: '原毕业证书' }
            ,{ prop: 'Q^YUAN_XUE_WEI_ZHEN^SL', label: '原学位证书' }
            ,{ prop: 'Q^ZAI_ZHI_XUE_LI_^SL', label: '在职学历' }
            ,{ prop: 'Q^ZAI_ZHI_XUE_WEI_^SL', label: '在职学位' }
            ,{ prop: 'Q^ZAI_ZHI_BI_YE_^SL', label: '在职毕业院校' }
            ,{ prop: 'Q^ZAI_ZHI_BI_YE_SH^SL', label: '在职毕业时间' }
            ,{ prop: 'Q^ZAI_ZHI_ZHUAN_YE_^SL', label: '在职专业' }
            ,{ prop: 'Q^ZAI_ZHI_BI_YE_ZHENG^SL', label: '在职毕业证书' }
            ,{ prop: 'Q^ZAI_ZHI_XUE_WEI_ZHE^SL', label: '在职学位证书' }
            ,{ prop: 'Q^ZHANG_WO_HE_Z_HE_^SL', label: '掌握何种外语，程度如何' }
            ,{ prop: 'Q^CASHU_UIAN_ZHI_^SL', label: '参加何种学术团体、 任何职、有无社会其他兼职' }
            ,{ prop: 'Q^JI_NENG_ZHI_CHENG^SL', label: '技能职称' }
            ,{ prop: 'Q^JIAN_DING_ZI_GE_Z^SL', label: '检定资格证书编号' }
            ,{ prop: 'Q^QIAN_ZI_TU_WEN_^SL', label: '签字图文' }
            // ,{ prop: ['Q^CREATE_TIME_^DL', 'Q^CREATE_TIME_^DG'], label: '创建时间', fieldType: 'daterange' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'parentId', label: '外键' }
          ,{ prop: 'tenantId', label: '租户ID' }
          ,{ prop: 'ip', label: 'IP地址' }
          ,{ prop: 'createBy', label: '创建人' }
          ,{ prop: 'createTime', label: '创建时间' }
          ,{ prop: 'updateBy', label: '更新人' }
          ,{ prop: 'updateTime', label: '更新时间' }
          ,{ prop: 'chuShengNianYue', label: '出生年月' }
          ,{ prop: 'shenFenZhengHao', label: '身份证号码' }
          ,{ prop: 'jiGuan', label: '籍贯' }
          ,{ prop: 'minZu', label: '民族' }
          ,{ prop: 'gongZuoBuMen', label: '工作部门' }
          ,{ prop: 'canJiaGongZuo', label: '参加工作时间' }
          ,{ prop: 'canJiaGongAn', label: '参加公安时间' }
          ,{ prop: 'zhengZhiMianMao', label: '政治面貌' }
          ,{ prop: 'ruDangTuanShi', label: '入党团时间' }
          ,{ prop: 'xingZhengZhiWu', label: '行政职务' }
          ,{ prop: 'renZhiShiJian', label: '任职时间' }
          ,{ prop: 'xianCongShiZhua', label: '现从事专业' }
          ,{ prop: 'benZhuanYeGong', label: '本专业工作年限' }
          ,{ prop: 'xianZhuanYeJiSh', label: '现专业技术职务' }
          ,{ prop: 'quDeZiGeShiJ', label: '取得资格时间' }
          ,{ prop: 'jingXian', label: '警衔' }
          ,{ prop: 'jingHao', label: '警号' }
          ,{ prop: 'yuanXueLi', label: '原学历' }
          ,{ prop: 'yuanXueWei', label: '原学位' }
          ,{ prop: 'yuanBiYeYuanXi', label: '原毕业院校' }
          ,{ prop: 'yuanBiYeShiJi', label: '原毕业时间' }
          ,{ prop: 'yuanZhuanYe', label: '原专业' }
          ,{ prop: 'yuanBiYeZheng', label: '原毕业证书' }
          ,{ prop: 'yuanXueWeiZhen', label: '原学位证书' }
          ,{ prop: 'zaiZhiXueLi', label: '在职学历' }
          ,{ prop: 'zaiZhiXueWei', label: '在职学位' }
          ,{ prop: 'zaiZhiBiYe', label: '在职毕业院校' }
          ,{ prop: 'zaiZhiBiYeSh', label: '在职毕业时间' }
          ,{ prop: 'zaiZhiZhuanYe', label: '在职专业' }
          ,{ prop: 'zaiZhiBiYeZheng', label: '在职毕业证书' }
          ,{ prop: 'zaiZhiXueWeiZhe', label: '在职学位证书' }
          ,{ prop: 'zhangWoHeZHe', label: '掌握何种外语，程度如何' }
          ,{ prop: 'cashuUianZhi', label: '参加何种学术团体、 任何职、有无社会其他兼职' }
          ,{ prop: 'jiNengZhiCheng', label: '技能职称' }
          ,{ prop: 'jianDingZiGeZ', label: '检定资格证书编号' }
          ,{ prop: 'qianZiTuWen', label: '签字图文' }
          // { prop: 'createTime', label: '创建时间', sortable: 'custom' }
        ],
        rowHandle: {
          actions: [
            { key: 'edit' },
            { key: 'remove' },
            { key: 'detail' }
          ]
        }
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData() {
      this.loading = true
      queryPageList(this.getSearcFormData()).then(response => {
        ActionUtils.handleListData(this, response.data)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 获取格式化参数
     */
    getSearcFormData() {
      return ActionUtils.formatParams(
        this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {},
        this.pagination,
        this.sorts)
    },
    /**
     * 处理分页事件
     */
    handlePaginationChange(page) {
      ActionUtils.setSorts(this.sorts)
      ActionUtils.setPagination(this.pagination, page)
      this.loadData()
    },
    /**
     * 处理排序
     */
    handleSortChange(sort) {
      ActionUtils.setSorts(this.sorts, sort)
      ActionUtils.setPagination(this.pagination)
      this.loadData()
    },
    /**
     * 查询
     */
    search() {
      ActionUtils.setPagination(this.pagination)
      ActionUtils.setSorts(this.sorts)
      this.loadData()
    },
    /**
     * 处理按钮事件
     */
    handleAction(command, position, selection, data) {
      switch (command) {
        case 'search':// 查询
          this.loadData()
          break
        case 'add':// 添加
          this.handleEdit()
          this.title = '添加t_ryjbqk'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_ryjbqk'
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = 't_ryjbqk明细'
          }).catch(() => { })
          break
        case 'remove':// 删除
          ActionUtils.removeRecord(selection).then((ids) => {
            this.handleRemove(ids)
          }).catch(() => { })
          break
        default:
          break
      }
    },
    /**
     * 处理编辑
     */
    handleEdit(id = '', readonly = false) {
      this.editId = id
      this.readonly = readonly
      this.dialogFormVisible = true
    },
    /**
     * 处理删除
     */
    handleRemove(ids) {
      // 获取数据
      remove({ ids: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    }
  }
}
</script>