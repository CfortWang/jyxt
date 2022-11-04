<template>
  <div class="sample-content">
    <!-- 表格組件 -->
    <div class="selectPo" @dblclick="positionBtn">
      <el-input type="text" v-model="placeValue" clearable></el-input>
      <!-- <div>{{ placeValue }}</div> -->
      <input type="text" v-model="value" style="opacity: 0; position: fixed" />
    </div>
    <div class="viewArea">
      <div class="select_quyu" v-if="viewShow">
        <div class="test-quyu" v-if="leixingcare">
          <div class="test-list">
            <ul class="list-items">
              <li
                class="list-item quyu-item"
                :style="{
                  background: quyuShow == item.qu_yu_ ? '#FF9900' : '#0099CC',
                }"
                @click="qu_yu_Event"
                v-for="item in quyu_arr"
                :key="item.qu_yu_"
              >
                {{ item.qu_yu_ }}
              </li>
            </ul>
          </div>
        </div>
        <div class="huojia">
          <div class="test-list">
            <ul class="list-items">
              <li
                class="list-item huojia-item"
                :style="{
                  background:
                    huojiashow ==
                    item.huo_jia_hao_ + '号' + item.huo_jia_lei_xing_
                      ? '#ff9900'
                      : '#0099cc',
                }"
                @click="huo_jia_hao_Event"
                v-for="(item, index) in huo_jia_arr"
                :key="index"
              >
                {{ item.huo_jia_hao_ }}号{{ item.huo_jia_lei_xing_ }}
              </li>
            </ul>
          </div>
        </div>
        <div class="huojia">
          <div class="test-list" v-show="!leixingcare">
            <ul class="list-items">
              <li
                class="list-item huojia-item"
                :style="{
                  background:
                    guajiashow == item.gua_jia_hao_ + '号挂件'
                      ? '#FF9900'
                      : '#e5baba',
                }"
                @click="gua_jia_Event"
                v-for="(item, index) in gua_jia_arr"
                :key="index"
              >
                {{ item.gua_jia_hao_ }}号挂件
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="body-content" v-if="viewShow">
        <div class="right-view">
          <div class="goods-items">
            <div
              class="show-demo"
              v-for="(item, index) in listData"
              :key="item"
            >
              <div @click="positionClick(listData[index])">
                <div class="goods-level">
                  <div class="level-dsc">第{{ index }}层</div>
                  <div class="goods-list">
                    <div
                      class="goods-dsc"
                      v-for="(it, ind) in listData[index]"
                      :key="ind"
                      :style="{
                        background:
                          it.wei_zhi_zhuang_ta == '空余' ? '#E6A23C' : '',
                      }"
                    >
                      <div class="top-dsc">
                        <div class="position">
                          <p>位置id：{{ it.shou_yang_wei_zhi }}</p>
                          <p>货位id:{{ it.id_ }}</p>
                          <p>位置编号：{{ it.wei_zhi_bian_hao_ }}</p>
                          <p>样品编号：{{ it.yang_pin_bian_hao }}</p>
                          <p>
                            存储条件：{{
                              it.cun_chu_tiao_jian || it.cun_chu_yao_qiu_
                            }}
                          </p>
                          <p>留样期限：{{ it.liu_yang_qi_xian_ }}</p>
                          <p>样品名称：{{ it.yang_pin_ming_che }}</p>
                          <p>位置状态：{{ it.wei_zhi_zhuang_ta }}</p>
                        </div>
                        <div class="right-content" v-if="false">
                          <p v-if="false">编号:{{ it.liu_yang_qi_xian_ }}</p>
                          <p>
                            {{ it.wei_zhi_zhuang_ta || it.yang_pin_ming_che }}
                          </p>
                          <p v-if="false">
                            存储条件：{{
                              it.cun_chu_tiao_jian || it.cun_chu_yao_qiu_
                            }}
                          </p>
                          <p v-if="false">
                            留样期限：{{ it.liu_yang_qi_xian_ }}
                          </p>
                        </div>
                      </div>
                      <div class="bottom-dsc" v-if="false">
                        {{ it.wei_zhi_zhuang_ta || it.yang_pin_ming_che }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="goodshelf-name"
                style="height: 500px"
                v-if="index == 1"
              >
                {{ desString }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FixHeight from "@/mixins/height";
import curdPost from "@/business/platform/form/utils/custom/joinCURD.js";
export default {
  mixins: [FixHeight],

  data() {
    return {
      sampleOption: [],
      formInline: {
        fang_jian_hao_value: "",
        qu_yu_value: "",
        huo_jia_value: "",
        gua_jia_value: "",
      },
      listData: [],
      warehouseOptions: [],
      quyu_arr: [],
      huo_jia_arr: [],
      gua_jia_arr: [],
      firstLoadActive: true,
      qu_yu_value: "",
      quyuShow: "",
      huojiashow: "",
      guajiashow: "",
      leixingcare: true,
      cenghao: [],
      warehouse: [],
      loading: false,
      // pagination: {},
      // secondshow: false,
      desString: "",
      viewShow: false,
      placeValue: "选择位置",
    };
  },
  props: {
    value: {
      type: [String, Number, Array, Object],
      default: "",
    },
  },
  filters: {
    specimenFilters: function (values) {
      if (values == "空余") {
        return "未占用";
      } else {
        return values;
      }
    },
  },
  // created() {},
  methods: {
    firstLoadViewData() {
      var this_ = this;
      var sqlString = `select * from t_mjypcfwz where fang_jian_lei_xin = '留样间' and qu_yu_ = '' and  huo_jia_lei_xing_ = '冰箱' and huo_jia_hao_ = '1'`;
      this.huojiashow = "1号冰箱";
      this.quyuShow = "";
      this.desString = "留样间" + "1号冰箱";
      this.queryLoad(sqlString);
      this.formInline.fang_jian_hao_value = "留样间";
      this.formInline.qu_yu_value = "";
      this.formInline.huo_jia_value = "1号冰箱";
      let sql = `select distinct qu_yu_ ,huo_jia_hao_ from t_mjypcfwz where fang_jian_lei_xin = '留样间' `;
      curdPost("sql", sql).then((response) => {
        this_.huo_jia_arr = response.variables.data;
      });
    },
    loadQueryData() {
      //查询选择数据查询
      var sqlString =
        "select distinct fang_jian_lei_xin from t_mjypcfwz WHERE fang_jian_lei_xin !=''";
      var this_ = this;
      curdPost("sql", sqlString).then((response) => {
        this_.sampleOption = response.variables.data;
        this_.sampleOption.pop();
      });
    },
    onSubmits(sql) {
      var fang_jian_ = this.formInline.fang_jian_hao_value;
      var qu_yu = this.formInline.qu_yu_value;
      var huo_jia_hao_ = this.formInline.huo_jia_value.substr(0, 1);
      let huo_jia_lei_xing_ = this.formInline.huo_jia_value.substr(
        2,
        this.formInline.huo_jia_value.length
      );
      var gua_jia_hao = this.formInline.gua_jia_value.substr(0, 1);
      var sql;
      if (qu_yu != "") {
        sql = `select * from t_mjypcfwz where fang_jian_lei_xin = '${fang_jian_}' and qu_yu_ = '${qu_yu}' and huo_jia_lei_xing_ = '${huo_jia_lei_xing_}' and huo_jia_hao_ = '${huo_jia_hao_}'`;
      } else {
        if (huo_jia_lei_xing_.includes("冰箱")) {
          sql = `select * from t_mjypcfwz where fang_jian_lei_xin = '${fang_jian_}' and huo_jia_lei_xing_ = '${huo_jia_lei_xing_}' and huo_jia_hao_ = '${huo_jia_hao_}'`;
        } else if (huo_jia_lei_xing_.includes("液氮罐")) {
          sql = `select * from t_mjypcfwz where fang_jian_lei_xin = '${fang_jian_}' and huo_jia_lei_xing_ = '${huo_jia_lei_xing_}'  and huo_jia_hao_ = '${huo_jia_hao_}' and gua_jia_hao_= '${gua_jia_hao}'`;
        }
      }
      // this.desString = fang_jian_ + qu_yu + huo_jia_hao_;
      this.queryLoad(sql);
    },
    queryLoad(sql) {
      //根据样品信息货位查询相对应的样品登记表
      var datas = [];
      var labelsMap = {}; // map存储
      var this_ = this;
      this_.listData = [];
      curdPost("sql", sql).then((res) => {
        datas = res.variables.data;
        datas.forEach((item) => {
          if (!labelsMap[item.ceng_hao_]) {
            //没有就创建
            labelsMap[item.ceng_hao_] = [];
            labelsMap[item.ceng_hao_].push(item);
          } else {
            labelsMap[item.ceng_hao_].push(item);
          }
          // // 通过样品货位配置的id外键 查询样品登记表
          // let yangpingSql =
          //   "select * from t_mjypdjb WHERE liu_yang_wei_zhi_ = '" +
          //   item.id_ +
          //   "'";
          // curdPost("sql", yangpingSql).then((res) => {
          //   var resData = res.variables.data;
          //   if (resData.length > 0) {
          //     resData.forEach((it) => {
          //       it.wei_zhi_bian_hao_ = item.wei_zhi_bian_hao_;
          //       labelsMap[item.ceng_hao_].push(it);
          //     });
          //   } else {
          //     labelsMap[item.ceng_hao_].push(item);
          //   }
          // });
        });
        // this.loading = true;

        this_.listData = labelsMap;
      });
    },
    qu_yu_Event(e) {
      //区间 留样 样品间 点击事件 查询相应的货架号->冰箱 赋值 huo_jia_hao_
      this.huo_jia_arrEvent(e.target.innerText);
      this.huojiashow = "";
      this.guajiashow = "";
      let sqlString = `select distinct huo_jia_hao_,huo_jia_lei_xing_ from t_mjypcfwz where fang_jian_lei_xin = '${this.formInline.fang_jian_hao_value}' and qu_yu_ = '${e.target.innerText}' order by huo_jia_hao_ asc`;
      var this_ = this;
      this.qu_yu_value = e.target.innerText;
      this.quyuShow = e.target.innerText;
      this.formInline.qu_yu_value = e.target.innerText;
      curdPost("sql", sqlString).then((response) => {
        this_.huo_jia_arr = response.variables.data;
      });
    },
    huo_jia_hao_Event(e) {
      //货架 冰箱 液氮罐点击事件
      this.guajiashow = "";
      let selectText = e.target.innerText;
      this.guajiaarrEvent(selectText);
      this.huojiashow = selectText;
      let huojiaNum = selectText.substr(0, 1);
      this.formInline.huo_jia_value = selectText;
      let huojialeixing = this.formInline.huo_jia_value.substr(
        2,
        this.formInline.huo_jia_value.length
      );
      //区分是冰箱和液氮罐的点击事件
      if (selectText.includes("冰箱")) {
        //如果是冰箱 请求样品货位配置信息 ->查询登记表
        var sql = `select * from t_mjypcfwz where fang_jian_lei_xin = '${this.formInline.fang_jian_hao_value}' and qu_yu_ = '${this.formInline.qu_yu_value}' and  huo_jia_lei_xing_ = '${huojialeixing}' and huo_jia_hao_ = '${huojiaNum}'`;
        this.queryLoad(sql);
        //  alert("冰箱");
      } else if (selectText.includes("液氮罐")) {
        //液氮罐 查询该液氮罐下所有的挂件
        let sqlString = `select distinct gua_jia_hao_ from t_mjypcfwz where huo_jia_lei_xing_ = '液氮罐' and huo_jia_hao_ = '${huojiaNum}'  order by gua_jia_hao_ asc`;
        var this_ = this;
        curdPost("sql", sqlString).then((response) => {
          this_.gua_jia_arr = response.variables.data;
        });
      }
      this.formInline.huo_jia_value = selectText;
    },
    gua_jia_Event(e) {
      //液氮罐挂件号点击事件 查询该液氮罐下该挂件的货位位置信息;
      let selectText = e.target.innerText;
      this.guajiashow = selectText;
      let hguajiaNum = selectText.substr(0, 1);
      var fang_jian_hao_value = this.formInline.fang_jian_hao_value;
      var huo_jia_value = this.formInline.huo_jia_value;
      var sql = `select * from t_mjypcfwz where fang_jian_lei_xin = '${fang_jian_hao_value}' and huo_jia_lei_xing_ = '液氮罐' and huo_jia_hao_ = '${huo_jia_value.substring(
        0,
        1
      )}' and gua_jia_hao_= '${hguajiaNum}'`;
      this.desString = fang_jian_hao_value + huo_jia_value + selectText;
      this.queryLoad(sql);
    },
    huo_jia_arrEvent(quyu) {
      let sqlString = `select distinct huo_jia_hao_,huo_jia_lei_xing_ from t_mjypcfwz where fang_jian_lei_xin = '${this.formInline.fang_jian_hao_value}' and qu_yu_ = '${quyu}'   order by huo_jia_hao_ asc`;
      var this_ = this;
      curdPost("sql", sqlString).then((response) => {
        this_.huo_jia_arr = response.variables.data;
        if (!this_.firstLoadActive) {
          this_.formInline.huo_jia_value = "";
        }
        this_.firstLoadActive = false;
      });
    },
    guajiaarrEvent(huojiaweizhi) {
      let huojiaNum = huojiaweizhi.substr(0, 1);
      let huojialeixing = huojiaweizhi.substr(2, huojiaweizhi.length);
      if (huojiaweizhi.includes("冰箱")) {
        this.gua_jia_arr = [];
        return;
      }
      let sqlString = `select distinct gua_jia_hao_ from t_mjypcfwz where fang_jian_lei_xin = '留样间' and huo_jia_lei_xing_ = '${huojialeixing}' and huo_jia_hao_ = '${huojiaNum}'   order by gua_jia_hao_`;
      var this_ = this;
      curdPost("sql", sqlString).then((response) => {
        this_.gua_jia_arr = response.variables.data;
      });
    },
    positionBtn() {
      this.loadQueryData();
      this.firstLoadViewData();
      this.viewShow = !this.viewShow;
      console.log(this.viewShow);
    },
    positionClick(values) {
      this.viewShow = !this.viewShow;
      this.placeValue = values[0].wei_zhi_bian_hao_;
      let this_ = this;
       console.log(values[0].id_,"id");
      this_.$emit("input", values[0].id_); //传导
        
    },
  },
  watch: {
    "formInline.fang_jian_hao_value": function (newdata, olddata) {
      //监控房间号 input 输入框数据变化 来改变区域和货架信息（input）
      this.huo_jia_arr = [];
      let sqlString = `select distinct qu_yu_ ,huo_jia_hao_ from t_mjypcfwz where fang_jian_lei_xin = '${newdata}' `;
      var this_ = this;
      curdPost("sql", sqlString).then((response) => {
        this_.quyu_arr = response.variables.data.reverse();
        this_.quyu_arr.forEach((item) => {
          //待优化 事实上是一个用来判断
          if (item.qu_yu_ == "") {
            this_.leixingcare = false;
            this_.formInline.qu_yu_value = "";
            let sql = `select distinct huo_jia_hao_,huo_jia_lei_xing_ from t_mjypcfwz where fang_jian_lei_xin = '${newdata}'  order by huo_jia_hao_ asc`;
            curdPost("sql", sql).then((res) => {
              this_.huo_jia_arr = res.variables.data;
            });
            return;
          } else {
            this_.leixingcare = true;
          }
        });
        if (!this.firstLoadActive) {
          this_.formInline.qu_yu_value = "";
        }
      });
    },
    placeValue: function (newdata, olddata) {
      if (newdata == "" || newdata == null) {
        this.$emit("input", "");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
}
.sample-content {
  width: 100%;
  // position: fixed;
  top: 50;
  position: relative;
  background: white;
  .selectPo {
    cursor: pointer;
    z-index: 9;
  }
  .top-content {
    width: 100%;
    .top-title {
      text-align: center;
      font-weight: bold;
      width: 100%;
      font-size: 18px;
      line-height: 40px;
    }
    .query-content {
      display: flex;
      margin-left: 25px;
    }
  }
  .viewArea {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: white;
    z-index: 99 !important;
  }
  .select_quyu {
    .test-quyu,
    .huojia {
      width: 100%;
      .list-items {
        display: flex;
        cursor: pointer;
        .quyu-item {
          background: #0099cc;
        }
        .huojia-item {
          background: #99ccff;
        }
        .list-item {
          padding: 0px 10px;
          background-color: rgb(206, 198, 164);
          text-align: center;
          line-height: 35px;
          margin-left: 20px;
          border-radius: 10px;
        }
      }
      .cangku-mingchen {
        width: 100%;
        text-align: left;
        margin-left: 50px;
      }
    }
  }

  .body-content {
    margin-bottom: 20px;
    display: flex;
    box-sizing: border-box;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    // .left-table {
    //   // width: 40%;
    //   ::v-deep .el-table {
    //     width: 40%;
    //   }
    // }
    .right-view {
      z-index: 99;
      width: 100%;
      .goods-items {
        width: 100%;
        border: solid 2px rgb(202, 236, 247);
        display: flex;
        flex-direction: column-reverse;
        .show-demo {
          width: 100%;
          // border-bottom: 1px solid bisque;
          //   margin: 0 auto;
          text-align: center;

          .goods-level {
            display: flex;
            position: relative;
            margin-bottom: 6px;
          }
          .level-dsc {
            margin-top: 12px;
            position: absolute;
            bottom: 0;
            left: 10px;
          }
          .goods-list {
            display: flex;
            // justify-content: flex-start;
            flex-wrap: wrap-reverse;
            align-content: flex-start;
            margin-left: 50px;
            margin-right: 15px;
            .goods-dsc {
              cursor: pointer;
              padding: 2px 6px;
              border-radius: 5px;
              background: #67c23a;
              margin-left: 12px;
              margin-top: 6px;
              // box-sizing: border-box;
              .top-dsc {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                // height: 18px;
                line-height: 18px;
                .position {
                  width: 180px;
                  overflow: hidden;
                }
                .position > p {
                  text-align: left;
                  color: #fbe8ff;
                }
                .right-content {
                  display: flex;
                  align-items: center;
                  p {
                    height: 18px;
                    line-height: 18px;
                    margin-left: 5px;
                    color: #fbe8ff;
                    text-align: left;
                  }
                }
              }
              .bottom-dsc {
                width: 100%;
                text-align: center;
                font-size: 18px;
                height: 45px;
                line-height: 45px;
                margin-top: 9px;
                color: #fbe8ff;
              }
              .goods-demo {
                display: block;
                width: 70px;
                height: 90px;
                border: 1px solid rgb(10, 9, 8);
                text-align: center;
                margin: 0;
              }
              .goods-code {
                text-align: center;
                width: 100%;
                height: 20px;
                line-height: 20px;
              }
            }
          }
          .goodshelf-name {
            margin: 15px 0px;
          }
          .shelf {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>


