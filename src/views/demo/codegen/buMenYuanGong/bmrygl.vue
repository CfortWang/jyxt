<template>
 <el-dialog
   :visible.sync="dialogVisible"
   :close-on-click-modal="false"
   :close-on-press-escape="false"
   class="bpmn-formrenderer-dialog"
   fullscreen
   destroy-on-close
   append-to-body
   @open="getFormData"
   @close="closeDialog"
 >
 <div class="jbd-sys-title" style="margin-bottom: 10px;">

      <span  class="jbd-sys-title-cont-center" style="margin-left: 40px;float: left;">金通实验室认证认可LIMS系统V2.</span>
     <span style="float: right; " class="jbd-sys-title-contact">
       </br>
     深圳市金源信通科技有限公司 <i style="margin-left: 10px;" class="el-icon-phone"/> 0755 - 2642 4403
     <i style="margin-left: 20px;" class="el-icon-phone"/> 136 0258 3429
     </span>
  </div>

 <div >
<div style="width: 86%;background-color:#FFFFFF;margin:0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
 <!--顶部按钮 请根据实际添加-->
     <div class="dynamic-form" >
       <div style="margin-left:88%;">
           <ibps-toolbar
             :actions="actions"
             @action-event="handleButtonEvent"
           />
       </div>
                  <hr>
        <!--表头-->
        <div class="form-header">
           <div class="title" style="text-align: center;" >[ {{models.name}} ] 的个人情况</div>
     </div>
     </div>

    <el-form ref="form" :model="models" :rules="rules" :inline="inline" :label-suffix="labelSuffix" :label-width="labelWidth"
      :label-position="labelPosition" :status-icon="statusIcon" :hide-required-asterisk="hideRequiredAsterisk"
      @submit.native.prevent>

      <el-row :gutter="0" justify="start" align="top" class="widget-col" type="flex">
        <el-col :span="6">
          <el-form-item label="名称" prop="name">
            <el-input v-model="models.name" placeholder="请输入" type="text" name="name" :autosize="autosize" :rows="3"
              :readonly="readonly" clearable :style="{width:width}" />
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-select v-model="models.gender" placeholder="请选择" name="gender" :style="{width:width}" :disabled="readonly" clearable>

              <el-option key="male" label="男" value="male" />
              <el-option key="female" label="女" value="female" />

            </el-select>
          </el-form-item>

          <el-form-item label="地址" prop="address">
            <el-input v-model="models.address" placeholder="请输入" type="text" name="address" :autosize="autosize" :rows="3"
              :readonly="readonly" clearable :style="{width:width}" />
          </el-form-item>

        </el-col>
        <el-col :span="6">

          <el-form-item label="技能职称" prop="jiNengZhiCheng">
            <el-input v-model="models.jiNengZhiCheng" placeholder="请输入" type="text" name="jiNengZhiCheng" :autosize="autosize"
              :rows="3" :readonly="readonly" clearable :style="{width:width}" />
          </el-form-item>

          <el-form-item label="QQ" prop="qq">
            <el-input v-model="models.qq" placeholder="请输入" type="text" name="qq" :autosize="autosize" :rows="3"
              :readonly="readonly" clearable :style="{width:width}" />
          </el-form-item>
         <!-- <el-form-item label="鉴定资格编号" prop="jianDingZiGeZ">
            <el-input v-model="models.jianDingZiGeZ" placeholder="请输入" type="text" name="jianDingZiGeZ" :autosize="autosize"
              :rows="3" :readonly="readonly" clearable :style="{width:width}" />
          </el-form-item> -->

         <!-- <el-form-item label="授权人证书号" prop="shouQuanQianZ">
            <el-input v-model="models.shouQuanQianZ" placeholder="请输入" type="text" name="shouQuanQianZ" :autosize="autosize"
              :rows="3" :readonly="readonly" clearable :style="{width:width}" />
          </el-form-item> -->
          <el-form-item label="文件" prop="photo">
            <ibps-attachment v-model="models.photo" placeholder="请选择" :download="true" :readonly="readonly" accept="*"
              :multiple="true" upload-type="default" store="id" media-type="" media="" :style="{width:width}" />
          </el-form-item>


        </el-col>
        <el-col :span="6">

          <el-form-item label="电话" prop="mobile">
            <el-input v-model="models.mobile" placeholder="请输入" type="text" name="mobile" :autosize="autosize" :rows="3"
              :readonly="readonly" clearable :style="{width:width}" />
          </el-form-item>

          <el-form-item label="微信账号" prop="wcAccount">
            <el-input v-model="models.wcAccount" placeholder="请输入" type="text" name="wcAccount" :autosize="autosize"
              :rows="3" :readonly="readonly" clearable :style="{width:width}" />
          </el-form-item>



        </el-col>
        <el-col :span="6">

          <el-form-item label="部门" prop="groupId">
            <ibps-user-selector v-model="models.groupId" placeholder="请选择" type="org" :multiple="true" store="id"
             :disabled="readonly" :readonly-text="readonly?'text':null" :style="{width:width}" />

          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="models.email" placeholder="请输入" type="text" name="email" :autosize="autosize" :rows="3"
              :readonly="readonly" clearable :style="{width:width}" />
          </el-form-item>

        </el-col>

      </el-row>
             <el-row>
            <el-col :span="12">
              <el-col :span="12">
            <el-form-item label="岗位" prop="positions">
              <ibps-user-selector v-model="models.positions" placeholder="请选择" type="position" :multiple="true" store="id"
                :disabled="readonly"  :readonly-text="readonly?'text':null" :style="{width:width}" />
            </el-form-item>
             </el-col>
            <!-- <el-col :span="12">
            <el-form-item label="文件" prop="photo">
              <ibps-attachment v-model="models.photo" placeholder="请选择" :download="true" :readonly="readonly" accept="*"
                :multiple="true" upload-type="default" store="id" media-type="" media="" :style="{width:width}" />
            </el-form-item>
             </el-col> -->
            </el-col>
  <el-col :span="12">
       <!--     <el-col :span="5">
                 <el-form-item
                       prop="hyperlink_04l25kwp">
                       <ibps-link
                         text="信息封面"
                         link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}03人员培训和考核程序/SGJS-CX-03-02B 人员档案封面.rpx&id_=${options.formData.id}'})` }])"
                         show-type="button"
                         text-type="fixed"
                         link-type="javascript"
                         text-javascript=""
                         :form-data="models"
                         type="info"
                         preview-entrance
                         icon="ibps-icon-clipboard"
                       />

                       </el-form-item>
                     </el-col>

 -->
            <el-col :span="5">
                 <el-form-item
                       prop="hyperlink_04l2k4wp">
                       <ibps-link
                         text="人员基本信息"
                         link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash.replace('show','pdf')}03人员培训和考核程序/SGJS-CX-03-02B 人员基本情况登记表.rpx&user_id=${options.formData.id}'})` }])"
                         show-type="button"
                         text-type="fixed"
                         link-type="javascript"
                         text-javascript=""
                         :form-data="models"
                         type="info"
                         preview-entrance
                         icon="ibps-icon-clipboard"
                       />

                       </el-form-item>
                     </el-col>

            <el-col :span="5">
                     <el-form-item
                           prop="hyperlink_04l222p">
                           <ibps-link
                             text="人员技术档案"
                             link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash.replace('show','pdf')}03人员培训和考核程序/SGJS-CX-03-03B 人员技术档案目录.rpx&id_=${options.formData.id}'})` }])"
                             show-type="button"
                             text-type="fixed"
                             link-type="javascript"
                             text-javascript=""
                             :form-data="models"
                             type="info"
                             preview-entrance
                             icon="ibps-icon-clipboard"
                           />

                           </el-form-item>
                         </el-col>

                         <el-col :span="5">
                                  <el-form-item
                                        prop="hyperlink_0422kwp">
                                        <ibps-link
                                          text="业务培训履历"
                                          link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash.replace('show','pdf')}03人员培训和考核程序/SGJS-CX-03-04B 人员培训履历表.rpx&id_=${options.formData.id}'})` }])"
                                          show-type="button"
                                          text-type="fixed"
                                          link-type="javascript"
                                          text-javascript=""
                                          :form-data="models"
                                          type="info"
                                          preview-entrance
                                          icon="ibps-icon-clipboard"
                                        />

                                        </el-form-item>
                                      </el-col>
                    </el-col>
               </el-row>

    </el-form>
    <el-divider/>

