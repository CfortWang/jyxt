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
    <ibps-uploader
      :visible="dialogFormVisible"
      :multiple="true"
      margin-top="7vh"
      accept="*"
      class="attachment-uploader-dialog"
      @action-event="uploaderAction"
      @close="visible => dialogFormVisible = visible"
    />
    <modify-name
      :id="editId"
      :file="file"
      :visible="modifyNameVisible"
      @callback="search"
      @close="visible => modifyNameVisible = visible"
    />
    <detail
      :id="editId"
      :visible="detailVisible"
      :data="detailData"
      @callback="search"
      @close="visible => detailVisible = visible"
    />
     <div  v-if="filePreviewVisible">
       <file-preview
          :file="file"
          :visible="filePreviewVisible"
          @close="visible => filePreviewVisible = visible"
        />
    </div>
    <div  v-if="filePreviewVisible2">
       <file-preview
          :optionFile="file"
          :visible="filePreviewVisible"
          @close="visible => filePreviewVisible = visible"
        />
    </div>
  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/platform/file/attachment'
import { downloadFile } from '@/business/platform/file/utils'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import IbpsUploader from '@/business/platform/file/uploader'
import FilePreview from '@/business/platform/file/file-preview'
import Detail from './detail'
import ModifyName from './modify-name'
import {SYSTEM_URL,BASE_API} from '@/api/baseUrl'

export default {
  components: {
    IbpsUploader,
    FilePreview,
    Detail,
    ModifyName
  },
  mixins: [FixHeight],
  data() {
    const extType = ['txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'wps', 'jpg', 'jpeg', 'png', 'gif', 'mp3', 'mp4']
    return {
      dialogFormVisible: false, // ??????
      modifyNameVisible: false,
      detailVisible: false,
      filePreviewVisible: false,
      filePreviewVisible2: false,
      editId: '', // ??????dialog????????????
      pkKey: 'id', // ??????  ??????????????????pk???????????????
      detailData: '',
      file: {fileName:'',url:'',editUrl:'',title:'',fileType:'' },
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
            key: 'upLoad',
            label: '??????',
            icon: 'ibps-icon-upload'
          },
          {
            key: 'remove'
          }
        ],
        searchForm: {
          forms: [
            { prop: 'Q^file_name_^SL', label: '?????????' },
            { prop: 'Q^creator_name_^SL', label: '?????????' },
            { prop: 'Q^ext_^SL', label: '?????????' },
            { prop: ['Q^create_time_^DL', 'Q^create_time_^DG'], label: '????????????', fieldType: 'daterange' }
          ]
        },
        // ??????????????????
        columns: [
          { prop: 'fileName', label: '?????????' },
          { prop: 'createTime', label: '????????????', dateFormat: 'yyyy-MM-dd HH:mm:ss' },
          { prop: 'ext', label: '?????????' },
          { prop: 'totalBytes', label: '????????????', filter: 'numberFormatter' },
          { prop: 'creatorName', label: '?????????' }
        ],
        rowHandle: {
          actions: [
            {
              key: 'preview',
              label: '??????',
              icon: 'ibps-icon-eye',
              hidden: (row, index) => {
                if (extType.includes(row.ext)) return false
                return true
              }
            }, {
              key: 'modifyName',
              label: '???????????????',
              icon: 'ibps-icon-eraser'
            }, {
              key: 'detail',
              icon: 'ibps-icon-detail'
            }, {
              key: 'download',
              label: '??????',
              icon: 'ibps-icon-download'
            }, {
              key: 'remove'
            }
          ]
        }
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // ????????????
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
     * ?????????????????????
     */
    getSearcFormData() {
      return ActionUtils.formatParams(
        this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {},
        this.pagination,
        this.sorts)
    },
    /**
     * ??????????????????
     */
    handlePaginationChange(page) {
      ActionUtils.setPagination(this.pagination, page)
      this.loadData()
    },
    /**
     * ????????????
     */
    handleSortChange(sort) {
      ActionUtils.setSorts(this.sorts, sort)
      this.loadData()
    },
    /**
     * ??????
     */
    search() {
      this.loadData()
    },
    /**
     * ??????????????????
     */
    handleAction(command, position, selection, data) {
      switch (command) {
        case 'search':// ??????
          ActionUtils.setFirstPagination(this.pagination)
          this.search()
          break
        case 'upLoad':// ??????
          this.handleUpload()
          break
        case 'modifyName':// ???????????????
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleModify(id)
            this.file.fileName = data.fileName
            // console.log(this.file.fileName)
          })
          break
        case 'detail':// ??????
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleDetail(id)
            this.detailData = data
          })
          break
        case 'preview':// ??????
          console.log("ext:",data.ext)
          if("png"==data.ext||"jpeg"==data.ext||"jpg"==data.ext){
            this.file = data
            this.filePreviewVisible2 = false
            this.filePreviewVisible = true
            break
          }
          this.file.url = BASE_API() + SYSTEM_URL() + '/file/download?attachmentId=' + data.id
          this.file.editUrl =  BASE_API()+SYSTEM_URL() + '/file/editCallback?fileName='+data.fileName+'&fileType='+data.ext+'&id='+ data.id
          this.file.title =data.fileName // ????????????
          this.file.fileType = data.ext //??????
          this.filePreviewVisible = false
          this.filePreviewVisible2 = true
          break
        case 'download'://  ??????
          this.handleDownload(data)
          break
        case 'remove':// ??????
          ActionUtils.removeRecord(selection).then((ids) => {
            this.handleRemove(ids)
          }).catch(() => { })
          break
        default:
          break
      }
    },
    /**
     * ??????
     */
    handleUpload(id = '') {
      this.editId = id
      this.dialogFormVisible = true
    },
    uploaderAction(data) {
      this.dialogFormVisible = false
      this.search()
    },
    /**
     * ???????????????
     */
    handleModify(id = '') {
      this.editId = id
      this.modifyNameVisible = true
    },
    /**
     * ????????????
     */
    handleDetail(id = '') {
      this.editId = id
      this.detailVisible = true
    },
    /**
     * ????????????
     */
    handleRemove(ids) {
      remove({ attachmentIds: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    },
    handleDownload(data) {
      downloadFile(data)
    }
  }
}
</script>
<style lang="scss">
.attachment-uploader-dialog{
  .el-dialog__body{
    height:  calc(57vh - 100px) !important;
  }
}
</style>
