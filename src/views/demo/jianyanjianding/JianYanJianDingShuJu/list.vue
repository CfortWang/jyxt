<template>
  <div id="jianyanjianding-data-view">
    <dv-full-screen-container>
     <dv-border-box-1 class="main-container">
        <div class="left-chart-container">
          <Top-Left-Con />
        </div>

        <div class="right-main-container">
          <div class="mc-top">
              <Top-Middle-Con />
              <Top-right-Con />
          </div>
          <dv-decoration-10 style="width:100%;height:5px;" />
          <div class="rmc-bottom-container">
              <Bottom-Middle-Con />
              <Bottom-right-Con />
          </div>
        </div>
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>

<script>
import TopLeftCon from './TopLeftCon'
import TopMiddleCon from './TopMiddleCon'
import TopRightCon from './TopRightCon'
import BottomMiddleCon from './BottomMiddleCon'
import BottomRightCon from './BottomRightCon'

export default {
  name: 'jianyanjiandingDataView',
  components: {
    TopLeftCon,
    TopMiddleCon,
    TopRightCon,
    BottomMiddleCon,
    BottomRightCon
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
#jianyanjianding-data-view {
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
   .left-chart-container {
     width: 28%;
     margin-right: 1%;
    padding: 10px;
    box-sizing: border-box;
    .border-box-content {
      flex-direction: column;
    }
  }
  .right-main-container {
    width: 71%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .main-container {
    // height: calc(~"100% - 80px");
    height: 100%;
     .mc-top, .rmc-bottom-container {
      box-sizing: border-box;
      padding: 30px;
      display: flex;
    }
    .mc-top {
      height: 50%;
    }
    .rmc-bottom-container {
      height: 50%;
    }
    .bottom-left-container {
      width: 28%
    }
    .top-left-con {
      width:100%;
      height: 100%;
    }
    .top-middle-con{
      width:60%;
    }
    .top-right-con {
      width: 40%;
    }
    .bottom-middle-con{
      width:60%;
    }
    .bottom-right-con {
      width: 40%;
    }
    .bottom-left-container {
      position: relative;
      .border-box-content {
        display: flex;
      }

    }
    .border-box-content {
      // padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }
}
</style>