<el-menu :default-active="activeIndex"
 class="el-menu-demo"
 mode="horizontal"
 text-color="#000000"
 active-text-color="#409EFF"
 default-active ='1'
 @click.native="clickCont($event)"
 @select="handleSelect">
 <el-menu-item  index="1">【基本情况】</el-menu-item>
  <el-menu-item index="2" >【获奖情况】</el-menu-item>
  <el-menu-item index="3">【论文、著作专题】</el-menu-item>
  <el-menu-item index="4" >【技术档案目录】</el-menu-item>
  <el-menu-item index="5" >【主要工作经历】</el-menu-item>
  <el-menu-item index="6" >【培训记录】</el-menu-item>
  <el-menu-item index="7" >【考核记录】</el-menu-item>
  <el-menu-item index="8" >【业务能力确认及授权】</el-menu-item>
  <el-menu-item index="9" >【能力监控评价】</el-menu-item>
</el-menu>
 <el-divider >{{clickName}}</el-divider>
<div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin:20px;">
  <!-- 基本情况-->
   <el-form v-if="activeIndex == '1'"
   style="padding: 20px;;"
   ref="basicForm"
   :model="ryjbqk"
   :inline="inline"
   :label-suffix="labelSuffix"
   :label-width="labelWidth"
   :label-position="labelPosition"
   :status-icon="statusIcon"
   :hide-required-asterisk="hideRequiredAsterisk"
   @submit.native.prevent>

        <div>
                <!--块模式：表单-->


            <el-row :gutter="0" justify="start" align="top" class="widget-col" type="flex">
              <el-col :span="8">

                <el-form-item label="出生年月" prop="chuShengNianYue">
                  <el-date-picker v-model="ryjbqk.chuShengNianYue" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                    placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="true" />
                </el-form-item>

                <el-form-item label="民族" prop="minZu">
                  <el-input v-model="ryjbqk.minZu" placeholder="请输入" type="text" name="minZu" :autosize="autosize"
                    :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <!-- <el-form-item label="参加公安时间" prop="canJiaGongAn">
                  <el-date-picker v-model="ryjbqk.canJiaGongAn" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                    placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="true" />
                </el-form-item> -->

                <el-form-item label="任职时间" prop="renZhiShiJian">
                  <el-date-picker v-model="ryjbqk.renZhiShiJian" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                    placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="true" />
                </el-form-item>

                <el-form-item label="现专业技术职务" prop="xianZhuanYeJiSh">
                  <el-input v-model="ryjbqk.xianZhuanYeJiSh" placeholder="现专业技术职务" type="text" name="xianZhuanYeJiSh"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="原学历" prop="yuanXueLi">
                  <el-input v-model="ryjbqk.yuanXueLi" placeholder="请输入" type="text" name="yuanXueLi" :autosize="autosize"
                    :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="原学位" prop="yuanXueWei">
                  <el-input v-model="ryjbqk.yuanXueWei" placeholder="请输入" type="text" name="yuanXueWei" :autosize="autosize"
                    :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="原毕业院校" prop="yuanBiYeYuanXi">
                  <el-input v-model="ryjbqk.yuanBiYeYuanXi" placeholder="请输入" type="text" name="yuanBiYeYuanXi"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="原毕业时间" prop="yuanBiYeShiJi">
                  <el-date-picker v-model="ryjbqk.yuanBiYeShiJi" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                    placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="true" />
                </el-form-item>

                <el-form-item label="原专业" prop="yuanZhuanYe">
                  <el-input v-model="ryjbqk.yuanZhuanYe" placeholder="请输入" type="text" name="yuanZhuanYe"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="原毕业证书" prop="yuanBiYeZheng">
                  <el-input v-model="ryjbqk.yuanBiYeZheng" placeholder="请输入" type="text" name="yuanBiYeZheng"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="原学位证书" prop="yuanXueWeiZhen">
                  <el-input v-model="ryjbqk.yuanXueWeiZhen" placeholder="请输入" type="text" name="yuanXueWeiZhen"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

              </el-col>
              <el-col :span="8">

                <el-form-item label="身份证号码" prop="shenFenZhengHao">
                  <el-input v-model="ryjbqk.shenFenZhengHao" placeholder="请输入" type="text" name="shenFenZhengHao"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="政治面貌" prop="zhengZhiMianMao">
                  <el-input v-model="ryjbqk.zhengZhiMianMao" placeholder="请输入" type="text" name="zhengZhiMianMao"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

          <!--      <el-form-item label="入党团时间" prop="ruDangTuanShi">
                  <el-date-picker v-model="ryjbqk.ruDangTuanShi" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                    placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="true" />
                </el-form-item> -->

                <el-form-item label="取得资格时间" prop="quDeZiGeShiJ">
                  <el-date-picker v-model="ryjbqk.quDeZiGeShiJ" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                    placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="true" />
                </el-form-item>

                <el-form-item label="现从事专业" prop="xianCongShiZhua">
                  <el-input v-model="ryjbqk.xianCongShiZhua" placeholder="请输入" type="text" name="xianCongShiZhua"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="在职学历" prop="zaiZhiXueLi">
                  <el-input v-model="ryjbqk.zaiZhiXueLi" placeholder="请输入" type="text" name="zaiZhiXueLi"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="在职学位" prop="zaiZhiXueWei">
                  <el-input v-model="ryjbqk.zaiZhiXueWei" placeholder="请输入" type="text" name="zaiZhiXueWei"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="在职毕业院校" prop="zaiZhiBiYe">
                  <el-input v-model="ryjbqk.zaiZhiBiYe" placeholder="请输入" type="text" name="zaiZhiBiYe" :autosize="autosize"
                    :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="在职毕业时间" prop="zaiZhiBiYeSh">
                  <el-date-picker v-model="ryjbqk.zaiZhiBiYeSh" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                    placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="true" />
                </el-form-item>

                <el-form-item label="在职专业" prop="zaiZhiZhuanYe">
                  <el-input v-model="ryjbqk.zaiZhiZhuanYe" placeholder="请输入" type="text" name="zaiZhiZhuanYe"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="在职毕业证书" prop="zaiZhiBiYeZheng">
                  <el-input v-model="ryjbqk.zaiZhiBiYeZheng" placeholder="请输入" type="text" name="zaiZhiBiYeZheng"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="在职学位证书" prop="zaiZhiXueWeiZhe">
                  <el-input v-model="ryjbqk.zaiZhiXueWeiZhe" placeholder="请输入" type="text" name="zaiZhiXueWeiZhe"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

              </el-col>
              <el-col :span="8">

                <el-form-item label="籍贯" prop="jiGuan">
                  <el-input v-model="ryjbqk.jiGuan" placeholder="请输入" type="text" name="jiGuan" :autosize="autosize"
                    :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

               <!-- <el-form-item label="行政职务" prop="xingZhengZhiWu">
                  <el-input v-model="ryjbqk.xingZhengZhiWu" placeholder="请输入" type="text" name="xingZhengZhiWu"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item> -->

                <el-form-item label="参加工作时间" prop="canJiaGongZuo">
                  <el-date-picker v-model="ryjbqk.canJiaGongZuo" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd"
                    placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="true" />
                </el-form-item>

                <el-form-item label="本专业工作年限" prop="benZhuanYeGong">
                  <el-input v-model="ryjbqk.benZhuanYeGong" placeholder="本专业工作年限" type="text" name="benZhuanYeGong"
                    :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

              <!--  <el-form-item label="警衔" prop="jingXian">
                  <el-input v-model="ryjbqk.jingXian" placeholder="请输入" type="text" name="jingXian" :autosize="autosize"
                    :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item>

                <el-form-item label="警号" prop="jingHao">
                  <el-input v-model="ryjbqk.jingHao" placeholder="请输入" type="text" name="jingHao" :autosize="autosize"
                    :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                </el-form-item> -->

                <el-form-item label="签字图文" prop="qianZiTuWen">
                  <ibps-attachment v-model="ryjbqk.qianZiTuWen" placeholder="请选择" :download="true" :readonly="readonly"
                    :limit="1" accept="*" :multiple="true" upload-type="attachment" store="id" media-type=""
                    media="" style="width:100%;" />
                  <div class="ibps-help-block" v-html="`注：用在word表单上落款签名的电子签字图`" />

                </el-form-item>

              </el-col>

            </el-row>

            <el-form-item label="掌握何种外语，程度如何" prop="zhangWoHeZHe">
              <el-input v-model="ryjbqk.zhangWoHeZHe" placeholder="请输入" type="textarea" name="zhangWoHeZHe"
                :rows="4" clearable :style="{width:width}" />
            </el-form-item>

            <el-form-item label="参加何种学术团体、 任何职、有无社会其他兼职" prop="cashuUianZhi">
              <el-input v-model="ryjbqk.cashuUianZhi" placeholder="请输入" type="textarea" name="cashuUianZhi"
                 :rows="4"  clearable :style="{width:width}" />
            </el-form-item>

     </div>
 </el-form>
