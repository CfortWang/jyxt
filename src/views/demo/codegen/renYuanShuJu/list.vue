<template>
  <div id="renyuan-data-view">
    <dv-full-screen-container>
    
      <dv-border-box-1 class="main-container">
        <dv-border-box-7 class="left-chart-container">
          <Ren-Yuan-Left-Cmp />
        </dv-border-box-7>

        <dv-border-box-7 class="middle-chart-container">
          <Ren-Yuan-Middle-Cmp />
        </dv-border-box-7>

        <dv-border-box-7 class="right-chart-container">
          <Ren-Yuan-Right-Cmp />
        </dv-border-box-7>

        <!-- <div class="right-main-container">
          <div class=" mc-top">
              <Top-Middle-Cmp />
              <Top-right-Cmp />
          </div>
          <dv-border-box-4 class="rmc-bottom-container">
              <Bottom-Left-Chart-1 />
              <Bottom-Left-Chart-2 />
              <Bottom-Right-Table-1 />
              <Bottom-Right-Table-2 />
          </dv-border-box-4>
        </div> -->
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>

<script>
import RenYuanLeftCmp from './RenYuanLeftCmp'
import RenYuanMiddleCmp from './RenYuanMiddleCmp'
import RenYuanRightCmp from './RenYuanRightCmp'


export default {
  name: 'renyuanDataView',
  components: {
    RenYuanLeftCmp,
    RenYuanMiddleCmp,
    RenYuanRightCmp,
  },
  data () {
    return {}
  },
  methods: {
    allView(){
          screenfull.request() //默认显示全屏
    },
	  toHome(){
      this.$router.push({
      			name:'dashboard'
      })
		 }

  }

}
</script>

<style lang="less">
#renyuan-data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;
  z-index: 9999;
  position: absolute;
  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }
  
  .right-container {
    width: 28%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .left-chart-container {
    width: 22%;
    padding: 10px;
    box-sizing: border-box;
    .border-box-content {
      flex-direction: column;
    }
  }
  .middle-chart-container {
    width: 56%;
    padding-left: 5px;
    box-sizing: border-box;
  }
   .right-chart-container {
    width: 22%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .right-main-container {
    width: 78%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    height: 65%;
    display: flex;
  }
  .rmc-bottom-container {
    height:60%;
  }
  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);
      a:visited {
        color: rgb(1,134,187);
      }
    }
    .mh-middle {
      font-size: 30px;
    }
    .mh-left, .mh-right {
      width: 450px;
    }
  }
  .main-container {
    // height: calc(~"100% - 80px");
    height: 100%;
     .mc-top, .mc-bottom {
      box-sizing: border-box;
      padding: 30px;
      display: flex;
    }
    .mc-top {
      height: 40%;
    }
    .mc-bottom {
      height: 60%;
    }
    .bottom-left-container {
      width: 28%
    }
    .ren-yuan-left-cmp {
      width:100%;
      height: 100%;
    }
    .top-middle-cmp{
      width:71%;
    }
    .top-right-cmp {
      width: 29%;
    }
    .bottom-left-container {
      position: relative;
      .border-box-content {
        display: flex;
      }
    
    }
    .bottom-right-container {
      width:72%;
      padding-left: 30px;
      box-sizing: border-box;
      display: flex;
      .mcb-decoration-1, .mcb-decoration-2 {
        position: absolute;
        left: 46%;
        margin-left: -2px;
      }
      .mcb-decoration-1 {
        top: 44%;
        transform: rotate(180deg);
      }
      .mcb-decoration-2 {
        top: 50%;
      }
      .bottom-left-chart-1, .bottom-left-chart-2 {
        width: 50%;
        height: 100%;
      }
    }
    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }
  .rmctc-left-container {
    width: 65%;
  }
  .rmctc-right-container {
    width: 35%;
  }
  .rmctc-chart-1, .rmctc-chart-2 {
    height: 50%;
  }
}

</style>