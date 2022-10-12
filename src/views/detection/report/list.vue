<template>
  <div class="main-container">
    
          <ibps-tree-select
            v-if="treeData"
            ref="treeSelect"
            v-model="selectData"
            :data="treeData"
            :props="props"
            :node-key="nodeKey"
            :placeholder="placeholder"
            :empty-text="emptyText"
            :clearable="clearable"
            v-on="$listeners"
          />
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

      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    />
     <!--  :loading="loading" -->
<!--    <edit
      :id="editId"
      :title="title"
      :visible="dialogFormVisible"
      :readonly="readonly"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    /> -->
  </div>
</template>

<script>
// import { queryPageList, remove } from '@/api/detection/jcwtd'
// import ActionUtils from '@/utils/action'

import IbpsTreeSelect from '@/components/ibps-tree-select'

import FixHeight from '@/mixins/height'
/* import Edit from './edit' */

export default {
  components: {
    IbpsTreeSelect
    /* Edit */
  },
/*  mixins: [FixHeight], */
  data() {
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键

      title: 'title',

      loading: true,
      height: document.clientHeight,

      listData: [],
      pagination: {},
      sorts: {},
      listConfig: {
        toolbars: [
          {
            key: 'search'
          }
        ],
        searchForm: {
          forms: [
             { prop: 'Q^CREATE_TIME_^DG', label: '创建时间' }
            ,{ prop: 'Q^WEI_TUO_FANG_^SL', label: '委托方' }
            ,{ prop: 'Q^WEI_TUO_NEI_RONG_^SL', label: '委托内容' }

          ]
        },
        // 表格字段配置
        columns: [
           { prop: 'bianZhiBuMen', label: '编制部门' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'baoGaoBianHao', label: '报告编号' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'xiangMuMingChe', label: '项目名称' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'xiangMuLeiBie', label: '项目类别' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jianCeYuan', label: '检测员' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'xiaoYanYuan', label: '校验员' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jianCeKaiShiS', label: '检测开始时间' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jianCeWanCheng', label: '检测完成时间',visible: true, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'shouLiShiJian', label: '受理时间' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'shiFouTongYiF', label: '是否同意分包',visible: false, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'shiFouLiuYang', label: '是否留样' ,visible: false, align: 'center', valign: 'middle', width: '80px'},

     /*     { prop: 'tenantId', label: '租户ID'  ,visible: true, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'ip', label: 'IP地址'  , showColumn: false, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'createBy', label: '创建人' ,displayFieldVisible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'createTime', label: '创建时间' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'updateBy', label: '更新人' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'updateTime', label: '更新时间',visible: false, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'shiFouGuoShen', label: '是否过审',visible: false, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'bianZhiRen', label: '编制人',visible: false, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'bianZhiBuMen', label: '编制部门' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'bianZhiShiJian', label: '编制时间' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'weiTuoFang', label: '委托方' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'xiangXiDiZhi', label: '详细地址' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'lianXiBuMenLi', label: '联系部门/联系人' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'dianHua', label: '电话' }
          ,{ prop: 'xiangMuMingChe', label: '项目名称' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'xiangMuLeiBie', label: '项目类别' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'weiTuoNeiRong', label: '委托内容',visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'weiTuoFangDai', label: '委托方代表签名' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'shouYangRenQia', label: '收样人签名' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'songYangShiJia', label: '送样时间' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'yaoQiuWanCheng', label: '要求完成时间' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'baoGaoBianHao', label: '报告编号' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jianCeYuan', label: '检测员' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'xiaoYanYuan', label: '校验员' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'nianDu', label: '年度' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jianCeKaiShiS', label: '检测开始时间' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jianCeWanCheng', label: '检测完成时间',visible: true, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'shouLiShiJian', label: '受理时间' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'baoGaoFenShu', label: '报告份数' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jinDu', label: '进度' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'weiTuoDanHao', label: '委托单号' ,visible: true, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'weiTuoShiJian', label: '委托时间' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'boHuiYuanYin', label: '驳回原因' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jieGuoBaoGaoS', label: '结果报告送达方式' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jianCeBaoGaoD', label: '检测报告的信息' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'jieLunPanDing', label: '结论判定' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'panDingGuiZe', label: '判定规则' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'shouLiBuMen', label: '受理部门',visible: false, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'shouLiRen', label: '受理人' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'shiFouTongYiF', label: '是否同意分包',visible: false, align: 'center', valign: 'middle', width: '80px' }
          ,{ prop: 'shiFouLiuYang', label: '是否留样' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'shiDouGeiChuY', label: '是都给出意见和解释' ,visible: false, align: 'center', valign: 'middle', width: '80px'}
          ,{ prop: 'shiFouGeiChuC', label: '是否给出测量不确定度' ,visible: false, align: 'center', valign: 'middle', width: '80px'} */
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
   /*   this.loading = true
      queryPageList(this.getSearcFormData()).then(response => {
        ActionUtils.handleListData(this, response.data)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })*/
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
          this.title = '添加t_sysjcwtdb'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_sysjcwtdb'
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = 't_sysjcwtdb明细'
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
