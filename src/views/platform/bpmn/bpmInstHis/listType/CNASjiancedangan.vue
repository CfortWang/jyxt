 <template>
  <div>
    <div class="heads">CNAS检测档案</div>
    <div class="top-box">
      <span class="t-span">年份</span
      ><el-input
        class="inp"
        v-model="nianfen"
        placeholder="请输入内容"
        clearable
      ></el-input>
      <!-- <span class="t-span">检测申请单号</span
      ><el-input
        class="inp"
        v-model="shenqingdanid"
        placeholder="请输入内容"
        clearable
      ></el-input> -->
      <!-- <span class="t-span">委托单位</span
      ><el-input
        class="inp"
        v-model="danwei"
        placeholder="请输入内容"
        clearable
      ></el-input> -->
      <span class="t-span">报告编号</span
      ><el-input
        class="inp"
        v-model="bianhao"
        placeholder="请输入内容"
        clearable
      >
      </el-input>
      <el-button class="btn" type="primary" @click="search">
        <i class="ibps-icon-search"></i>查询
      </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      :stripe="true"
      style="width: 100%"
      height="75vh"
      :row-class-name="tableRowClassName"
      :header-cell-style="{
        color: '#000',
        'font-size': '14px',
        padding: '6px 6px',
        background: '#a7d6f8 !important',
      }"
    >
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <el-table-column prop="chu_ju_bao_gao_sh" label="年份" width="80">
        <template slot-scope="scope">
          {{ scope.row.chu_ju_bao_gao_sh | yeare("年") }}
        </template>
      </el-table-column>
      <el-table-column prop="he_tong_bian_hao_" label="合同编号" width="100">
        <template slot-scope="scope">
          {{ scope.row.he_tong_bian_hao_ | returnHetong(hetong) }}
        </template>
      </el-table-column>
      <el-table-column prop="bao_gao_bian_hao_" label="报告编号" width="150">
      </el-table-column>
      <el-table-column prop="jian_ce_kai_shi_s" label="检测时间" width="100">
      </el-table-column>
      <el-table-column
        prop="jian_ce_shen_qing"
        label="检测委托单号"
        width="180"
      >
      </el-table-column>
      <!-- <el-table-column prop="wei_tuo_dan_wei_" label="委托单位">
      </el-table-column> -->
      <el-table-column prop="wei_tuo_ri_qi_" label="委托日期" width="100">
      </el-table-column>
      <el-table-column prop="yang_pin_bian_hao" label="样品编号" width="150">
      </el-table-column>
      <el-table-column prop="yang_pin_ming_che" label="样品名称" width="">
      </el-table-column>

      <!-- <el-table-column prop="lian_xi_ren_" label="联系人">
      </el-table-column>
      <el-table-column prop="lian_xi_dian_hua_" label="联系电话">
      </el-table-column> -->
      <!-- <el-table-column prop="lei_bie_qu_fen_yu" label="类别">
         <template slot-scope="scope">
           {{scope.row.lei_bie_qu_fen_yu.toUpperCase()}}
         </template>
      </el-table-column> -->
      <el-table-column label="操作" align="left" width="100"  >
        <template slot-scope="scope">
          <el-popover placement="left" width="150" trigger="click">
            <div slot="reference" class="more">
              <i class="el-icon-caret-bottom"></i>查阅
            </div>
            <!-- <div class="item" style="color: #85ce61">
              <i class="el-icon-s-order"></i> 合同
            </div> -->

            <div
              class="item"
              style="color: #85ce61"
              @click="alertReport(reports.jianceshenqingdan, scope.row.id_)"
            >
              <i class="el-icon-s-order"></i> 检测委托单
            </div>
            <div
              class="item"
              style="color: #85ce61"
              @click="reports.hetongpingshen, scope.row"
            >
              <i class="el-icon-s-order"></i> 合同评审
            </div>
            <div>
              <el-popover placement="left" width="200" trigger="click">
                <div
                  class="div_test item"
                  style="color: #85ce61"
                  slot="reference"
                  @click="juTiItem(scope.row)"
                >
                  <i class="el-icon-s-order"></i> 检测记录
                </div>
                <div class="three-item">
                  <div
                    style="color: #85ce61; cursor: pointer"
                    v-for="it in itemInfo"
                    :key="it.id_"
                    @click="formEvent(it.jian_ce_xiang_mu_)"
                  >
                    {{ it.jian_ce_xiang_mu_ }}记录
                  </div>
                </div>
              </el-popover>
            </div>
            <div
              class="item"
              style="color: #85ce61"
              @click="alertReport(reports.baogaoshenpibiao, scope.row.id_)"
            >
              <i class="el-icon-s-order"></i> 检测报告审批表
            </div>
            <div v-if="false">
              <el-popover placement="left" width="200" trigger="triggerType">
                <div
                  class="div_test item"
                  style="color: #85ce61"
                  slot="reference"
                  @click="YubaogaoItem(scope.row)"
                >
                  <i class="el-icon-s-order"></i> 预报告
                </div>
                <div class="three-item">
                  <div
                    style="color: #85ce61; cursor: pointer"
                    v-for="it in yubaogaoitem"
                    :key="it.id_"
                    @click="yuReports(reports.yubaogao,it.id)"
                  >
                  {{ it.jian_ce_xiang_mu_ }}预报告记录
                  </div>
                </div>
              </el-popover>
            </div>
            <!-- <div
              class="item"
              style="color: #85ce61"
              @click="juTiItem(scope.row)"
            >
              <i class="el-icon-s-order"></i> 预报告
            </div> -->
            <div
              class="item"
              style="color: #85ce61"
              @click="alertReport(reports.jiancebaogao, scope.row.id_)"
            >
              <i class="el-icon-s-order"></i>检测报告
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :top="'3vh'"
      :width="'90%'"
      class="js-custom-dialog"
      append-to-body
      :fullscreen="false"
      :visible.sync="visible"
    >
      <iframe
        :src="srcUrl"
        :height="'100%'"
        :width="'100%'"
        frameborder="0"
        scrolling="no"
      />
    </el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import curdPost from "@/business/platform/form/utils/custom/joinCURD.js";
