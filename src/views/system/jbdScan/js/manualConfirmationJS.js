import repostCurd from '@/business/platform/form/utils/custom/joinCURD.js'

export default {
  methods: {
    facilityData() {
      this.loadData()
    },
    /* 获取数据 ，开始查阅记录 */
    loadData() {
      // 扫码扫到新数据,查询 回填展示
      repostCurd('select', '{"tableName": "t_mjypdjb","paramWhere":{"jie_yang_zhuang_t":"待确认"}}').then(response => {
        if (response.variables.data && response.variables.data.length > 0) {
          for (let i in response.variables.data) {
            response.variables.data[i].jie_yang_shu_lian = 1
            this.listData.push(response.variables.data[i])
            this.OriginalPosition.push(response.variables.data[i].shi_fou_liu_yang_ == "是" ? response.variables.data[i].liu_yang_wei_zhi_ : response.variables.data[i].shou_yang_wei_zhi)
          }
        }
      })
    },
    /* 列表失去焦点*/
    handleChange() {
      this.$refs.redarInput.focus(); //聚焦input
    },
    /* 关闭弹出列表框*/
    closeDialog() {
      this.remRedar()
      //回传关闭事件。隐藏当前组件。
    },
    handleClose() {
      this.handleChange()
      this.$confirm('确认关闭样品列表页面？').then(_ => {
        this.closeDialog();
      }).catch(_ => {});
    },

    submitData(type) {
      // this指针
      let this_ = this;
      let changeWeizhi;
      let changesyWeizhi;
      // 回传关闭事件。隐藏当前组件。
      let judge = true;

      if (this_.listData.length == 0) {
        this.$emit('callback', true)
        this.visable = false
        this.$message({
          message: '暂无样品待接收确认！',
          type: 'error'
        })
        this.closeDialog();
      } else {
        this.$confirm('请再次确认 [样品接收信息]').then(_ => {

          // 获取样品列表
          let ypInfoList = this_.listData
          // console.log(ypInfoList, "样品信息")

          let dWhere = []
          let ypbh = []
          let cfwzIdList = [] // 放置 存放位置的ID
          let uuidList = [] // 列表的UUID

          let ypIdList = [] // 样品id列表,格式转好的
          let ypWeiZhi = [] // 样品收样位置
          let ypLiuYangWeiZhi = [] // 样品留样位置
          let saoMaNumList = [] // 扫码确认数量列表
          let jieYangQueRenZTList = [] // 接样状态列表

          let ypbhList = [] // 样品编号列表
          let mjypbList = [] // 明鉴样品表
          let mjypbWJ = [] // 明鉴样品表外键
          for (let yp in ypInfoList) { //样品数据
            let cfwz = ''
            if (ypInfoList[yp].jie_yang_shu_lian > ypInfoList[yp].shou_yang_shu_lia) {
              this_.$message.error('操作失败，[' + ypInfoList[yp].yang_pin_ming_che + '] 接收确认数量不得大于收样数量。')
              return;
            }
            if (ypInfoList[yp].jie_yang_zhuang_t == '待确认') {
              this_.$message.error('操作失败，[' + ypInfoList[yp].yang_pin_ming_che + '] 接收确认状态必须为已确认。')
              return;
            }
            if (ypInfoList[yp].shi_fou_liu_yang_ == "是") {
              if (ypInfoList[yp].liu_yang_wei_zhi_ == null || ypInfoList[yp].liu_yang_wei_zhi_ == '') {
                this_.$message.error("你要留样的话，存放位置不能为空哦!")
                return;
              }
              if (ypInfoList[yp].shou_yang_wei_zhi != undefined && ypInfoList[yp].shou_yang_wei_zhi != '') {
                this_.$message.error("你要留样的话，就不要选收样存放位置!")
                return;
              }
              let isLy = ypInfoList[yp].liu_yang_wei_zhi_
              // console.log(isLy, "留样");
              if (isLy.substr(-2, isLy.length - 1) == "占用" || isLy.substr(-2, isLy.length - 1) == "空余") { //？
                let sql = "select 'id' from MJ_yp_position_status where positionAndStatus = '" + isLy + "' limit 1"
                repostCurd('sql', sql).then(response => {
                  cfwz = response.variables.data[0].id
                  ypInfoList[yp].liu_yang_wei_zhi_ = cfwz
                  // console.log(ypInfoList)
                  console.log('?question time留样')
                })
              } else {
                cfwz = ypInfoList[yp].liu_yang_wei_zhi_
              }

            } else {
              if (ypInfoList[yp].shou_yang_wei_zhi == null || ypInfoList[yp].shou_yang_wei_zhi == '') {
                this_.$message.error("你正常收样的话，样品存放位置不能为空哦!")
                return;
              }
              if (ypInfoList[yp].liu_yang_wei_zhi_ != undefined && ypInfoList[yp].liu_yang_wei_zhi_ != '') {
                this_.$message.error("你正常收样的话，就不要选择留样存放位置!")
                return;
              }
              let isZC = ypInfoList[yp].shou_yang_wei_zhi
              if (isZC.substr(-2, isZC.length - 1) == "占用" || isZC.substr(-2, isZC.length - 1) == "空余") { //?
                let sql1 = "select `id` from MJ_yp_position_status where positionAndStatus = '" + isZC + "' limit 1"
                // console.log(sql1)
                repostCurd('sql', sql1).then(response => {
                  // console.log(response.variables)
                  cfwz = response.variables.data[0].id
                  ypInfoList[yp].shou_yang_wei_zhi = cfwz //查询位置状态表 取值位置的id
                  console.log('?question time')
                })
              } else {
                cfwz = ypInfoList[yp].shou_yang_wei_zhi //取位置信息
              }
            }
            dWhere.push('{"id_":"' + cfwz + '"}')
            ypbh.push(ypInfoList[yp].yang_pin_bian_hao)
            uuidList.push(ypInfoList[yp].biao_zhi_uuid_)
            cfwzIdList.push(cfwz)
            ypIdList.push('{"id_":"' + ypInfoList[yp].id_ + '"}')
            ypWeiZhi.push(ypInfoList[yp].shou_yang_wei_zhi) // 收样存放位置
            ypLiuYangWeiZhi.push(ypInfoList[yp].liu_yang_wei_zhi_) // 留样存放位置
            saoMaNumList.push(ypInfoList[yp].jie_yang_shu_lian) // 扫码数量
            jieYangQueRenZTList.push(ypInfoList[yp].jie_yang_zhuang_t) // 接收确认状态
            ypbhList.push('{"yang_pin_bian_hao":"' + ypInfoList[yp].yang_pin_bian_hao + '"}') // 样品编号列表
          }


          for (let index in ypIdList) { // 更新样品登记表
            let WZtem = ypWeiZhi[index] == null ? '' : ypWeiZhi[index]
            let LYWZtem = ypLiuYangWeiZhi[index] == null ? '' : ypLiuYangWeiZhi[index]
            changeWeizhi = WZtem;
            changesyWeizhi = LYWZtem;
            // console.log(WZtem, LYWZtem, "双id")

            repostCurd('update', '{"tableName":"t_mjypdjb","paramWhere":' + ypIdList[index] + ',"paramCond":' + '{"shou_yang_wei_zhi":"' + WZtem + '","jie_yang_shu_lian":"' + saoMaNumList[index] + '","jie_yang_zhuang_t":"' + jieYangQueRenZTList[index] + '","liu_yang_wei_zhi_":"' + LYWZtem + '"}}').then(res => {
              // console.log(res, "更新成功")
            })
          }
          for (let num in dWhere) {
            if (this.OriginalPosition[num] != cfwzIdList[num]) {
              let sql = "select * from t_mjypcfwz where id_ = '" + cfwzIdList[num] + "'"
              repostCurd('sql', sql).then(response => {
                let resArr = response.variables.data
                if (resArr.length == 1) {
                  if (resArr[0].wei_zhi_zhuang_ta == "空余") {
                    repostCurd('update', '{"tableName":"t_mjypcfwz","paramWhere":' + dWhere[num] + ',"paramCond":' + '{"wei_zhi_zhuang_ta":"占用","yang_pin_bian_hao":"' + ypbh[num] + '","ru_ku_shi_jian_":"' + this_.dateFormat() + '","shou_yang_ri_qi_":"' + uuidList[num] + '"}}').then(res => {
                      // console.log(res, "原本位置为空余 ，新位置更新成功")
                      // alert('样品货位状态更新成功')
                    })
                  } else if (resArr[0].wei_zhi_zhuang_ta == "占用") {
                    // 新增一条新的位置记录,使用旧的位置记录 修改它的样品编号，入库时间，标识UUID
                    let cfNewList = []
                    let cfNew = {}
                    cfNew["fang_jian_lei_xin"] = resArr[0].fang_jian_lei_xin
                    cfNew["huo_jia_lei_xing_"] = resArr[0].huo_jia_lei_xing_
                    cfNew["huo_jia_hao_"] = resArr[0].huo_jia_hao_
                    cfNew["qu_yu_"] = resArr[0].qu_yu_
                    cfNew["gua_jia_hao_"] = resArr[0].gua_jia_hao_
                    cfNew["ceng_hao_"] = resArr[0].ceng_hao_
                    cfNew["wei_zhi_bian_hao_"] = resArr[0].wei_zhi_bian_hao_
                    cfNew["wei_zhi_zhuang_ta"] = resArr[0].wei_zhi_zhuang_ta
                    cfNew["cun_fang_lei_xing"] = resArr[0].cun_fang_lei_xing
                    cfNew["cun_chu_tiao_jian"] = resArr[0].cun_chu_tiao_jian
                    cfNew["yang_pin_bian_hao"] = ypbh[num]
                    cfNew["ru_ku_shi_jian_"] = this_.dateFormat()
                    cfNew["shou_yang_ri_qi_"] = uuidList[num]
                    cfNewList.push(cfNew)
                    let uuid = cfNew["shou_yang_ri_qi_"];
                    // console.log(cfNewList, 111111111111111)
                    repostCurd('add', '{"tableName":"t_mjypcfwz","paramWhere":' + JSON.stringify(cfNewList) + '}').then(res => {
                      // alert('样品货位占位时重新生成货位')
                      let selectsql = "select id_ from t_mjypcfwz where shou_yang_ri_qi_='" + uuid + "'";
                      // console.log('zzj selectsql',selectsql)
                      repostCurd('sql', selectsql).then(res => {
                        let dataid = res.variables.data[0].id_;
                        // console.log(res.variables.data)
                        let abc = '{"biao_zhi_uuid_":"' + uuid + '"}'
                        // console.log('zzj abc ',abc)
                        if (changeWeizhi && !changesyWeizhi) {
                          // alert(1)
                          repostCurd('update', '{"tableName":"t_mjypdjb","paramWhere":' + abc + ',"paramCond":' + '{"shou_yang_wei_zhi":"' + dataid + '"}}').then(res => {
                            // alert('yang状态更新成功')
                          })
                        } else {
                          // alert(2)
                          repostCurd('update', '{"tableName":"t_mjypdjb","paramWhere":' + abc + ',"paramCond":' + '{"liu_yang_wei_zhi_":"' + dataid + '"}}').then(res => {
                            // alert('yang状态更新成功')
                          })
                        }
                      })

                    })
                  }
                }
              })
            }

          }
          repostCurd('selects', '{"tableName":"t_mjypb","paramWhere":[' + ypbhList + ']}').then(response => {
            mjypbList = response.variables.data
            let wjList = []
            let wjAll = []
            let wjAllList = []
            for (let i in mjypbList) {
              wjList.push(mjypbList[i].wai_jian_)
              wjAll.push(mjypbList[i].wai_jian_)
            }
            wjList = this_.unique(wjList)
            for (let i in wjList) {
              mjypbWJ.push('{"id_":"' + wjList[i] + '"}')
            }
            for (let i in wjAll) {
              wjAllList.push('{"id_":"' + wjAll[i] + '"}')
            }
            repostCurd('updates', '{"tableName":"t_mjwtsqb","paramWhere":[' + mjypbWJ + '],"paramCond":{"zhuang_tai_":"委托结束"}}')
            let mjwtsqbAllResult = []
            let mjwtsqbIdList = []
            let mjfbbList = []
            let mjfbbWJList = []
            // console.log('wjAllList',wjAllList)
            for (let i in wjAllList) {
              repostCurd('select', '{"tableName":"t_mjwtsqb","paramWhere":' + wjAllList[i] + '}').then(response => {
                mjfbbWJList.push('{"wei_tuo_wai_jian_":"' + response.variables.data[0].id_ + '"}')
                mjwtsqbAllResult.push(response.variables.data[0])
                mjwtsqbIdList.push('{"id_":"' + response.variables.data[0].id_ + '"}')
                // console.log('fbb=>',i,mjfbbWJList[i])
                // repostCurd('select','{"tableName":"t_mjfbb","paramWhere":'+mjfbbWJList[i]+'}').then(response=>{
                //                  console.log(response.variables)
                //                       mjfbbList.push(response.variables.data)
                //                    })
              })
            }
            setTimeout(() => {
              let narr = []
              for (let a of mjfbbWJList) {
                narr.push(a)
              }
              repostCurd('selects', '{"tableName":"t_mjfbb","paramWhere":[' + narr + ']}').then(response => {
                // console.log(response.variables)
                mjfbbList.push(response.variables.data)
              })
            }, 1000)

            setTimeout(() => {

              // let mjfbbArray = []
              // for(let a in mjfbbList){
              //   for(let b in mjfbbList[a]){
              //     mjfbbArray.push(mjfbbList[a][b])
              //   }
              // }
              // console.log('mjfbbArray',mjfbbArray)

              // console.log('mjfbbList',mjfbbList)
              // console.log('mjypbList',mjypbList)
              let rwb = []
              let index = 0
              if (mjypbList != null && mjypbList.length >= 1) {
                index = mjypbList[0].jian_ce_xiang_mu2.split(",").length - 1
              }
              for (var i in mjypbList) {
                let str = mjypbList[i].jian_ce_xiang_mu2.split(",")
                // index += str.length-1
                for (var p in str) {
                  // console.log('坐标',i,p)
                  let temp = index - p
                  let rwzb = {}
                  let wz_ = ypInfoList[i].shi_fou_liu_yang_ == "是" ? ypInfoList[i].liu_yang_wei_zhi_ : ypInfoList[i].shou_yang_wei_zhi //	对应的样品存放位置
                  rwzb["jian_ce_xiang_mu_"] = str[p] //	取当前检测项目
                  rwzb["yang_pin_bian_hao"] = mjypbList[i].yang_pin_bian_hao //	取对应的样品编号
                  rwzb["yang_pin_ming_che"] = mjypbList[i].yang_pin_ming_che //	对应的样品名称
                  rwzb["yang_pin_dai_ci_"] = mjypbList[i].dai_ci_ //	对应的样品代次
                  rwzb["yang_pin_pi_hao_"] = mjypbList[i].pi_hao_ //	对应的样品批号
                  rwzb["yang_pin_shu_lian"] = mjypbList[i].shu_liang_ //	对应的样品数量
                  rwzb["bug_ri_qi_"] = mjypbList[i].song_yang_ri_qi_ //  对应的送样日期
                  rwzb["cun_fang_wei_zhi_"] = wz_
                  rwzb["wei_tuo_wai_jian_"] = mjypbList[i].wai_jian_ //	检测申请单id
                  rwzb["he_tong_wai_jian_"] = mjwtsqbAllResult[i].he_tong_bian_hao_ //合同id
                  rwzb["song_yang_ri_qi_"] = mjypbList[i].biao_zhi_uuid_ // 收样日期
                  rwzb["wei_tuo_ren_"] = mjwtsqbAllResult[i].lian_xi_ren_ // 委托人
                  rwzb["bao_gao_jian_ce_s"] = this_.dateFormat() // 检测时间
                  rwzb["zhan_shi_biao_wai"] = mjwtsqbAllResult[i].ye_mian_zong_zhua
                  rwzb["zhuang_tai_"] = "任务待分配" //	状态
                  rwzb["shi_fou_fen_bao_"] = mjfbbList[0][temp].shi_fou_fen_bao_ // 是否分包
                  rwzb["qi_wang_wan_cheng"] = mjfbbList[0][temp].wan_cheng_shi_jia // 期望完成时间
                  rwzb["gong_xian_zhi_"] = mjypbList[i].yang_pin_lei_xin			// 供限值
                  rwb.push(rwzb)
                }
                index += str.length
              }
              // console.log('任务表：',rwb)

              repostCurd('updates', '{"tableName":"t_mjwtsqb","paramWhere":[' + mjwtsqbIdList + '],"paramCond":{"jian_ce_kai_shi_s":"' + this_.dateFormat() + '"}}')
              let uidList = []
              for (let item of mjwtsqbAllResult) {
                uidList.push(item.ye_mian_zong_zhua)
              }
              uidList = this_.unique(uidList)
              repostCurd('add', '{"tableName":"t_rwfpb","paramWhere":' + JSON.stringify(rwb) + ',"defKey":"Process_04tgh24","formKey":"mjrwfp"}')
              if (uidList.length > 0) {
                let ups = []
                for (let t of uidList) {
                  ups.push('{"shen_qing_id_":"' + t + '"}')
                }
                repostCurd('updates', '{"tableName":"t_mjwtzsb","paramWhere":[' + ups + '],"paramCond":{"zhuang_tai_":"任务分配进行中"}}')
              } /**/
            }, 5000)
          })
          this.$emit('callback', true)
          this.visable = false
          this.$message({
            message: '样品接收确认操作成功！',
            type: 'success'
          })
          this.closeDialog();
        }).catch(_ => {});
      }

    },

    /* 去除指定行数据 使用过滤器filter过滤指定行号数据 */
    deleteData(val) {
      this.listData = this.listData.filter((data) => {
        return data.id_ != val
      })
    },

    unique(arr) {
      return arr.filter((item, index) => {
        return arr.indexOf(item, 0) === index;
      });
    },
    /* 提交数据
     commitData(val){
       for(let item of val) {
              let dataWhere = [] //ajax的修改字段
              dataWhere.push('{"tableName":"t_gdyrqcyp" + "," + "paramWhere":"id_:'+item.id_ +'" +","+    "shu_liang_":"'+ item.shu_liang_ +'"  +","+  "lingYongRen":"' + item.ling_yong_ren_ + '"  +","+  "cunFangWeiZhi":"' + item.cun_fang_wei_zhi_ + '"  +","+  "sign":"out"}')
                // dataWhere.push('{"yangPinBianHao":"'+ item.yang_pin_bian_hao +'"  +","+  "lingYongRen":"' + item.ling_yong_ren_ + '"  +","+  "cunFangWeiZhi":"' + item.cun_fang_wei_zhi_ + '"  +","+  "shuLiang":"' + item.shu_liang_ + '"}')

             // repostCurd('updateSample',"{data:'"+JSON.stringify(dataWhere)+"'}").then(response =>{
             //   console.log(response)
             // })

             // this.Update('t_gdyrqcyp',{"id_":item.id_},"{data:'"+JSON.stringify(dataWhere)+"'}").then(response => {
             //            this.$emit('callback', true)
             //            this.visible = false
             //            this.$message({
             //                      message: '样品出库操作成功!',
             //                      type: 'success'
             //                    });
             //          })
                }
     },*/
    Update(name, where, cond) {
      let cont = {}
      cont['tableName'] = name
      cont['paramWhere'] = where
      cont['paramCond'] = cond
      return repostCurd('update', JSON.stringify(cont))
    },

    /* zzj add */
    dateFormat() { // 获取当前时间
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return year + "-" + month + "-" + day;
    },


    /* 关闭*/
    remRedar() {
      this.visible = false // 列表隐藏
      this.listData = [] // 清空列表数据
      this.redar = false // 扫码图标隐藏
      this.$emit('scanOff', false)
    },

  }
}
