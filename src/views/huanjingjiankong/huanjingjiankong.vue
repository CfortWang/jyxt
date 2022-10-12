<template>
  <div class="test-content">
    <div class="title">环境监控</div>
    <div class="body-content">
      <div class="infoShow">
        <div class="title">监控数据</div>
        <div class="control-data">
          <div class="dmo">
            <div class="left-icon">
              <div>
                <i
                  class="el-icon-school"
                  style="font-size: 30px; color: #70cae5"
                ></i>
              </div>
              <div class="room-name">试剂库1</div>
            </div>
            <div class="right-target">
              <div class="wendu item">
                温度:
                <span
                  >25℃
                  <i
                    class="el-icon-minus"
                    style="color: #3399ff; font-size: 18px; padding-left: 4px"
                  ></i
                ></span>
              </div>
              <div class="shidu item">
                湿度:
                <span
                  >91%
                  <i
                    class="el-icon-minus"
                    style="color: #3399ff; font-size: 18px; padding-left: 4px"
                  ></i
                ></span>
              </div>
              <div class="qiya item">
                气压:
                <span
                  >15pa
                  <i
                    class="el-icon-minus"
                    style="color: #3399ff; font-size: 18px"
                  ></i
                ></span>
              </div>
            </div>
          </div>
          <div class="dmo">
            <div class="left-icon">
              <div>
                <i
                  class="el-icon-school"
                  style="font-size: 30px; color: #70cae5"
                ></i>
              </div>
              <div class="room-name">试剂库2</div>
            </div>
            <div class="right-target">
              <div class="wendu item">
                温度:
                <span
                  >25℃
                  <i
                    class="el-icon-minus"
                    style="color: #3399ff; font-size: 18px; padding-left: 4px"
                  ></i
                ></span>
              </div>
              <div class="shidu item">
                湿度:
                <span
                  >91%
                  <i
                    class="el-icon-minus"
                    style="color: #3399ff; font-size: 18px; padding-left: 4px"
                  ></i
                ></span>
              </div>
              <div class="qiya item">
                气压:
                <span
                  >15pa
                  <i
                    class="el-icon-minus"
                    style="color: #3399ff; font-size: 18px; padding-left: 4px"
                  ></i
                ></span>
              </div>
            </div>
          </div>
          <div class="dmo active">
            <div class="left-icon">
              <div>
                <i
                  class="el-icon-school"
                  style="font-size: 30px; color: #70cae5"
                ></i>
              </div>
              <div class="room-name">培养室2</div>
            </div>
            <div class="right-target">
              <div class="wendu item item_active">
                温度:
                <span
                  >25℃
                  <i
                    class="el-icon-top"
                    style="color: red; font-size: 18px; padding-left: 4px"
                  ></i
                ></span>
              </div>
              <div class="shidu item">
                湿度:
                <span
                  >91%
                  <i
                    class="el-icon-top"
                    style="color: red; font-size: 18px; padding-left: 4px"
                  ></i
                ></span>
              </div>
              <div class="qiya item">
                气压:
                <span
                  >15pa
                  <i
                    class="el-icon-bottom"
                    style="color: #67c23a; font-size: 18px"
                  ></i
                ></span>
              </div>
            </div>
          </div>
          <!-- <span class="room">试剂库1:</span
          ><span class="room-data">温度:25℃,湿度:71.6%</span>
        </div>
        <div class="control-data">
          <span class="room">细胞培养室：</span
          ><span class="room-data">温度:25℃,湿度:51.6%</span>
        </div>
        <div class="control-data active">
          <span class="room">产物分析室：</span
          ><span class="room-data">温度:29℃,湿度:71.6%</span>
          <i
            class="el-icon-warning-outline active-icon"
  
          ></i> -->
        </div>
      </div>
      <div class="mapShow">
        <div class="mapurl"></div>
        <div class="img-box">
          <img src="images/shiyanshijiankong/shiyanshi.png" class="img" alt="" @click="mapEvent" />
          <div
            ref="shijiku1"
            v-for="(item, index) in newweizhi"
            :key="index"
            :style="{ top: `${item.y}px`, left: `${item.x}px` }"
            :class="[index == 1 ? 'shiyanshi_false' : 'shiyanshi_success']"
          ></div>
          <!-- <div  :style="{ top: `${item.y + 10}px`, left: `${item.x}px` }"><i class="el-icon-bell" style="background:red;font-size:20px;   position: absolute;"></i></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screen: [],
      x: 396,
      y: 453,
      newposition: [],
      newweizhi: [],
      weizhi: [
        {
          x: 280,
          y: 619,
        },
        {
          x: 353,
          y: 619,
        },
        {
          x: 436,
          y: 619,
        },
        {
          x: 42,
          y: 241,
        },
        {
          x: 106,
          y: 241,
        },
        {
          x: 48,
          y: 97,
        },
        {
          x: 437,
          y: 234,
        },
        {
          x: 437,
          y: 165,
        },
      ],
      domsize: [
        {
          width: 949,
          height: 757,
        },
        {
          width: 949,
          height: 757,
        },
        {
          width: 949,
          height: 757,
        },
        {
          width: 949,
          height: 757,
        },
        {
          width: 949,
          height: 757,
        },
        {
          width: 949,
          height: 757,
        },
        {
          width: 949,
          height: 757,
        },
        {
          width: 949,
          height: 757,
        },
      ],
    };
  },
  methods: {
    mapEvent(e) {
      console.log(e.offsetX, e.target.width, "  x   ");
      console.log(e.offsetY, e.target.height, "y");
      var dom = document.getElementsByClassName("img-box");
      var doms = document.getElementsByClassName("shijiku2");
      doms.style.top = "300px";
      doms.style.left = "600px";
      console.log(dom[0].clientHeight);
    },
  },
  mounted() {
    var dom = document.getElementsByClassName("img");
    this.screen = [];
    this.screen.push(dom[0].clientWidth);
    this.screen.push(dom[0].clientHeight);
    this.weizhi.forEach((item, index) => {
      this.x = parseInt((item.x * this.screen[0]) / this.domsize[index].width);
      this.y = parseInt((item.y * this.screen[1]) / this.domsize[index].height);
      var newobj = { x: "", y: "" };
      newobj.x = this.x;
      newobj.y = this.y;
      this.newweizhi.push(newobj);
    });

    // window.onresize = () => {
    //   console.log(122222);
    //   var dom = document.getElementsByClassName("img");
    //   this.screen = [];
    //   this.screen.push(dom[0].clientWidth);
    //   this.screen.push(dom[0].clientHeight);
    //   //[34,237]
    // };
  },
  // watch: {
  //   screen: function (newdata, olddata) {
  //     if (olddata.length == 0) {
  //       return;
  //     }
  //     console.log(newdata, olddata, this.x, this.y, "2222222222222");
  //     var newx, newy;
  //     newx = parseInt((this.x * newdata[0]) / olddata[0]);
  //     newy = parseInt((this.y * newdata[1]) / olddata[1]);
  //     this.$refs.shijiku.style.left = newx + "px";
  //     this.$refs.shijiku.style.top = newy + "px";
  //     console.log(newx, newy, "xyssss");
  //   },
  // },
};
</script>

 <style lang="scss" scoped>
