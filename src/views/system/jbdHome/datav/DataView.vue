<template>
	<div  id="data-view">
		   <dv-full-screen-container>
			 <top-header :titleName="outputData.headerName"/>

    <div
                   style="width: 8%;
                     cursor: pointer;
                      height:2.825rem;
                      line-height: 2.825rem;
                      text-align:center;
                      margin-left:63%;
                      margin-top: 2.5%;
                      flex: 1;
                      position: absolute;
                      color: #FFFFFF;">
        <el-date-picker
          v-model="queryDate"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="日期选择"
          style="width:130px"
          :readonly="false"
          :editable="true"
          :clearable="false"
        />

      </div>
    <div @click.prevent="toHome()"
                   style="width: 8%;
                     cursor: pointer;
                      height:2.825rem;
                      line-height: 2.825rem;
                      text-align:center;
                      margin-left:75%;
                      margin-top: 2.5%;
                      flex: 1;
                      position: absolute;
                      color: #FFFFFF;">

                <dv-border-box-8>
                         返回
                      </dv-border-box-8>
      </div>

			  <div class="main-content">
				<digital-flop />
				<div class="block-left-right-content">

				  <div class="block-top-bottom-content">
					<!-- <div class="block-top-content">




					  <scroll-board />
					</div> -->

					<cards3 />
          <cards4 />
				  </div>
				</div>
			  </div>
		   </dv-full-screen-container>
   </div>
</template>

<script>
import cards3 from './cards3'
import cards4 from './cards4'
import topHeader from './topHeader'
import digitalFlop from './digitalFlop'
import roseChart from './roseChart'

import scrollBoard from './scrollBoard'
import screenfull from 'screenfull'
import IbpsDateRange from '@/components/ibps-date-range'

export default {
  name: 'DataView',
  components: {
    cards3,
    cards4,
    topHeader,
    digitalFlop,
    IbpsDateRange
  },
  data () {
    return {
    queryDate:"2022-03-02",
		outputData:{
			headerName:'检测综合信息查询',

		}

	}
  },
 created() {
    if(screenfull.isEnabled && !screenfull.isFullscreen){
    this.allView()
    }
  },
  beforeDestroy() {
      if(screenfull.isFullscreen){
        screenfull.toggle()
        }
    },
  methods: {
    allView(){
          screenfull.request() //默认显示全屏
    },
	  toHome(){
      			this.$router.back(-1)
		 }
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  position: absolute;
  color: #fff;
  z-index:9999;
  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 0.8%;
  }
  .block-top-bottom-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left:  0.8%;
  }
  // .block-top-content {
  //   height: 55%;
  //   display: flex;
  //   flex-grow: 0;
  //   box-sizing: border-box;
  //   padding-bottom:  0.8%;
  // }
}
</style>
