<template>
  <div class="ibps-mr-5">
    <el-tooltip
      v-if="messageCount === 0"
      :content="tooltipContent"
      effect="dark"
      placement="bottom"
    >
      <el-button
        class="ibps-ml-0 ibps-mr btn-text can-hover"
        type="text"
      >
        <el-badge
          :max="99"
          :value="messageCount"
        >
          <ibps-icon
            name="bell-o"
            size="16"
          />
        </el-badge>
      </el-button>
    </el-tooltip>
    <el-popover
      v-else
      placement="bottom-end"
      width="350"
      trigger="click"
      popper-class="header-message-popper"
    >

      <el-button
        slot="reference"
        class="ibps-ml-0 ibps-mr btn-text can-hover"
        type="text"
      >
        <el-badge
          :max="99"
          :value="messageCount"
        >
          <ibps-icon
            name="bell-o"
            size="16"
          />
        </el-badge>
      </el-button>

      <el-card body-style="padding:0;">
        <div slot="header" style="font-size: 20px; font-weight: 600;">
          {{ $t('layout.header-aside.header-message.message-count',{messageCount:messageCount}) }}
        </div>
        <div style="height:250px;">
          <el-scrollbar
            style="height: 100%;width:100%;"
            wrap-class="ibps-scrollbar-wrapper "
          >
            <ibps-list class="ibps-p-10">
              <ibps-list-item
                v-for="(message,index) in messageList"
                :key="index"
                @click.native="handelInteriorClick(message)"
              >
                <ibps-list-item-meta
                  :title="message.subject"
                  :description="message.ownerName"
                >
                  <el-avatar
                    slot="avatar"
                    :icon="message.messageType==='bulletin'?'ibps-icon-bullhorn':'ibps-icon-user'"
                    shape="circle"
                    style="background-color: #87d068"
                  />
                </ibps-list-item-meta>
                <div slot="extra">
                  {{ message.createTime|formatRelativeTime({'year':'yyyy-MM-dd'}) }}
                </div>
              </ibps-list-item>
            </ibps-list>
          </el-scrollbar>
        </div>
        <div class="message-more">
          <el-link type="primary" @click="clickMore">{{ $t('layout.header-aside.header-message.viewmore') }}</el-link>
        </div>
      </el-card>
    </el-popover>

    <!-- 消息明细 -->
    <inner-detail-dialog
      :id="editId"
      :visible="dialogFormVisible"
      :title="$t('layout.header-aside.header-message.details')"
      inside
      readonly
      @callback="loadData"
      @close="visible => dialogFormVisible = visible"
    />
  </div>
</template>

<script>
import { getMsgList,queryReceivePageList } from '@/api/platform/message/innerMessage'
import InnerDetailDialog from '@/views/platform/message/inner/detail/dialog'
import Watermark from './watermark/watermark-cont.js'
export default {
  components: {
    InnerDetailDialog
  },
  data() {
    return {
      editId: '',
      dialogFormVisible: false,
      isControl:true,
      messageList: [],
      messageCount: 0,
      infoMessage:'',

      countNumber:0,
    }
  },
  computed: {
    tooltipContent() {
      return this.messageCount === 0 ? this.$t('layout.header-aside.header-message.empty') : ''
    }
  },
  mounted() {
    //轮询弹窗任务提醒
    /* setTimeout(() => {
      this.isControl=true
      this.loadData()
    }, 1000) */
    this.loadData()
    // Watermark.set('线上试用版本','深圳市金源信通')
  },
  beforeDestroy () {
    Watermark.set('', '')
  },
  methods: {
    // 加载数据
   loadData() {
      queryReceivePageList(
               { parameters:[/* {key: "Q^subject^SL", value: "提醒"},
                             {key: "Q^messageType^SL", value: "system"} */],
                requestPage:{limit:5,pageNo: 1,totalCount: 0},
                sorts: [],
                }).then(response => {
                  const data = response.data
                  this.messageList = data.dataResult
                  this.messageCount = data.pageResult ? data.pageResult.totalCount : 0
        if(this.countNumber == 0){
            /*
            if(response.data.pageResult.totalCount>0){
                this.$message.warning('您有'+response.data.pageResult.totalCount+'条未处理的 [ 待审批 / 被驳回任务消息 ]，请及时处理！！！')
            } */

        }else if(this.countNumber < data.pageResult.totalCount){ //如果上次记录数量低于本次  进行提醒，准备待办
            let _this = this
            let h = this.$createElement
            let num = data.pageResult.totalCount - this.countNumber
                     this.infoMessage =  this.$notify({
                                 title: '您有新的待办任务产生！',
                                 message:  h('p', null, [
                                   h('span', null, '任务内容: '+data.dataResult[0].subject),
                                   h('br'),
                                   h('span',null, '生成时间: '),
                                   h('span', {style:'color: #FF8C00;font-size:12px;'},data.dataResult[0].createTime),
                                   h('br'),
                                   h('el-button', {
                                            attrs: {
                                              size: 'mini',
                                              type: 'primary',
                                              plain:true,
                                            },
                                            on: {
                                              click:()=>{
                                                _this.cancelInfo()
                                                }
                                            }
                                          }, '进入办理'),
                                    h('el-button', {
                                             attrs: {
                                               size: 'mini',
                                               plain:true,
                                             },
                                             on: {
                                               click:()=>{
                                                _this.$notify.closeAll()
                                                 }// 路由加载之后，调用关闭消息弹窗的方法
                                             }
                                           }, '忽略全部')
                                 ]),
                                 type: 'warning',
                                 duration: 0,
                               });

        }
        if(this.countNumber == 0){
              this.countNumber = data.pageResult.totalCount
            /*  setInterval(() => {
                   if(this.isControl &&  response.message == "获取收到的内部消息列表成功！"){
                     this.loadData()
                     }
                }, 60000)
 */
            }else{
              this.countNumber = data.pageResult.totalCount
            }

      }).catch(() => {
		  this.isControl = false
      })
    },
    cancelInfo(){
        this.$router.push('/officeDesk/pendingItems')
        this.$notify.closeAll()
      },
    handelInteriorClick(message) {
      this.editId = message.id
      this.dialogFormVisible = true
    },
    clickMore() {
      // 更多消息
      this.$router.push('/officeDesk/innerMessage/receiveMessage')
    }
  },
  /* 销毁事件*/
  beforeDestroy() {
   this.isControl = false
  },

}
</script>
<style lang="scss" >
  .header-message-popper{
    padding: 0 !important;
    .message-more{
      padding: 15px 0;
      text-align: center;
      border-top: 1px solid #EBEEF5;
    }
  }
</style>
