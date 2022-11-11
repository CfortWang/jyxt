<template>
  <div class="test-content">
    <div class="title">
      <div class="title-center" style="font-size: 26px; color: #c12530">
        明鉴检测实验室温湿度负压动态监控系统
      </div>
      <div class="info-right">
        <span style="color: #c12530; margin-right: 5px">采集时间:</span
        ><span style="color: #276bcc; margin-right: 15px">{{ newTiMe }}</span>
        <button @click="returnBlack" class="black">返回</button>
      </div>
    </div>
    <div class="body-content">
      <div class="marquee-wrap" v-if="false">
        <div>
          <ul
            class="marquee-list"
            :class="{ 'animate-up': animateUp }"
            :style="{ width: btnShow ? '360px' : '0px' }"
          >
            <li v-for="(item, index) in envirListData" :key="index">
              <span>{{ item.deviceName }}</span> &nbsp;
              <span>{{ item.t1 | numToFixed }}</span
              >&nbsp; <span>{{ item.h1 | numToFixed }}</span
              >&nbsp; <span>{{ item.p1 | numToFixed }}</span
              >&nbsp;
            </li>
          </ul>
          <div class="button">
            <i class="el-icon-caret-right" @click="btnextendRight"></i>
            <i class="el-icon-caret-left" @click="btnextendLeft"></i>
          </div>
        </div>
      </div>
      <div class="mapShow">
        <div class="mapurl"></div>
        <div class="img-box" @click="mapEvent">
          <img
            src="images/shiyanshijiankong/shiyanshi.png"
            class="img"
            alt=""
            ref="wrap"
          />
          <div
            ref="shijiku1"
            v-for="(item, index) in newweizhi"
            :key="index"
            :style="{ top: `${item.y}px`, left: `${item.x}px` }"
            :class="[
              item.run == '1'
                ? item.ifshow == 'false'
                  ? 'shiyanshi_false'
                  : 'shiyanshi_success'
                : 'bggray',
            ]"
          >
            <!-- <div
              :class="[item.ifshow == 'false' ? 'contentshow' : 'content']"
              v-show="item.run == 1"
            > -->
            <div class="contentshow">
              <div class="envir-conditoin" v-show="item.temp?true:false">温度:{{ item.temp }}</div>
              <div class="envir-conditoin" v-show="item.humidness?true:false">湿度:{{ item.humidness }}</div>
              <div class="envir-conditoin">气压:{{ item.airPressure }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="controlStatus">
        <div class="noControl">
          <span class="gray"></span><span style="margin-left: 30px">未控</span>
        </div>
        <div class="yesControl">
          <span class="green"></span>
          <span style="margin-left: 30px">在控</span>
        </div>
        <div class="runWild">
          <span class="red"></span>
          <span><span style="margin-left: 30px">失控</span> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import curdPost from "@/business/platform/form/utils/custom/joinCURD.js";
export default {
  name: "DataView",
  data() {
    return {
      btnShow: true,
      animateUp: false,
      envirListData: [],
      fullHeight: "",
      fullWidth: "",
      list: [
        {
          room: "*HAU01",
          time: "2020-07-08 18:27:23",
          temp: "20",
        },
        {
          room: "*HAU01",
          time: "2020-07-08 18:27:23",
          temp: "20",
        },
        {
          room: "*HAU01",
          time: "2020-07-08 18:27:23",
          temp: "20",
        },
        {
          room: "*HAU01",
          time: "2020-07-08 18:27:23",
          temp: "20",
        },
        {
          room: "*HAU01",
          time: "2020-07-08 18:27:23",
          temp: "20",
        },
      ],
      screen: [],
      x: 396,
      y: 453,
      newposition: [],
      newweizhi: [],
      newTiMe: "",
      weizhi: [
        {
          //细胞
          x: 463,
          y: 653,
        },
        {
          x: 584,
          y: 653,
        },
        {
          x: 719,
          y: 653,
        },
        {
          x: 847,
          y: 653,
        },
        {
          //分练区
          x: 1460,
          y: 655,
        },
        {
          x: 1460,
          y: 450,
        },
        {
          //支原体
          x: 713,
          y: 260,
        },
        {
          //无菌检测室
          x: 724,
          y: 89,
        },
        //产物分析室
        {
          x: 950,
          y: 127,
        },
        {
          x: 1062,
          y: 127,
        },
        {
          x: 1205,
          y: 127,
        },
        {
          x: 1353,
          y: 127,
        },
        {
          //支原体阳性
          x: 321,
          y: 99,
        },
        {
          x: 357,
          y: 200,
        },
        //细胞->更
        {
          x: 584,
          y: 420,
        },
        {
          x: 584,
          y: 480,
        },
        {
          x: 640,
          y: 465,
        },
        {
          x: 710,
          y: 480,
        },
        {
          
          x: 710,
          y: 420,
        },
        {
          x: 584,
          y: 547,
        },
        // 分练区 ->更
        {
          x: 1390,
          y: 560,
        },
        {
          x: 1450,
          y: 525,
        },
        {
          x: 1495,
          y: 570,
        },
        {//支原体检测->更
          x: 850,
          y: 250,
        },
        {
          
          x: 780,
          y: 290,
        },
        {
          x: 780,
          y: 235,
        },

        {
          //无菌检测->更
          x: 850,
          y: 180,
        },
        {
          x: 850,
          y: 70,
        },
        { //产物分析室->更
          x: 1098,
          y: 270,
        },
        { 
          x: 1355,
          y: 270,
        },
        {
         
          x: 965,
          y: 220,
        },
        {
          x: 1088,
          y: 220,
        },
        {
          x: 1190,
          y: 220,
        },
        //无菌阳性->
        {
          x: 250,
          y: 280,
        },
        {
          x: 250,
          y: 220,
        },
        {
          x: 250,
          y: 170,
        },
        {
          x: 340,
          y: 280,
        },
        {
          //支原体阳性->更
          x: 400,
          y: 280,
        },

        {
          x: 250,
          y: 280,
        },

      ],
      domsize: [
        {
          width: 1560,
          height: 857,
        },
      ],
      timelistData: [],
      ifshow: true,
      setIntervalDis: false,
    };
  },
  filters: {
    numToFixed: function (value) {
      return value.toFixed(2);
    },
  },
  methods: {
    envirData() {
      let sqlString =
        "select * FROM DATA WHERE deviceName IN ('HAU01','HAU02','HAU03','HAU04','PAU01','PAU02')  ORDER BY saveTime DESC LIMIT 12";
      var this_ = this;
      curdPost("sql", sqlString).then((response) => {
        this_.envirListData = response.variables.data;
      });
    },
    returnBlack() {
      this.$router.back(-1);
    },
    fmtDate(obj) {
      var date = new Date(obj);
      var y = 1900 + date.getYear();
      var m = "0" + (date.getMonth() + 1);
      var d = "0" + date.getDate();
      var h = date.getHours();
      var min = date.getMinutes();
      var s = date.getMinutes();
      return (
        y +
        "-" +
        m.substring(m.length - 2, m.length) +
        "-" +
        d.substring(d.length - 2, d.length) +
        "  " +
        h +
        ":" +
        min +
        ":" +
        s
      );
    },
    scrollAnimate() {
      // this.animateUp = true;
      let this_ = this;
      let sqlString =
        "select * FROM DATA WHERE deviceName IN ('HAU01','HAU02','HAU03','HAU04','PAU01','PAU02')  ORDER BY saveTime DESC LIMIT 6";
      let newdata = [];
      curdPost("sql", sqlString).then((response) => {
        newdata = response.variables.data;
        console.log(newdata);
        this_.newTiMe = this_.fmtDate(newdata[0].saveTime);
        for (let i = 0; i < newdata.length; i++) {
          setTimeout(() => {
            this_.envirListData.push(newdata[i]);
            this_.envirListData.shift();
            this_.animateUp = true;
          }, 3000 * (i + 1));
        }
        // clearTimeout(timer)
      });
    },
    btnextendRight() {
      this.btnShow = !this.btnShow;
      this.screenChange();
      this.mapChange();
    },
    btnextendLeft() {
      this.btnShow = !this.btnShow;
      this.screenChange();
      this.mapChange();
    },
    mapEvent(e) {
      console.log(e.offsetX, e.offsetY, "  x   ");
      console.log(e.target.height, e.target.width, "y");
    },
    screenChange() {
      this.fullHeight = `${document.documentElement.clientHeight}`;
      // this.fullWidth = `${document.documentElement.clientWidth}`; //默认值
      const that = this;
      // that.domsize = [];
      // that.domsize.push({
      //   width: that.$refs.wrap.offsetWidth,
      //   height: that.$refs.wrap.offsetHeight,
      // });
      // console.log(that.domsize, "domsizethat");
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          that.fullHeight = window.fullHeight;
          // window.clientWidth = document.documentElement.clientWidth;
          // that.fullWidth = window.fullWidth;
        })();
      };
    },
    mapChange() {
      //图片变动函数
      let this_ = this;
      setTimeout(() => {
        var dom = document.getElementsByClassName("img");
        this_.screen = [];
        this_.screen.push(dom[0].clientWidth);
        this_.screen.push(dom[0].clientHeight);
        this_.newweizhi = [];
        this_.weizhi.forEach((item, index) => {
          this_.x = parseInt(
            (item.x * this_.screen[0]) / this_.domsize[0].width
          );
          this_.y = parseInt(
            (item.y * this_.screen[1]) / this_.domsize[0].height
          );
          var newobj = {
            x: "",
            y: "",
            temp: "",
            humidness: "",
            airPressure: "",
            ifshow: "",
            run: "",
          };
          newobj.x = this_.x;
          newobj.y = this_.y;
          newobj.temp = "";
          newobj.humidness = "";
          newobj.airPressure = "";
          newobj.ifshow = "";
          this_.newweizhi.push(newobj);
        });
      }, 10);
    },
    setIntervalData() {
      //刷新频率
      let this_ = this;
      var timer = setInterval(() => {
        if (this_.setIntervalDis == true) {
          clearInterval(timer);
          return;
        }
        this_.screenChange();
        this_.mapChange();
        this_.timeData();
      }, 300000); /// 300000
    },
    returnifShow(t, h, p,qiya) {
       let ifshow = "";
       if(t==999&&h===999){
        ifshow = "true";
        return ifshow;
       }
      let temp = t.toFixed(2);
      let humidness = h.toFixed(2);
      let airPressure = p.toFixed(2);
      // let ifshow = "";
     
      if (temp > 999 || temp <= 0) {
        //不给予赋值
      } else if (temp >= 18 && temp <= 26) {
        ifshow = "true";
      } else {
        ifshow = "false";
      }
      if (humidness > 999 || humidness <= 0) {
      } else if (humidness >= 35 && humidness <= 75) {
        ifshow = "true";
      } else {
        ifshow = "false";
      }
      if (airPressure > 999) {
        //不给予赋值
      } else if (airPressure >= qiya) {
        ifshow = "true";
      } else {
        ifshow = "false";
      }
      return ifshow;
    },

    timeData() {
      // 大屏数据列表赋值
      let this_ = this;
      let sql =
        "select * FROM DATA WHERE deviceName = 'HAU01'  ORDER BY saveTime DESC LIMIT 1";
      curdPost("sql", sql).then((res) => {
        let data = res.variables.data;
        this_.newweizhi[0].temp = data[0].t1;
        this_.newweizhi[0].humidness = data[0].h1;
        this_.newweizhi[0].airPressure = data[0].p6;
        this_.newweizhi[0].run = data[0].run;
        this_.newTiMe = this_.fmtDate(data[0].saveTime);
        this_.newweizhi[0].ifshow = this_.returnifShow(
          //数据范围校准
          data[0].t1,
          data[0].h1,
          data[0].p6,
          5
        );

        this_.newweizhi[1].temp = data[0].t2;
        this_.newweizhi[1].humidness = data[0].h2;
        this_.newweizhi[1].airPressure = data[0].p7;
        this_.newweizhi[1].run = data[0].run;
        this_.newweizhi[1].ifshow = this_.returnifShow(
          data[0].t2,
          data[0].h2,
          data[0].p7,
          5
        );

        this_.newweizhi[2].temp = data[0].t3;
        this_.newweizhi[2].humidness = data[0].h3;
        this_.newweizhi[2].airPressure = data[0].p8;
        this_.newweizhi[2].run = data[0].run;
        this_.newweizhi[2].ifshow = this_.returnifShow(
          data[0].t3,
          data[0].h3,
          data[0].p8,
          5
        );
        this_.newweizhi[3].temp = data[0].t4;
        this_.newweizhi[3].humidness = data[0].h4;
        this_.newweizhi[3].airPressure = data[0].p9;
        this_.newweizhi[3].run = data[0].run;
        this_.newweizhi[3].ifshow = this_.returnifShow(
          data[0].t4,
          data[0].h4,
          data[0].p9,
          5
        );
        this_.newweizhi[14].airPressure = data[0].p1;
        this_.newweizhi[14].ifshow = this_.returnifShow(999,999,data[0].p1,10);
        this_.newweizhi[14].run = data[0].run;

        this_.newweizhi[15].airPressure = data[0].p2;
        this_.newweizhi[15].ifshow = this_.returnifShow(999,999,data[0].p2,10);
        this_.newweizhi[15].run = data[0].run;

        this_.newweizhi[16].airPressure = data[0].p3;
        this_.newweizhi[16].ifshow = this_.returnifShow(999,999,data[0].p3,5);
        this_.newweizhi[16].run = data[0].run;

        this_.newweizhi[17].airPressure =data[0].p4;
        this_.newweizhi[17].ifshow = this_.returnifShow(999,999,data[0].p4,5);
        this_.newweizhi[17].run = data[0].run;

        this_.newweizhi[18].airPressure = data[0].p5;
        this_.newweizhi[18].ifshow = this_.returnifShow(999,999,data[0].p5,10);
        this_.newweizhi[18].run = data[0].run;

        this_.newweizhi[19].airPressure = 6666;
        this_.newweizhi[19].ifshow = this_.returnifShow(999,999,data[0].p10,10);
        this_.newweizhi[19].run = data[0].run;

      });
      let sql1 =
        "select * FROM DATA WHERE deviceName ='HAU02'  ORDER BY saveTime ASC LIMIT 1";
      curdPost("sql", sql1).then((res) => {
        let data = res.variables.data;
        this_.newweizhi[4].temp = data[0].t1;
        this_.newweizhi[4].humidness = data[0].h1;
        this_.newweizhi[4].airPressure = data[0].p4;
        this_.newweizhi[4].run = data[0].run;
        this_.newweizhi[4].ifshow = this_.returnifShow(
          data[0].t1,
          data[0].h1,
          data[0].p4,
          5
        );
        this_.newweizhi[5].temp = data[0].t2;
        this_.newweizhi[5].humidness = data[0].h2;
        this_.newweizhi[5].airPressure = data[0].p5;
        this_.newweizhi[5].run = data[0].run;
        this_.newweizhi[5].ifshow = this_.returnifShow(
          data[0].t2,
          data[0].h2,
          data[0].p5,
          5
        );
        
        this_.newweizhi[20].airPressure = data[0].p1;
        this_.newweizhi[20].ifshow = this_.returnifShow(999,999,data[0].p1,10);
        this_.newweizhi[20].run = data[0].run;

        this_.newweizhi[21].airPressure = data[0].p2;
        this_.newweizhi[21].ifshow = this_.returnifShow(999,999,data[0].p2,10);
        this_.newweizhi[21].run = data[0].run;

        this_.newweizhi[22].airPressure = data[0].p3;
        this_.newweizhi[22].ifshow = this_.returnifShow(999,999,data[0].p3,5);
        this_.newweizhi[22].run = data[0].run;



      });
      let sql2 =
        "select * FROM DATA WHERE deviceName ='HAU03' ORDER BY saveTime DESC LIMIT 1";//支原体室
      curdPost("sql", sql2).then((res) => {
        let data = res.variables.data;
        this_.newweizhi[6].temp = data[0].t1;
        this_.newweizhi[6].humidness = data[0].h1;
        this_.newweizhi[6].airPressure = data[0].p4;
        this_.newweizhi[6].run = data[0].run;
        this_.newweizhi[6].ifshow = this_.returnifShow(
          data[0].t1,
          data[0].h1,
          data[0].p4,
          5
        );
        this_.newweizhi[23].airPressure = data[0].p1
        this_.newweizhi[23].ifshow = this_.returnifShow(999,999,data[0].p1,10);
        this_.newweizhi[23].run = data[0].run;

        this_.newweizhi[24].airPressure = data[0].p2
        this_.newweizhi[24].ifshow = this_.returnifShow(999,999,data[0].p2,10);
        this_.newweizhi[24].run = data[0].run;

        this_.newweizhi[25].airPressure = data[0].p3;
        this_.newweizhi[25].ifshow = this_.returnifShow(999,999,data[0].p3,5);
        this_.newweizhi[25].run = data[0].run;


      });
      let sql3 =
        "select * FROM DATA WHERE deviceName ='HAU04'  ORDER BY saveTime DESC LIMIT 1";
      curdPost("sql", sql3).then((res) => {
        let data = res.variables.data;
        this_.newweizhi[7].temp = data[0].t1;
        this_.newweizhi[7].humidness = data[0].h1;
        this_.newweizhi[7].airPressure = data[0].p3;
        this_.newweizhi[7].run = data[0].run;
        this_.newweizhi[7].ifshow = this_.returnifShow(
          data[0].t1,
          data[0].h1,
          data[0].p3,
          5
        );
        this_.newweizhi[26].airPressure = data[0].p1
        this_.newweizhi[26].ifshow = this_.returnifShow(999,999,data[0].p1,10);
        this_.newweizhi[26].run = data[0].run;

        this_.newweizhi[27].airPressure = data[0].p2;
        this_.newweizhi[27].ifshow = this_.returnifShow(999,999,data[0].p2,5);
        this_.newweizhi[27].run = data[0].run;




      });
      let sql4 =
        "select * FROM DATA WHERE deviceName ='PAU01'  ORDER BY saveTime DESC LIMIT 1";
      curdPost("sql", sql4).then((res) => {
        let data = res.variables.data;
        this_.newweizhi[8].temp = data[0].t1;
        this_.newweizhi[8].humidness = data[0].h1;
        this_.newweizhi[8].airPressure = data[0].p9;//产物
        this_.newweizhi[8].run = data[0].run;
        this_.newweizhi[8].ifshow = this_.returnifShow(
          data[0].t1,
          data[0].h1,
          data[0].p9,
          -10
        );
        this_.newweizhi[9].temp = data[0].t2;
        this_.newweizhi[9].humidness = data[0].h2;
        this_.newweizhi[9].airPressure = data[0].p7;//扩增
        this_.newweizhi[9].run = data[0].run;
        this_.newweizhi[9].ifshow = this_.returnifShow(
          data[0].t2,
          data[0].h2,
          data[0].p7,
          -25
        );
        this_.newweizhi[10].temp = data[0].t3;
        this_.newweizhi[10].humidness = data[0].h3;
        this_.newweizhi[10].airPressure = data[0].p5;//样本制备
        this_.newweizhi[10].run = data[0].run;
        this_.newweizhi[10].ifshow = this_.returnifShow(
          data[0].t3,
          data[0].h3,
          data[0].p5,
          5
        );
        this_.newweizhi[11].temp = data[0].t4;
        this_.newweizhi[11].humidness = data[0].h4;
        this_.newweizhi[11].airPressure = data[0].p3;//试剂准备
        this_.newweizhi[11].run = data[0].run;
        this_.newweizhi[11].ifshow = this_.returnifShow(
          data[0].t4,
          data[0].h4,
          data[0].p3,
          15
        );
        this_.newweizhi[28].airPressure = data[0].p1; //pcr
        this_.newweizhi[28].ifshow = this_.returnifShow(999,999,data[0].p1,5);
        this_.newweizhi[28].run = data[0].run;

        this_.newweizhi[29].airPressure = data[0].p2;//试剂准备缓冲
        this_.newweizhi[29].ifshow = this_.returnifShow(999,999,data[0].p2,5);
        this_.newweizhi[29].run = data[0].run;

        this_.newweizhi[30].airPressure = data[0].p8//产物缓冲
        this_.newweizhi[30].ifshow = this_.returnifShow(999,999,data[0].p8,5);
        this_.newweizhi[30].run = data[0].run;

        this_.newweizhi[31].airPressure = data[0].p6;//扩增缓冲
        this_.newweizhi[31].ifshow = this_.returnifShow(999,999,data[0].p6,5);
        this_.newweizhi[31].run = data[0].run;

        this_.newweizhi[32].airPressure = data[0].p4//样本制备缓冲
        this_.newweizhi[32].ifshow = this_.returnifShow(999,999,data[0].p4s,5);
        this_.newweizhi[32].run = data[0].run;


      });
      let sql5 =
        "select * FROM DATA WHERE deviceName ='PAU02'  ORDER BY saveTime DESC LIMIT 1";
      curdPost("sql", sql5).then((res) => {
        let data = res.variables.data;
        this_.newweizhi[12].temp = data[0].t1;
        this_.newweizhi[12].humidness = data[0].h1;
        this_.newweizhi[12].airPressure = data[0].p4;
        this_.newweizhi[12].run = data[0].run;
        this_.newweizhi[12].ifshow = this_.returnifShow(
          data[0].t1,
          data[0].h1,
          data[0].p1
        );
        this_.newweizhi[13].temp = data[0].t2;
        this_.newweizhi[13].humidness = data[0].h2;
        this_.newweizhi[13].airPressure = data[0].p2;
        this_.newweizhi[13].run = data[0].run;
        this_.newweizhi[13].ifshow = this_.returnifShow(
          data[0].t2,
          data[0].h2,
          data[0].p2
        );

        this_.newweizhi[33].airPressure = data[0].p1;
        this_.newweizhi[33].ifshow = this_.returnifShow(999,999,data[0].p5);
        this_.newweizhi[33].run = data[0].run;

        this_.newweizhi[34].airPressure = data[0].p2;
        this_.newweizhi[34].ifshow = this_.returnifShow(999,999,data[0].p5);
        this_.newweizhi[34].run = data[0].run;

        this_.newweizhi[35].airPressure = data[0].p3;
        this_.newweizhi[35].ifshow = this_.returnifShow(999,999,data[0].p5);
        this_.newweizhi[36].run = data[0].run;

        this_.newweizhi[37].airPressure = data[0].p5;
        this_.newweizhi[37].ifshow = this_.returnifShow(999,999,data[0].p5);
        this_.newweizhi[37].run = data[0].run;

        this_.newweizhi[38].airPressure = data[0].p6;
        this_.newweizhi[38].ifshow = this_.returnifShow(999,999,data[0].p5);
        this_.newweizhi[38].run = data[0].run;

        // this_.newweizhi[37].airPressure = data[0].p1;
        // this_.newweizhi[31].ifshow = this_.returnifShow(999,999,data[0].p5);
        // this_.newweizhi[37].run = data[0].run;

        console.log(this_.newweizhi, "新位置数据");
      });
    },
  },
  mounted() {
    this.envirData();
    // this.scrollAnimate()
    // setInterval(this.scrollAnimate, 10000);
    this.screenChange();
    this.mapChange();
    this.timeData();
    this.setIntervalData();
  },
  destroyed() {
    this.setIntervalDis = true;
  },
  watch: {
    // 如果 `fullHeight ` 发生改变，这个函数就会运行
    fullHeight: function (val) {
      this.screenChange();
      this.mapChange();
      this.timeData();
    },
  },
};
</script>

 <style lang="less" scoped>