<HuoJiang v-if="activeIndex == '2'" :userId ="models.id" :readonly="readonly"/>
<LunWen v-if="activeIndex == '3'" :userId ="models.id" :readonly="readonly">  </LunWen>
<JiShu v-if="activeIndex == '4'" :userId ="models.id" :readonly="readonly">  </JiShu>
<JingLi v-if="activeIndex == '5'" :userId ="models.id" :readonly="readonly">  </JingLi>
<PeiXun v-if="activeIndex == '6'" :userId ="models.id" :readonly="readonly">  </PeiXun>
<YeWu v-if="activeIndex == '7'" :userId ="models.id">  </YeWu>
<NengLi v-if="activeIndex == '8'" :userId ="models.id">  </NengLi>
<JianKong v-if="activeIndex == '9'" :userId ="models.id">  </JianKong>
</div>

</div>
</div>
  </el-dialog>
</template>
<script>
  import { save, get } from '@/api/demo/codegen/buMenYuanGong'


  import ActionUtils from '@/utils/action'
  import {
    validateRequired
  } from '@/utils/validate'
  import IbpsUserSelector from '@/business/platform/org/selector'
  import IbpsLink from '@/components/ibps-link'
  import IbpsAttachment from '@/business/platform/file/attachment/selector'

  //-----------------------------------------------------------------------
  import HuoJiang from '../zhuYaoHuoJiangQingKuang/list'
  import LunWen from '../zhuYaoLunWen/list'
  import JiShu from '../renYuanJiShuDangAnMuLu/list'
  import JingLi from '../zhuYaoGongZuoJingLi/list'
  import PeiXun from '../renYuanYeWuPeiXunJiLu/list'
  import YeWu from '../yeWuKaoHeJiLu/list'
  import NengLi from '../yeWuNengLiQueRen/list'
  import JianKong from '../renYuanNengLiJianKong/list'



  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      id: String,
      title: String
    },
    components: {
      'ibps-user-selector': IbpsUserSelector,
      'ibps-link': IbpsLink,
      'ibps-attachment': IbpsAttachment,
       HuoJiang,
       LunWen,
       JiShu,
       JingLi,
       PeiXun,
       YeWu,
       NengLi,
       JianKong

    },
    data() {
      return {
        clickName:'【基本情况】',
        formName: 'form',
        dialogVisible: this.visible,
        dialogLoading: false,
        defaultForm: {},
        defaulRules: {},
        models: {
          id: '',
          name: '',
          profile: '',
          status: '',
          gender: '',
          email: '',
          address: '',
          mobile: '',
          qq: '',
          photo: '',
          positions: '',
          groupId: '',
          wcAccount: '',
          createTime: '',
          updateTime: '',
          job: '',
          tenantId: '',
          jiNengZhiCheng: '',
          jianDingZiGeZ: '',
          shouQuanQianZ: '',
        },
        ryjbqk: { id: '',
                parentId: '',
                tenantId: '',
                ip: '',
                createBy: '',
                createTime: '',
                updateBy: '',
                updateTime: '',
                chuShengNianYue: '',
                shenFenZhengHao: '',
                jiGuan: '',
                minZu: '',
                gongZuoBuMen: '',
                canJiaGongZuo: '',
                canJiaGongAn: '',
                zhengZhiMianMao: '',
                ruDangTuanShi: '',
                xingZhengZhiWu: '',
                renZhiShiJian: '',
                xianCongShiZhua: '',
                benZhuanYeGong: '',
                xianZhuanYeJiSh: '',
                quDeZiGeShiJ: '',
                jingXian: '',
                jingHao: '',
                yuanXueLi: '',
                yuanXueWei: '',
                yuanBiYeYuanXi: '',
                yuanBiYeShiJi: '',
                yuanZhuanYe: '',
                yuanBiYeZheng: '',
                yuanXueWeiZhen: '',
                zaiZhiXueLi: '',
                zaiZhiXueWei: '',
                zaiZhiBiYe: '',
                zaiZhiBiYeSh: '',
                zaiZhiZhuanYe: '',
                zaiZhiBiYeZheng: '',
                zaiZhiXueWeiZhe: '',
                zhangWoHeZHe: '',
                cashuUianZhi: '',
                jiNengZhiCheng: '',
                jianDingZiGeZ: '',
                qianZiTuWen: ''},
        zyhjqk: [],
        zylwzzhztjsfxbg: [],
        ryjsdaml: [],
        zygzjl: [],
        ryywpxjl: [],
        rykhjl: [],
        ywnlqrjsq: [],
        rynljkpj: [],

       actions:[
                 {
                   key: 'submit',
                   label: '确认',
                   type: 'primary',
                 },
                  { key: 'cancel' }
               ],
        inline: false,
        labelSuffix: ':',
        labelWidth: '115px',
        labelPosition: 'right',
        statusIcon: false,
        size: '',
        hideRequiredAsterisk: false,
        formLayout: 'second',
        isSubmi:true,

        readonlyText: 'text',
        multiple: false,
        autosize: '',
        width: '100%',

        rules: {
          shenFenZhengHao: [{
            "pattern": {},
            "message": "请输入正确的身份证号."
          }],
        },
        activeIndex: '1',
      }
    },
    computed: {
      formId() {
        return this.id
      }
    },
    watch: {
      visible: {
        handler: function(val, oldVal) {
          this.dialogVisible = this.visible
        },
        immediate: true
      }
    },
    created() {
      this.defaultForm = JSON.parse(JSON.stringify(this.models))
      this.defaulRules = JSON.parse(JSON.stringify(this.rules))
    },
    methods: {
    clickCont(data){
      this.clickName = data.target.innerText
    },
     handleSelect(key, keyPath) {
            this.activeIndex = key
          },
      submitForm(formName) {
        if(this.isSubmi){
          this.isSubmi = false
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.saveData()
            } else {
              return false;
            }
          })
        }
      },
      handleClick(tab, event) {

      },
      handleButtonEvent(button, data) {
        switch (button.key) {
          case 'submit':
          if(this.readonly){
            this.closeDialog()
              break
              }
            this.submitForm('form')
            break
          case 'cancel':
            this.closeDialog()
            break
          default:
            break
        }
      },
      // 关闭当前窗口
      closeDialog() {
        this.$emit('close', false)
        this.$refs[this.formName].resetFields()
        this.activeIndex="1"
      },
      // 提交保存数据
      saveData() {
        this.ryjbqk.parentId = this.models.id
        this.models['renYuanJiBengQingKuangPoList']=[this.ryjbqk]
        save(this.models).then(response => {
          this.isSubmi = true
          this.$emit('callback', this)
          ActionUtils.saveSuccessMessage("保存成功", (rtn) => {
            if (this.$utils.isEmpty(this.formId)) {
              this.$refs[this.formName].resetFields()
            }
            if (rtn) {
              this.closeDialog()
            }
          })
        }).catch((err) => {
          this.isSubmi = true
        })
      },
      /**
       * 获取表单数据
       */
      getFormData() {
        if (this.readonly) {
          this.rules = {}
        } else {
          this.rules = this.defaulRules
        }
        if (this.$utils.isEmpty(this.formId)) {
          // 重置表单
          this.models = JSON.parse(JSON.stringify(this.defaultForm))
          this.formValidate()
          return
        }
        this.dialogLoading = true
        get({
          id: this.formId
        }).then(response => {
          this.models = response.data
          if(response.data.renYuanJiBengQingKuangPoList[0]){
            this.ryjbqk = response.data.renYuanJiBengQingKuangPoList[0]
          }else{
            this.ryjbqk = {}
          }
          this.dialogLoading = false
        }).catch(() => {
          this.dialogLoading = false
        })
      },

    }
  }
