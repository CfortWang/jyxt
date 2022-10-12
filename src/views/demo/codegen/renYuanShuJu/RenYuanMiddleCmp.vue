<template>
  <div class="ren-yuan-middle-cmp">
    <div class="cc-header">
      <!-- <dv-decoration-1 style="width:200px;height:50px;" /> -->
      <div class="mh-left">
        <div @click.prevent="toHome()"
                      style="width: 140px;
                         height: 40px;
                         cursor: pointer;
                         text-align:center;
                         color: #FFFFFF;
                         line-height: 40px;
                         font-size: 14px;
                         margin-left:35px;
                         position: absolute;
                         ">
                  <dv-border-box-8>
                      <span style="margin-top: -20px; margin-left: 10px;">    返回首页</span>
                        </dv-border-box-8>
        </div>
      </div>
      <div style="width: 100%;text-align: center;padding-left: 97px;">
          <div style="display:inline-block;">人员数据统计</div>
      </div>
      <!-- <dv-decoration-1 style="width:200px;height:50px;" /> -->
    </div>

    <div class="cc-main-container">
        <Ren-Yuan-Middle-Top-Cmp />
    </div>

    <div class="cc-bottom">
       <Ren-Yuan-Middle-Bottom-Cmp />
    </div>
  </div>
</template>

<script>
import RenYuanMiddleTopCmp from './RenYuanMiddleTopCmp'
import RenYuanMiddleBottomCmp from './RenYuanMiddleBottomCmp'

export default {
  name: ' RenYuanMiddleCmp',
  components: {
    RenYuanMiddleTopCmp,
    RenYuanMiddleBottomCmp
  },
  data () {
    return {

    }
  },
   methods: {
	  toHome(){
      this.$router.push({
      			name:'dashboard'
      })
		 }
  }
}
</script>

<style lang="less">
.ren-yuan-middle-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  flex-direction: column;
  .cc-black{cursor: pointer;width: 100px; height:40px; line-height:40px; text-align:center;float: right;font-size:18px;}
  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size:35px;
  }
  .cc-details {
    height: 120px;
    display: flex;
    justify-content: center;
    font-size: 32px;
    align-items: center;
    .card {
      background-color: rgba(4,49,128,.6);
      color: #08e5ff;
      height: 70px;
      width: 70px;
      font-size: 45px;
      font-weight: bold;
      line-height: 70px;
      text-align: center;
      margin: 10px;
    }
  }
  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;
    height: 60%;
    margin-bottom: 15px;
    .ccmc-middle {
      width: 50%;
      height: 90%;
      .active-ring-name {
        font-size: 20px !important;
      }
    }
    .ccmc-left, .ccmc-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;
      span {
        font-size: 40px;
        font-weight: bold;
      }
      .station-info {
        height: 80px;
        display: flex;
        align-items: center;
      }
    }
    .ccmc-left {
      align-items: flex-end;
      span {
        margin-left: 20px;
      }
    }
    .ccmc-right {
      align-items: flex-start;
      span {
        margin-right: 20px;
      }
    }
  }
  .cc-bottom{
    position: relative;
    flex: 1;
    display: flex;
    height: 40%;
  }
  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