ul,
li {
  margin: 0;
  padding: 0;
}

.test-content {
  width: 100%;
  height: 100%;
  color: #fff;
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  -webkit-transform-origin: left top;
  transform-origin: left top;
  z-index: 999;
  background: #f5f5f5;
  .title {
    text-align: center;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    .title-center {
      color: #1d1f22;
      display: inline-block;
    }
    .info-right {
      position: absolute;
      top: 0px;
      right: 0px;
    }
    .black {
      opacity: 0;
    }
    .black:hover {
      opacity: 1;
      color: black;
    }
  }
  .body-content {
    display: flex;
    border: 1px solid bisque;
    .marquee-wrap {
      position: relative;
      flex-grow: 0;
      background-color: #f5f5f5;
      overflow: hidden;
      .button {
        position: absolute;
        top: 50%;
        right: -8px;
        color: black;
        opacity: 0;
        i {
          font-size: 30px;
          width: 30px;
          height: 30px;
        }
        .button:hover {
          opacity: 1;
        }
      }
    }
    .marquee-list li {
      text-overflow: ellipsis;
      width: 100%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      // padding: 0 20px;
      list-style: none;
      line-height: 40px;
      text-align: center;
      color: #1d1f22;
      font-size: 18px;
      font-weight: 400;
      text-align: left;
      padding-left: 10px;
    }
    .animate-up {
      transition: all 0.5s ease-in-out;
      transform: translateY(-40px);
    }

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
            .item_active {
              color: rgb(171, 252, 10);
            }
          }
          .right-target > div > span {
            color: #338de6;
          }
        }
      }
    }
    .mapShow {
      margin-right: 10px;
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
        width: 100%;
        height: calc(100vh - 80px);
      }
      .shiyanshi_success {
        width: 20px;
        height: 20px;
        position: absolute;
        border-radius: 50%;
        z-index: 99;
        animation: traffic-light 2s linear 4s infinite;
        text-align: center;
        background: green;
        // @keyframes traffic-light {
        //   from {
        //     background: transparent; /* 黄灯 */

        //     box-shadow: 0px 0 15px 0 transparent; /* 黄灯光影 */
        //   }
        //   50% {
        //     background: #a7f09e; /* 黄灯 */

        //     box-shadow: 0px 0 15px 0 #82d277; /* 黄灯光影 */
        //   }
        //   to {
        //     background: transparent; /* 黄灯 */

        //     box-shadow: 0px 0 15px 0 transparent; /* 黄灯光影 */
        //   }
        // }
      }
      .shiyanshi_false {
        width: 20px;
        height: 20px;
        position: absolute;
        border-radius: 50%;
        z-index: 99;
        animation: waring-false 1s linear 0s infinite;
        text-align: center;
        background: #fa0404;
        @keyframes waring-false {
          from {
            background: transparent; /* 黄灯 */

            box-shadow: 0px 0 15px 0 transparent; /* 黄灯光影 */
          }
          50% {
            background: #fa0404; /* 黄灯 */

            box-shadow: 0px 0 15px 0 #fa0404; /* 黄灯光影 */
          }

          to {
            background: transparent; /* 黄灯 */

            box-shadow: 0px 0 15px 0 transparent; /* 黄灯光影 */
          }
        }
      }
      .bggray {
        width: 20px;
        height: 20px;
        position: absolute;
        border-radius: 50%;
        // z-index: 99;
        animation: traffic-light 2s linear 4s infinite;
        text-align: center;
        background: #828282 !important;
      }
      .contentshow {
        position: absolute;
        z-index: 99;
        width: 90px;
        left: 25px;
        top: 5px;
        color: black;
        z-index: 99;
      }
      .envir-conditoin {
        text-align: left;
        width: 76px;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        z-index: 99;
      }
      .content {
        position: absolute;
        z-index: 99;
        width: 90px;
        left: 30px;
        top: 0px;
        color: black;
        opacity: 0;
      }
      .content:hover {
        opacity: 1;
      }
    }
  }
  .controlStatus {
    position: fixed;
    right: 5px;
    bottom: 10px;
    z-index: 99;
    color: black;
    font-size: 18px;
    div {
      display: inline-block;
      margin-right: 30px;
    }
    .gray,
    .green,
    .red {
      width: 20px;
      height: 20px;
      position: absolute;
      border-radius: 50%;
      text-align: center;
      padding-right: 5px;
    }
    .noControl {
      .gray {
        background: #828282;
      }
    }
    .yesControl {
      .green {
        background: green;
      }
    }
    .runWild {
      .red {
        background: red;
      }
    }
  }
}
</style>