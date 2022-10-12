<template>
  <div id="zhiliang-data-view">
    <dv-full-screen-container>
      <div class="main-container">
        <div class="left-container">
          <Left-Com />
        </div>

        <div class="middle-container">
          <Middle-Com />
        </div>

        <div class="right-container">
          <Right-Com />
        </div>

      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import LeftCom from './LeftCom'
import MiddleCom from './MiddleCom'
import RightCom from './RightCom'

export default {
  name: 'zhiliangDataView',
  components: {
    LeftCom,
    MiddleCom,
    RightCom
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
#zhiliang-data-view {
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
  .main-container {
    // height: calc(~"100% - 80px");
    height: 100%;
    display: flex;
    flex: 1;
    -webkit-box-flex: 1;
    .border-box-content {
      flex-direction: column;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
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


