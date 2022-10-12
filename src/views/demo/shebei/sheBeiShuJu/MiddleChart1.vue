<template>
  <div class="middle-chart-1">
    <div @click.prevent="openRedar('出库')"
                  style="width: 150px;
                    cursor: pointer;
                     text-align:center;
                     color: #FFFFFF;
                     line-height: 5px;
                     float: right;
                     ">
              <dv-border-box-7>
                      设备出库扫描
                    </dv-border-box-7>
    </div>
    </br>
    <div @click.prevent="openRedar('入库')"
                  style="width: 150px;
                    cursor: pointer;
                     text-align:center;
                     color: #FFFFFF;
                     line-height: 5px;
                     float: right;
                     ">
              <dv-border-box-7>
                      设备入库扫描
                    </dv-border-box-7>
    </div>


      <div class="mh-middle">
         <span style="position: absolute;top:25px;left:305px;">设备数据管理</span>
      </div>

      <div class="pie-middle">
         <Middle-Pie-1 />
         <dv-decoration-2 :reverse="true" style="width:5px;height:380px;" />
         <Middle-Pie-2 />
      </div>

<!-- 扫码操作组件 -->
      <el-input
        v-model="facilityId"
        ref="redarInput"
        @change="facilityData(facilityId)"
        ></el-input>

      <div class="popContainer" v-if="redar" @click="remRedar">
           <dv-decoration-12 style="width:150px;height:150px;margin:0 auto;top: 35%;">
              开启扫描设备连接
           </dv-decoration-12>
      </div>

      <el-dialog
          width="75%"
          :modal-append-to-body='false'
          :visible.sync="visible">
              <div style="min-height: 600px;">
                <div style="float: left; font-weight: bold;">需要{{behavior}}的设备:</div>
                 <el-button @click="submitData" type="primary" style="float: right;">确认提交</el-button>
                 <el-table
                    :data="listData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      prop="sheBeiMingCheng"
                      label="设备名称"
                      >
                    </el-table-column>

                    <el-table-column
                      prop="guiGeXingHao"
                      label="规格型号"
                     >
                    </el-table-column>

                    <el-table-column
                      prop="sheBeiShiBieH"
                      label="设备识别号">
                    </el-table-column>

                    <el-table-column
                      prop="sheBeiZhuangTa"
                      label="设备状态">
                    </el-table-column>
                  </el-table>
              </div>
        </el-dialog>
  </div>
</template>

<script>
/* import MiddlePie1 from './MiddlePie1'
import MiddlePie2 from './MiddlePie2' */
import { queryPageList, remove } from '@/api/demo/shebei/sheBei' //设备查询接口
import ActionUtils from '@/utils/action'

export default {
  name: 'MiddleChart1',
   components: {
    /* MiddlePie1,
    MiddlePie2 */
  },
  data () {
    return {
      visible:false,
      redar:false,
      facilityId:'',
      listData:[],
      behavior:''
    }
  },
  methods: {
    allView(){
      screenfull.request() //默认显示全屏
    },
	  openRedar(type){
      this.behavior = type
      this.redar = true
      this.$refs.redarInput.focus();
       this.listData = []
    },
    remRedar(){
      this.redar = false
    },
    //扫码之后
    facilityData(id){
      if(id){
                for(let item of this.listData){
                  if(item.id==id){
                    return
                    }
                  }
        this.loadData(id)
        //开始查询设备
        this.facilityId = ''
       }
    },
    /* 查询参数格式化*/
    getSearcFormData(id) {
      const params = {}
      params['Q^id_^S'] = id
      return ActionUtils.formatParams(
        params,
       {},
       {},
        )
    },
    // 提交设备
    submitData(){
        this.visible = false
        alert("提交设备 [ "+this.behavior+" ] 信息成功")
      },
    /* 获取数据*/
    loadData(id) {
      if(!id){
        return
      }
      queryPageList(this.getSearcFormData(id)).then(response => {
        if(response.data.dataResult.length==0){ return }
        this.listData.push( response.data.dataResult[0])
        this.visible =true
        this.redar = false

      }).catch(() => {
        this.$message.error("网络或扫码参数错误，请重试。")
      })
    },



  }
}
</script>

<style lang="less">
  .popContainer{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      background: rgba(0,0,0,0.7);
  }
.middle-chart-1 {
  width: 100%;
  height: 50%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
.mh-middle{
  width: 100%;
  height:20%;
  font-size:35px;
  text-align: center;
}
.pie-black{cursor: pointer;width: 100px; height:40px; line-height:40px; text-align:center;margin-left:640px; font-size:18px;}
.pie-middle{
  width: 100%;
  height:80%;
  display: flex;
}
}
</style>