</script>
<style lang="scss">
  .dynamic-form {
    .el-input {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }

    .el-collapse-item__header.is-active {
      border-bottom: 1px solid #EBEEF5;
      margin-bottom: 5px;
    }

    .form-header {
      border-bottom: 1px solid #2b34410d;
      margin-bottom: 5px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: #222;
        text-align: left;
        padding: 8px 10px 10px;
        margin: 0;
      }

      .desc {
        word-wrap: break-word;
        word-break: normal;
        text-indent: 0;
        line-height: 1.6;
        margin: 0 0 11px;
        padding: 3px 30px 8px;
      }
    }

    .dynamic-form-table-item__readonly {
      margin-bottom: 0;
    }

    //===================border-form====================
    .ibps-border-form {
      border: 1px solid #cfd7e5;

      .el-form-item {
        border-top: 1px solid #cfd7e5;
      }

      .el-form-item__content:before {
        width: 1px;
        background: #cfd7e5;
        display: block;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: -20px;
      }

      .el-form-item__content .el-form-item__error {
        left: 5px
      }

      .el-form--label-top .el-form-item__content:before,
      .no-label-form-item .el-form-item__content:before {
        background: transparent
      }

      .el-row+.el-row {
        border-top: 1px solid #cfd7e5
      }

      .el-col+.el-col {
        border-left: 1px solid #cfd7e5
      }

      .el-col {
        overflow: hidden
      }

      .el-form-item__content {
        padding: 5px;
        padding-bottom: 0
      }

      .el-form-item__label {
        padding: 5px
      }

      .el-table {
        .el-form-item {
          border-top: 0;
        }

        .el-form-item__content:before {
          width: 0;
        }

        .el-form-item__content {
          padding: 0;
        }

      }

    }

  }

  .dynamic-form-table {
    .panel-heading {
      border-bottom: 0;
      border-left: 1px solid #dde7ee;
      border-right: 1px solid #dde7ee;
    }

    .dynamic-form-table__inner {
      .panel-body {
        padding: 0;
      }
    }

    .dynamic-form-table__block {
      padding-bottom: 10px;

      .panel-body {
         border: 0px;
      }
    }

    .el-rate {
      position: relative;
      display: inline-block;
    }
  }

  .is-error {
    .dynamic-form-table {
      border: 1px solid #F56C6C;
    }
  }

  .is-required:not(.is-no-asterisk) {
    .dynamic-form-table__label:before {
      content: '*';
      color: #F56C6C;
      margin-right: 4px;
    }
  }
</style>
