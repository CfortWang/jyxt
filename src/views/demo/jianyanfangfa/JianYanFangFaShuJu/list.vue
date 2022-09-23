<template>
  <div id="fangfa-data-view">
    <dv-full-screen-container>
      <dv-border-box-2 class="main-container">
        <div class="left-container">
          <Left-Cmp />
        </div>

        <div class="middle-container">
          <Middle-Cmp />
        </div>

        <div class="right-container">
          <Right-Cmp />
        </div>

      </dv-border-box-2>
    </dv-full-screen-container>
  </div>
</template>

<script>
import LeftCmp from './LeftCmp'
import MiddleCmp from './MiddleCmp'
import RightCmp from './RightCmp'

export default {
  name: 'fangfaDataView',
  components: {
    LeftCmp,
    MiddleCmp,
    RightCmp
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
#fangfa-data-view {
  width: 100%;
  height: 100%;
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
  .main-container {
    // height: calc(~"100% - 80px");
    height: 100%;
    .border-box-content {
      display: flex;
      flex: 1;
      -webkit-box-flex: 1;
    }
  }
  .left-container {
    width: 28%;
    padding: 10px;
    height: 100%;
  }
  .middle-container {
    width: 44%;
    padding: 10px 0;
    height: 100%;
  }
  .right-container {
    width: 28%;
    padding: 10px;
    height: 100%;
  }
  .left-container, .middle-container, .right-container{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // flex-direction: column;
  }
}

</style>