import GetReport from "../corresponding/getReport.js";
export default {
  mixins: [GetReport],
  data() {
    return {
      runqianId: "",
      total: 200,
      currentPage4: 1,
      visible: false,
      reports: {
        hetong: "",
        hetongpingshen: "42明鉴/吴/MJT-QP-7.1-01-R02合同评审表.rpx",
        jianceshenqingdan: "42明鉴/吴/MJT-QP-7.1-01-R03 检测委托单.rpx",
        jianceyuanshijilu: "",
        baogaoshenpibiao: "42明鉴/吴/检测报告审批表.rpx",
        yubaogao: "42明鉴/吴/明鉴细胞专业技术检测预报告.rpx",
        jiancebaogao: "42明鉴/吴/明鉴细胞专业技术检测报告.rpx",
      },
      shenqingdanid: "",
      nianfen:'',
      danwei: "",
      bianhao: "",
      tableData: [],
      itemInfo: [], // 列表内容
      yubaogaoitm: [],
      hetong: [],
      triggerType: "click",
    };
  },
  filters: {
    returnHetong(value, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id_ == value) {
          return arr[i].he_tong_bian_hao_;
        }
      }
    },
    yeare(value,dedal){
      if(value ==undefined || value ==null || undefined ==""){
        return ""
      }
      if(dedal=="年"){
        return value.split("-")[0]
      }else if(dedal=="月"){
        return value.split("-")[0] + value.split("-")[1]
      }else{
        value
      }
    }
  },
  created() {
    let sql =
      "select * from t_mjjcbg WHERE shi_fou_yu_bao_ga='否' and lei_bie_qu_fen_yu ='cnas' and zhuang_tai_ ='报告待发放' or  zhuang_tai_ = '已完成' ORDER BY create_time_ DESC limit 0,20";
    this.loadData(sql);
    // curdPost("sql", sql).then((response) => {
    //   this.tableData = response.variables.data;
    // });
    let sumsql =
      "select COUNT(*) AS sum  FROM t_mjjcbg WHERE shi_fou_yu_bao_ga='否' and lei_bie_qu_fen_yu ='cnas' and zhuang_tai_ ='报告待发放' or  zhuang_tai_ = '已完成'";
    curdPost("sql", sumsql).then((response) => {
      this.total = response.variables.data[0].sum;
    });
  },
  methods: {
    // 请求表格数据函数
    loadData(sql) {
      let this_ = this;
      this.listData = [];
      curdPost("sql", sql).then((res) => {
        this_.tableData = res.variables.data;
        if (this_.tableData.length > 0) {
          this.hetongidFn(this_.tableData);
        } else {
          this_.tableData = [];
        }
      });
    },
    hetongidFn(bianhaoArr) {
      var sqlStr = "";
      var this_ = this;
      bianhaoArr.forEach((item) => {
        sqlStr += "'" + item.he_tong_bian_hao_ + "',";
      });
      sqlStr = sqlStr.substring(0, sqlStr.length - 1);
      sqlStr = "(" + sqlStr + ")";
      let sql =
        "select he_tong_bian_hao_,id_ from t_bjd WHERE id_ in " + sqlStr;
      curdPost("sql", sql).then((res) => {
        this_.hetong = res.variables.data;
      });
    },
    juTiItem(info) {
      let itemId;
      let this_ = this;
      var sql =
        "select b.id_ ,c.jian_ce_xiang_mu2 FROM t_mjjcbg a JOIN t_jchzb b ON a.jian_ce_shen_qing = b.shen_qing_dan_id_ JOIN t_mjypb c ON a.jian_ce_shen_qing = c.wai_jian_ WHERE a.id_ = '" +
        info.id_ +
        "'";
      curdPost("sql", sql).then((res) => {
        itemId = res.variables.data;
        this_.runqianId = itemId[0].id_;
        var itemSql =
          "select * FROM t_mjjcnlfw WHERE id_ IN(" +
          itemId[0].jian_ce_xiang_mu2 +
          ")";
        curdPost("sql", itemSql).then((res) => {
          this_.itemInfo = res.variables.data;
        });
      });
    },
    YubaogaoItem(info) {
      let itemId;
      let this_ = this;
      var sql =
        "select b.id_ ,c.jian_ce_xiang_mu2 FROM t_mjjcbg a JOIN t_jchzb b ON a.jian_ce_shen_qing = b.shen_qing_dan_id_ JOIN t_mjypb c ON a.jian_ce_shen_qing = c.wai_jian_ WHERE a.id_ = '" +
        info.id_ +
        "'";
      curdPost("sql", sql).then((res) => {
        itemId = res.variables.data;
        this_.runqianId = itemId[0].id_;
        var itemSql =
          "select * FROM t_mjjcnlfw WHERE id_ IN(" +
          itemId[0].jian_ce_xiang_mu2 +
          ")";
        curdPost("sql", itemSql).then((res) => {
          this_.itemInfo = res.variables.data;
          for (var i = 0; i++; i < this_itemInfo) {
            if (this_itemInfo[i].shi_fou_yu_bao_ga=="是") {
              this_.yubaogaoitem.push(it);
            }
          }
          if (this_.yubaogaoitem.length == 0) {
            this_.triggerType = "";
            alert("此条报告没有预报告记录");
            return;
          }
        });
      });
    },
    yuReports(url,id){
      this.alertReport(
         url,
         id
    );
    },
    formEvent(itemName) {
      if (itemName.includes("pH检测")) {
        this.alertReport(
          "42明鉴/郑/MJT-SJ-103-R01 A1 pH检测记录.rpx",
          this.runqianId
        );
      } else if (itemName.includes("渗透压摩尔浓度检测")) {
        this.alertReport(
          "42明鉴/郑/MJT-SJ-105-R01 A2 渗透压摩尔浓度检测记录.rpx",
          this.runqianId
        );
      } else if (itemName.includes("最低装量")) {
        this.alertReport("42明鉴/张/最低装载量.rpx", this.runqianId);
      } else if (itemName.includes("无菌检测（薄膜过滤法）")) {
        this.alertReport(
          "42明鉴/林/MJT-SJ-102-R01 A2 无菌检测薄膜过滤法记录表.rpx",
          this.runqianId
        );
      } else if (itemName.includes("无菌检测（全自动微生物培养）")) {
        this.alertReport(
          "42明鉴/柯/无菌检测（全自动微生物培养）.rpx",
          this.runqianId
        );
      } else if (itemName.includes("内毒素检测(凝胶法)")) {
        this.alertReport(
          "42明鉴/卢/MJT-SJ-117-R01 A1 细菌内毒素（凝胶法）检测记录.rpx",
          this.runqianId
        );
      } else if (itemName.includes("内毒素检测(动态显色法)")) {
        this.alertReport(
          "42明鉴/张/动态显色法检测内毒素记录表.rpx",
          this.runqianId
        );
      } else if (itemName.includes("手动细胞计数")) {
        this.alertReport(
          "42明鉴/林/MJT-SJ-106-R01 A1 细胞计数检测记录.rpx",
          this.runqianId
        );
      } else if (itemName.includes("手动细胞活率")) {
        this.alertReport(
          "42明鉴/张/MJT-SJ-107-R01 A1 细胞活率检测记录.rpx",
          this.runqianId
        );
      } else if (itemName.includes("自动细胞计数和活率(台盼蓝染色法)")) {
        this.alertReport(
          "42明鉴/郑/MJT-SJ-118-R01  A0细胞计数和细胞活率（台盼蓝仪器法）检测记录.rpx",
          this.runqianId
        );
      } else if (itemName.includes("自动细胞计数和活率(双荧光染色法)")) {
        this.alertReport(
          "42明鉴/郑/MJT-SJ-119-R01  A0细胞计数和细胞活率（双荧光染色法）检测记录.rpx",
          this.runqianId
        );
      } else if (itemName.includes("牛血清白蛋白残留检测")) {
        this.alertReport(
          "42明鉴/张/MJT-SJ-111-R01 A1 牛血清白蛋白残留量检测.rpx",
          this.runqianId
        );
      } else if (itemName.includes("青霉素残留检测")) {
        this.alertReport(
          "42明鉴/张/青霉素残留量检测记录表.rpx",
          this.runqianId
        );
      } else if (itemName.includes("支原体检测(培养法)")) {
        this.alertReport(
          "42明鉴/卢/MJT-SJ-104-R01 A1 支原体检测培养法记录.rpx",
          this.runqianId
        );
      } else if (itemName.includes("支原体检测（荧光PCR法）")) {
        this.alertReport(
          "42明鉴/卢/MJT-SJ-113-R01 A1支原体检测(荧光PCR法) 副本.rpx",
          this.runqianId
        );
      } else if (itemName.includes("间充质干细胞表型检测3项")) {
        this.alertReport(
          "42明鉴/柯/间充质干细胞表型检测3项.rpx",
          this.runqianId
        );
      } else if (itemName.includes("间充质干细胞表型检测5项")) {
        this.alertReport(
          "42明鉴/柯/间充质干细胞表型检测5项.rpx",
          this.runqianId
        );
      } else if (itemName.includes("间充质干细胞表型检测8项")) {
        this.alertReport(
          "42明鉴/柯/间充质干细胞表型检测8项.rpx",
          this.runqianId
        );
      } else if (itemName.includes("CIK细胞表型检测")) {
        this.alertReport(
          "42明鉴/林/MJT-SJ-123-R01 A0 CIK细胞表面标志物检测记录表.rpx",
          this.runqianId
        );
      } else if (itemName.includes("NK细胞表型检测")) {
        this.alertReport(
          "42明鉴/恰/MJT-SJ-124-R01  A0 NK细胞表面标志物检测记录.rpx",
          this.runqianId
        );
      } else if (itemName.includes("淋巴细胞表型检测")) {
        this.alertReport(
          "42明鉴/张/MJT-SJ-125-R01 A0 淋巴细胞表面标志物检测记录表.rpx",
          this.runqianId
        );
      } else if (itemName.includes("支原体检测（化学发光法）记录表")) {
        this.alertReport(
          "42明鉴/林/MJT-SJ-114-R01 A1 支原体检测（化学发光法）记录表.rpx",
          this.runqianId
        );
      }
    },
    isYubaogao(value, row) {
      
    },
    // pin凑sql
    selectSplit() {
      var q1, q2, q3;
      if (this.nianfen) {
        q1 = "chu_ju_bao_gao_sh like'" +"%" + this.nianfen + "%" + "' ";
      }
      if (this.danwei) {
        q2 = "wei_tuo_dan_wei_  = '" + this.danwei + "' ";
      }
      if (this.bianhao) {
        q3 = "bao_gao_bian_hao_ = '" + this.bianhao + "'";
      }
      if (this.nianfen && this.danwei && this.bianhao) {
        return "where " + q1 + " and " + q2 + " and " + q3 + " and ";
      } else if (this.nianfen && this.danwei && !this.bianhao) {
        return "where " + q1 + " and " + q2 + " and ";
      } else if (!this.nianfen && this.danwei && this.bianhao) {
        return "where " + q2 + " and " + q3 + " and ";
      } else if (this.nianfen && !this.danwei && this.bianhao) {
        return "where " + q1 + " and " + q3 + " and ";
      } else if (this.nianfen && !this.danwei && !this.bianhao) {
        return "where " + q1 + " and ";
      } else if (!this.nianfen && this.danwei && !this.bianhao) {
        return "where " + q2 + " and ";
      } else if (!this.nianfen && !this.danwei && this.bianhao) {
        return "where " + q3 + " and ";
      } else if (!this.nianfen && !this.danwei && !this.bianhao) {
        return "WHERE";
      }
    },
    search() {
      let moreSql = this.selectSplit();
      var sql =
        "select * from t_mjjcbg " +
        moreSql +
        " shi_fou_yu_bao_ga='否' and lei_bie_qu_fen_yu = 'cnas' and zhuang_tai_ ='报告待发放' or  zhuang_tai_ = '已完成' ORDER BY create_time_ DESC limit 0,20";
      this.loadData(sql);
    },
    handleSizeChange(value) {
      this.currentPage4 = 1;
      let sql =
        "select * from t_mjjcbg WHERE shi_fou_yu_bao_ga='否' and lei_bie_qu_fen_yu ='cnas' and zhuang_tai_ ='报告待发放' or  zhuang_tai_ = '已完成' ORDER BY create_time_ DESC limit 0,"+value;
      this.loadData(sql);
    },
    handleCurrentChange(value) {
      let sql =
        "select * from t_mjjcbg WHERE shi_fou_yu_bao_ga='否' and lei_bie_qu_fen_yu ='cnas' and zhuang_tai_ ='报告待发放' or  zhuang_tai_ = '已完成' ORDER BY create_time_ DESC limit " +
        value +", 20";
      this.loadData(sql);
    },
  },
};
</script>

<style lang="scss">
.heads {
  margin-top: 5px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  background-color: #f9ffff;
  width: 100%;
  font-size: 18px;
}
// .tableRowClassName {
//   backface-visibility: #d9eefd;
// }
// .el-table .warning-row {
//   background: #d9eefd;
// }
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background: #d9eefd;
}
.more,
.item {
  cursor: pointer;
}
.more {
  color: #409eff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.top-box {
  margin-bottom: 20px;
  .t-span {
    margin: 0 6px 0 6px;
    color: #916266;
    font-size: 12px;
  }
  .btn {
    margin-left: 10px;
    background-color: #409eff;
    border-color: #409eff;
    font-size: 12px;
    border-radius: 3px;
    padding: 7px 15px;
  }
  .inp {
    width: 150px;
    font-size: 12px;
    height: 28px !important;
    line-height: 28px;
    color: #606266;
  }
}
</style>