.test-content {
  .title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
  }
  .body-content {
    display: flex;

    border: 1px solid bisque;

    .infoShow {
      flex-grow: 0;
      width: 360px;
      padding-left: 20px;
      background-color: #ffffff;
      .title {
        text-align: left;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
        color: #666666;
      }
      .control-data {
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;
        .active {
          background: #f56c6c;
        }
        .dmo {
          margin-top: 10px;
          margin-left: 10px;
          display: flex;
          border: 2px solid #67a8ec;
          padding: 5px;
          border-radius: 5px;
          .left-icon {
            text-align: center;
            .room-name {
              color: #333333;
            }
          }
          .right-target {
            margin-left: 5px;
            color: #666;
            font-size: 12px;

            .item {
              height: 20px;
              line-height: 20px;
            }
            .item_active{
              color: rgb(171, 252, 10);
            }
          }
          .right-target > div > span {
            color: #338de6;
          }
        }
        //   .room {
        //     margin-right: 10px;
        //   }
        //   .active-icon {
        //     text-align: center;
        //     color: wheat;
        //     background: #fd4343;
        //     border-radius: 50%;
        //     font-size: 18px;
        //   }
      }
    }
    .mapShow {
      flex-grow: 1;
      .mapurl {
        // background-image: url("images/shiyanshijiankong/shiyanshi.png");
        background-repeat: no-repeat;
        // background-size: auto;
        background-size: contain;
        background-position: center 0;
      }
    }
    .img-box {
      width: 100%;
      padding-right: 100px;

      position: relative;
      .img {
        background-size: contain;
        width: 95%;
        height: calc(100vh - 180px);
      }
      .shiyanshi_success {
        width: 20px;
        height: 20px;
        position: absolute;

        border-radius: 50%;
        z-index: 99;
        animation: traffic-light 2s linear 4s infinite;
        text-align: center;
        @keyframes traffic-light {
          from {
            background: transparent; /* 黄灯 */

            box-shadow: 0px 0 15px 0 transparent; /* 黄灯光影 */
          }
          50% {
            background: #a7f09e; /* 黄灯 */

            box-shadow: 0px 0 15px 0 #82d277; /* 黄灯光影 */
          }
          to {
            background: transparent; /* 黄灯 */

            box-shadow: 0px 0 15px 0 transparent; /* 黄灯光影 */
          }
        }
      }
      .shiyanshi_false {
        width: 20px;
        height: 20px;
        position: absolute;

        border-radius: 50%;
        z-index: 99;
        animation: waring-false 2s linear 4s infinite;
        text-align: center;
        @keyframes waring-false {
          from {
            background: transparent; /* 黄灯 */

            box-shadow: 0px 0 15px 0 transparent; /* 黄灯光影 */
          }
          50% {
            background: #f56c6c; /* 黄灯 */

            box-shadow: 0px 0 15px 0 #f82d2d; /* 黄灯光影 */
          }

          to {
            background: transparent; /* 黄灯 */

            box-shadow: 0px 0 15px 0 transparent; /* 黄灯光影 */
          }
        }
      }
    }
  }
}
</style>