
<template>
  <edit :visible='visible'>

  <template v-slot:form>
    <div >
    <div class="dynamic-form" :class=" {'jbd-form-cont':!isDialog }">

<!-- 表头按钮-->
        <div class="form-toolbar hidden-print">
          <div class="ibps-toolbar" >
            <div class="header" style="height: 30px;">
              <div class="buttons" style="float: right;margin-right:8%;">
                   <el-button
                     :key="0"
                     type="primary"
                     icon="save"
                     @click="handleActionEvent({ key: 'save' })"
                   >
                     提交
                   </el-button>

                      <el-button
                      :key="1"
                      type="danger"
                      icon="cancel"
                      @click="handleActionEvent({ key: 'cancel' })"
                    >
                      返回
                    </el-button>
              </div>
            </div>
          </div>
        </div>


   <div style="width: 100%;height: 820px;">
   <div slot="header" class="el-dialog--center" style="height:40px;width: 100%;vertical-align: top;padding-top:10px;font-size: 18px;font-weight: bold;" >{{title}}</div>
   <div slot="header" style="padding-left:2px;height:25px;width: 100%;vertical-align: top;padding-top:10px;display: inline">

     <el-form
         ref="form"
         :rules="rules"
         :element-loading-text="$t('common.loading')"
         :model="form"
         label-width="120px">
         <el-row
                :gutter="0"
                justify="start"
                align="top"
                class="widget-col"
                type="flex"
              >
                 <el-col :span="22" >
          <el-form-item
                                label="部门" class="el-form--label-left"
                                prop="bianZhiBuMen">
<el-select style="display: inline-block;"
             v-model="models.bianZhiBuMenId"
             placeholder="请先选择检测项目"
             :disabled="readonly"
             :readonly="readonly"
             :readonly-text="readonlyText?'text':'original'"
             :style="{width:'360px'}"
           ><el-option v-for="item in models.buMenList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option></el-select>

         </el-form-item>
                 </el-col>
                 <el-col :span="22" ><el-form-item
                          label="检测类别" class="el-form--label-left"
                          prop="jianceLeiBie">
                          
            <ibps-dictionary
                   v-model="models.shiFouCnas"
                   type-key="jclb"
                   :multiple="false"
                   select-mode="leaf"
                   display-mode="path"
                   separator="/"
                   placeholder="请选择"
                   :disabled="readonly"
                   :readonly="readonly"
                   :readonly-text="readonlyText?'text':'original'"
                   :clearable="true"
                   :style="{width:'360px'}"
                 />              
   <!--el-select v-model="models.shiFouCnas" placeholder="请选择" style="width: 360px;">
     <el-option
       v-for="item in typeOptions"
       :key="item.value"
       :label="item.label"
       :value="item.value">
     </el-option>
   </el-select--></el-form-item>
                 </el-col>
               </el-row>

        <el-row
          :gutter="0"
          justify="start"
          align="top"
          class="widget-col"
          type="flex"
        >
           <el-col :span="22" >
    <el-form-item
                          label="检测对象" class="el-form--label-left"
                          prop="jianCeDuiXiang">
          <el-select style="display: inline-block;"
             v-model="models.jianCeDuiXiang"
             placeholder="请先选择检测项目"
             :disabled="readonly"
             :readonly="readonly"
             :readonly-text="readonlyText?'text':'original'"
             :style="{width:'360px'}"
           ><el-option v-for="item in models.duiXiangList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option></el-select>
                        </el-form-item>
           </el-col>
           <el-col :span="22" ><el-form-item
                                 label="检测类型" class="el-form--label-left"
                                 prop="xiangMuLeiBie">
         <el-select style="display: inline-block;"
             v-model="models.jianCeLeiBieId"
             placeholder="请先选择检测项目"
             :disabled="readonly"
             :readonly="readonly"
             :readonly-text="readonlyText?'text':'original'"
             :style="{width:'360px'}"
           ><el-option v-for="item in models.leiBieList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option></el-select></el-form-item>
           </el-col>
         </el-row>
         <el-row
           :gutter="0"
           justify="start"
           align="top"
           class="widget-col"
           type="flex"
         >
           <el-col :span="22" ><el-form-item
                                 label="项目/参数" class="el-form--label-left"
                                 prop="xiangMuCanShu">
        <el-input style="display: inline-block;"
            v-model="models.xiangMuCanShu"
            placeholder="请先选择检测项目"
            :disabled="readonly"
            :readonly="readonly"
            :readonly-text="readonlyText?'text':'original'"
            :style="{width:'360px'}"
          ></el-input></el-form-item>
           </el-col>


           <el-col :span="22" ><el-form-item
                                   label="状态" class="el-form--label-left"
                                   prop="status">

                                    <ibps-dictionary
                                           v-model="models.status"
                                           type-key="zt"
                                           :multiple="false"
                                           select-mode="leaf"
                                           display-mode="path"
                                           separator="/"
                                           placeholder="请选择"
                                           :disabled="readonly"
                                           :readonly="readonly"
                                           :readonly-text="readonlyText?'text':'original'"
                                           :clearable="true"
                                           :style="{width:'360px'}"
                                         />

           <!--el-select style="display: inline-block;"
               v-model="models.status"
               placeholder="请选择"
               :disabled="readonly"
               :readonly="readonly"
               :readonly-text="readonlyText?'text':'original'"
               :style="{width:'360px'}"
             ><el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                          </el-option></el-select--></el-form-item>
             </el-col>

         </el-row>

         <el-row
            :gutter="0"
            justify="start"
            align="top"
            class="widget-col"
            type="flex"
          >
            <el-col :span="22" ><el-form-item
                                  label="项目价格" class="el-form--label-left"
                                  prop="price">
         <el-input style="display: inline-block;"
             v-model="models.price"
             placeholder="请输入价格"
             :disabled="readonly"
             :readonly="readonly"
             :readonly-text="readonlyText?'text':'original'"
             :style="{width:'360px'}"
           ></el-input>元</el-form-item>
            </el-col>

 <el-col :span="22" ><el-form-item
                                   label="设备" class="el-form--label-left"
                                   prop="sheBei">
            <ibps-custom-dialog
                  v-model="models.sheBei"
                  template-key="xsbxsbfhsbmc"
                  placeholder="请选择"
                  store="id"
                  icon="ibps-icon-search-plus"
                  type="dialog"
                  multiple="true"
                  :disabled="readonly"
                  :readonly-text="readonlyText?'text':null"
                  :style="{width:'360px'}"
                />
            </el-form-item>
             </el-col>
          </el-row>
      </el-form>

    </div>
   <div slot="header" class="el-dialog--center" style="height:10px;width: 100%;vertical-align: top;padding-top:10px"></div>
   <div style="width: 100%;height: 700px;height:auto!important;min-height:250px;">
     <el-tabs v-model="activeName" type="card" @tab-click="loadTab">


       <el-tab-pane label="检测标准" name="tab1">
        <div>
        <el-form
            ref="form"
            :rules="rules"
            :element-loading-text="$t('common.loading')"
            :model="form"
            label-width="50px">

            <el-row :gutter="1" >
              <el-col :span="200" >
                <el-table
                  ref="elTable1"
                  :data="models.buZhou2List"
                  border
                  stripe
                >
                <el-table-column
                    :key="1"
                    prop="id"
                    width="15px"
                    label="序号"
                  >
                   <template slot-scope="scope" v-if="scope.row.displayFlag"  >
                   {{scope.$index+1}}、
                   </template>
                </el-table-column>
                <el-table-column
                    :key="1"
                    prop="desc"
                    width="150px" label="说明"
                  >

               <template slot-scope="scope" v-if="scope.row.displayFlag">
                  <el-row :gutter="1" >
                   <el-col :span="2" style="width:100px">
                     方法：
                   </el-col>
                  <el-col :span="15" >
                     <el-input type="text" v-model="scope.row.fangFaName" style="width: 500px;" @input="$forceUpdate()"></el-input>
                  </el-col>
                  </el-row>

                   <el-row :gutter="1" >
                    <el-col :span="2"  style="width:100px" >
                     检测标准绑定： </el-col>
                  <el-col :span="15" ><!--ibps-attachment
                               v-model="scope.row.fangFaWenJian"
                               placeholder="请选择"
                               :download="true"
                               :readonly="readonly"
                               accept="*"
                               :multiple="true"
                               upload-type="attachment"
                               store="id"
                               media-type=""
                               media=""
                               :style="{width:'500px'}"
                             /-->
                             <ibps-custom-dialog
                                  v-model="scope.row.fangFaWenJian"
                                  template-key="wjgljswx"
                                  placeholder="请选择"
                                  store="id"
                                  icon="ibps-icon-search-plus"
                                  type="dialog"
                                  :multiple="false"
                                  :disabled="readonly"
                                  :readonly-text="readonlyText?'text':null"
                                  :style="{width:'500px'}"
                                   @change="(val,name)=>biaoZhunChange(name,val,scope.row,scope.$index)"
                                />
                   </el-col>
                   </el-row>
                    <el-row :gutter="1" >
                   <el-col :span="2"  style="width:100px" >
                    限制范围： </el-col>
                  <el-col :span="15" ><el-input type="text" v-model="scope.row.desc" style="width: 500px;" @input="$forceUpdate()"></el-input>
                   </el-col>
                </el-row>



              　　
                 　 <el-button
                  :key="1"
                  type="danger"
                  icon="cancel"
                  @click="handleActionEvent({ ind:scope.$index,key: 'deleteRow',type:'buZhou2'  })"
                >
                删除
                </el-button>　

               </template>

            </el-table-column>
            </el-table>
        </el-col>
        </el-row>

        </el-form>
       </div>
       </el-tab-pane>

     <el-tab-pane label="检测步骤" name="tab2">

      <el-form
          ref="form"
          :rules="rules"
          :element-loading-text="$t('common.loading')"
          :model="form"
          label-width="50px">

          <el-row :gutter="1" >
            <el-col :span="200" >
              <el-table
                ref="elTable1"
                :data="models.buZhouList"
                border
                stripe
              >
              <el-table-column
                  :key="1"
                  prop="id"
                  width="15px"
                  label="序号"
                >
                 <template slot-scope="scope" v-if="scope.row.displayFlag"  >
                 {{scope.$index+1}}、
                 </template>
              </el-table-column>
              <el-table-column
                  :key="2"
                  prop="desc"
                  width="150px" label="说明"
                >

             <template slot-scope="scope" v-if="scope.row.displayFlag" >

                  <el-row :gutter="1" >
                <el-col :span="15" ><el-input rows="6" type="textarea" v-model="scope.row.desc" style="width: 700px;"></el-input>
                 </el-col>
              </el-row>
              <br>
              <div class="width100Precent">
                                          <div class="uploadIMG uploadSty"   >
                                              <el-upload
                                                  action="#"
                                                  ref="upload1"
                                                :on-remove="(file)=>handleRemove(file,scope.row,scope.$index)"
                                                :on-success="(response,file,fileList)=>handleSuccess(response, file, fileList,scope.row)"
                                                :on-error="handleError"
                                                :http-request="(o)=>httpRequest(o,scope.row)"
                                               multiple
                                               list-type="picture-card"
                                               :auto-upload="true"
                                               :before-upload="(file)=>beforeUpload(file,scope.row,scope.$index)"

                                               accept=".jpeg,.jpg,.png,"
                                               :file-list="scope.row.fileList"
                                               :on-preview="handlePictureCardPreview"
                                               :limit="20"
                                               :class="{disUoloadSty:hideUploadEdit}"
                                                 >
                                                  <i slot="default" class="el-icon-plus"></i>
                                              </el-upload>

                                          </div>
                  <el-dialog :visible.sync="dialogImgVisible"   title="图片" class="e-dialog"   :modal-append-to-body="true" :append-to-body="true">
                  　　<img width="100%" :src="dialogImageUrl" alt="">
              　　</el-dialog>
                                      </div>
               　 <el-button
                :key="1"
                type="danger"
                icon="cancel"
                @click="handleActionEvent({ ind:scope.$index,key: 'deleteRow',type:'buZhou'  })"
              >
              删除
              </el-button>　

             </template>

          </el-table-column>
          </el-table>
      </el-col>
      </el-row>

      </el-form>
     </el-tab-pane>

       <el-tab-pane label="设备使用指南" name="tab3">



            <el-form
                ref="form"
                :rules="rules"
                :element-loading-text="$t('common.loading')"
                :model="form"
                label-width="50px">


                <el-row :gutter="1" >
                  <el-col :span="200" >
                    <el-table
                      ref="elTable1"
                      :data="models.sbsyffList"
                      border
                      stripe


                    >
                    <el-table-column
                        :key="1"
                        prop="id"
                        width="15px"
                        label="序号"
                      >
                       <template slot-scope="scope" v-if="scope.row.displayFlag">
                       {{scope.$index+1}}、
                       </template>
                    </el-table-column>
                    <el-table-column
                        :key="2"
                        prop="desc"
                        width="150px" label="说明"
                      >
                   <template slot-scope="scope" v-if="scope.row.displayFlag">

                      <el-row :gutter="1" >

                     <el-col :span="15" ><el-input type="textarea" rows="6" v-model="scope.row.desc" style="width: 700px;" @input="$forceUpdate()" :disabled="readonly"></el-input>
                     </el-col>
                     </el-row>
                      <br>
                   <div class="width100Precent">
                                               <div class="uploadIMG uploadSty"  >
                                                   <el-upload
                                                       action="#"
                                                       ref="upload2"
                                                    :on-remove="(file)=>handleRemove(file,scope.row,scope.$index)"
                                                     :on-success="(response,file,fileList)=>handleSuccess(response, file, fileList,scope.row)"
                                                     :on-error="handleError"
                                                     :http-request="(o)=>httpRequest(o,scope.row)"
                                                    multiple
                                                    list-type="picture-card"
                                                    :auto-upload="true"
                                                    :before-upload="(file)=>beforeUpload(file,scope.row,scope.$index)"

                                                    accept=".jpeg,.jpg,.png,"
                                                    :file-list="scope.row.fileList"
                                                    :on-preview="handlePictureCardPreview"
                                                    :limit="20"
                                                    :class="{disUoloadSty:hideUploadEdit}"
                                                      >
                                                       <i slot="default" class="el-icon-plus"></i>
                                                   </el-upload>

                                               </div>
　                     <el-dialog :visible.sync="dialogImgVisible" title="图片" class="e-dialog" :modal-append-to-body="true" :append-to-body="true">
                       　　<img width="100%" :src="dialogImageUrl" alt="">
                   　　</el-dialog>
                                           </div>

                <el-button
                  :key="1"
                  type="danger"
                  icon="cancel"
                  @click="handleActionEvent({ ind:scope.$index,key: 'deleteRow',type:'sbsyff' })"
                >
                删除
                </el-button>
                   　

                   </template>

                </el-table-column>
                </el-table>
            </el-col>
            </el-row>

          </el-form>
       </el-tab-pane>

       <el-tab-pane label="环境要求" name="tab4">


           <el-form
               ref="form"
               :rules="rules"
               :element-loading-text="$t('common.loading')"
               :model="form"
               label-width="50px">

               <el-row :gutter="1" >
                 <el-col :span="200" >
                   <el-table
                     ref="elTable4"
                     :data="models.hjyqList"
                     border
                     stripe

                   >
                   <el-table-column
                       :key="1"
                       prop="id"
                       width="15px"
                       label="序号"
                     >
                      <template slot-scope="scope">
                      {{scope.$index+1}}、
                      </template>
                   </el-table-column>
                   <el-table-column
                       :key="2"
                       prop="desc"
                       width="150px" label="说明"
                     >
                  <template slot-scope="scope">
                  <el-input type="textarea" rows="6" v-model="scope.row.desc" style="width: 700px;"></el-input>
                  <el-button
                                    :key="1"
                                    type="danger"
                                    icon="cancel"
                                    @click="handleActionEvent({ ind:scope.$index,key: 'deleteRow',type:'hjyq' })"
                                  >
                                  删除
                                  </el-button>
                  </template>

               </el-table-column>
               </el-table>
           </el-col>
           </el-row>

         </el-form>

       </el-tab-pane>
       <el-tab-pane label="数据处理" name="tab5">

           <el-form
               ref="form"
               :rules="rules"
               :element-loading-text="$t('common.loading')"
               :model="form"
               label-width="50px">

               <el-row :gutter="1" >
                 <el-col :span="200" >
                   <el-table
                     ref="elTable5"
                     :data="models.sjclList"
                     border
                     stripe

                   >
                  <el-table-column
                      :key="1"
                      prop="id"
                      width="15px"
                      label="序号"
                    >
                     <template slot-scope="scope">
                     {{scope.$index+1}}、
                     </template>
                  </el-table-column>
                   <el-table-column
                       :key="2"
                       prop="desc"
                       width="150px" label="说明"
                     >
                  <template slot-scope="scope">
                  <el-input type="textarea" rows="6" v-model="scope.row.desc" style="width: 700px;"></el-input>
                  <el-button
                                    :key="1"
                                    type="danger"
                                    icon="cancel"
                                    @click="handleActionEvent({ ind:scope.$index,key: 'deleteRow',type:'sjcl' })"
                                  >
                                  删除
                                  </el-button>
                  </template>

               </el-table-column>
               </el-table>
           </el-col>
           </el-row>

         </el-form>

       </el-tab-pane>

       <el-tab-pane label="修约要求" name="tab6">


           <el-form
               ref="form"
               :rules="rules"
               :element-loading-text="$t('common.loading')"
               :model="form"
               label-width="50px">

               <el-row :gutter="1" >
                 <el-col :span="200" >
                   <el-table
                     ref="elTable4"
                     :data="models.xyList"
                     border
                     stripe

                   >
                   <el-table-column
                       :key="1"
                       prop="id"
                       width="15px"
                       label="序号"
                     >
                      <template slot-scope="scope">
                      {{scope.$index+1}}、
                      </template>
                   </el-table-column>
                   <el-table-column
                       :key="2"
                       prop="desc"
                       width="150px" label="说明"
                     >
                  <template slot-scope="scope">
                  <el-input type="textarea" rows="6" v-model="scope.row.desc" style="width: 700px;"></el-input>
                  <el-button
                                    :key="1"
                                    type="danger"
                                    icon="cancel"
                                    @click="handleActionEvent({ ind:scope.$index,key: 'deleteRow',type:'xy' })"
                                  >
                                  删除
                                  </el-button>
                  </template>

               </el-table-column>
               </el-table>
           </el-col>
           </el-row>

         </el-form>

       </el-tab-pane>
       <el-tab-pane label="符合性判断规则" name="tab7">


          <el-form
              ref="form"
              :rules="rules"
              :element-loading-text="$t('common.loading')"
              :model="form"
              label-width="50px">

              <el-row :gutter="1" >
                <el-col :span="200" >
                  <el-table
                    ref="elTable2"
                    :data="models.fhxpdList"
                    border
                    stripe

                  >
                  <el-table-column
                      :key="1"
                      prop="id"
                      width="15px"
                      label="序号"
                    >
                     <template slot-scope="scope">
                     {{scope.$index+1}}、
                     </template>
                  </el-table-column>
                  <el-table-column
                      :key="2"
                      prop="desc"
                      width="150px" label="说明"
                    >
                 <template slot-scope="scope">
                 <el-input type="textarea" rows="6" v-model="scope.row.desc" style="width: 700px;"></el-input>
                 <el-button
                                   :key="1"
                                   type="danger"
                                   icon="cancel"
                                   @click="handleActionEvent({ ind:scope.$index,key: 'deleteRow',type:'fhxpd' })"
                                 >
                                 删除
                                 </el-button>
                 </template>

              </el-table-column>
              </el-table>
          </el-col>
          </el-row>

        </el-form>

       </el-tab-pane>


       <el-tab-pane label="技术文献" name="tab8">

          <el-form
              ref="form"
              :rules="rules"
              :element-loading-text="$t('common.loading')"
              :model="form"
              label-width="50px">

              <el-row :gutter="1" >
                <el-col :span="200" >

                  <el-form
                         ref="form"
                         :rules="rules"
                         :element-loading-text="$t('common.loading')"
                         :model="form"

                         >

                         <el-row :gutter="2">

                           <el-col :span="5" style="120px">
                            &nbsp;&nbsp;&nbsp;&nbsp;文献绑定：
                     </el-col>
                     <el-col :span="16">


                            <ibps-custom-dialog
                                  v-model="models.jswxList"
                                  template-key="jswx"
                                  placeholder="请选择"
                                  store="id"
                                  icon="ibps-icon-search-plus"
                                  type="dialog"
                                  multiple="true"
                                  :disabled="readonly"
                                  :readonly-text="readonlyText?'text':null"
                                  :style="{width:width}"
                                />
                     </el-col>
                   </el-row>
                  <el-row :gutter="20">
                           <el-col  :span="1">
                                  &nbsp;
                           </el-col>
                           <el-col :span="2">
                             &nbsp;
                     </el-col>
                     <el-col :span="13">

                     </el-col>
                   </el-row>

                   </el-form>

          </el-col>
          </el-row>

        </el-form>

      </el-tab-pane>

     </el-tabs>
   </div><div style="height: 20px;"></div>
    <div class="el-dialog--center">
<el-button-group>
          <el-button
          :key="0"
          type="primary"
          icon="save"
          @click="handleActionEvent({ key: 'shortSave' })"
        >
          暂存
        </el-button>
        <el-button
          :key="1"
          type="danger"
          icon="cancel"
          @click="handleActionEvent({ key: 'addRow' })"
        >
          增加行
        </el-button>
        <el-button
          :key="1"
          type="danger"
          icon="cancel"
          @click="handleActionEvent({ key: 'cancel' })"
        >
          返回
        </el-button>


      </el-button-group>
    </div>
    <div style="height: 20px;"></div>
    </div>
<div class="widget-col el-row is-align-top el-row--flex"><div class="el-col el-col-16"><!----><!----><!----></div></div>
  <div class="ibps-watermark__mask"></div>
</div></div>
 </template>
</edit>
</template>

<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import edit from '@/components/jbd-edit'
import IbpsCustomDialog from '@/business/platform/data/templaterender/custom-dialog'
import axios from 'axios'
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import { BASE_API, SYSTEM_URL } from '@/api/baseUrl'
import store from '@/store'
import { add,update,get} from '@/api/detection/jtsjpz.js'
import { uploadFile, remove } from '@/api/platform/file/attachment'
import { BASE_API as baseApi,
  BASE_GATEWAY_API as gatewayApi,
  BASE_WEBSOCKET as baseWebsocket,
  SINGLE, MULTIPLE_DOMAIN, API_DOMAIN_NAMES } from '@/constant'
import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
import IbpsUserSelector from '@/business/platform/org/selector'
import IbpsAttachment from '@/business/platform/file/attachment/selector'
import { statusOptions, typeOptions } from '../../constants'
import IbpsDictionary from '@/business/platform/cat/dictionary/select'

const GET_IMAGE = '/platform/v3/file/getImage'

export default {
  components: {
     'ibps-dictionary': IbpsDictionary,
    'ibps-user-selector':IbpsUserSelector,
    'ibps-link-data': IbpsLinkData,
     edit,
    'ibps-custom-dialog':IbpsCustomDialog,
    axios,
    IbpsAttachment,
  },
  props: {
    id:String,
    title:String,
    openType:String,
    visible:Boolean
  },


  created() {
    let that = this
        console.log("step 01: created")

        let sql = "select id_ as id,name_ as keHuMingCheng  FROM ibps_party_org WHERE role_ids_ LIKE '%466555896126767104%'"
        curdPost('sql',sql).then(response => {
             let dbData = response.variables.data
             that.models.buMenList=[]
             if(dbData){
               dbData.forEach(function(e){
                  that.models.buMenList.push({label:e.keHuMingCheng,value:e.id})
               })
               //that.models.jianCeDuiXiang=dbData[0].jian_ce_dui_xiang
             }
        })
        sql = "select distinct jian_ce_dui_xiang FROM t_jclx"
        curdPost('sql',sql).then(response => {
             let dbData = response.variables.data
             that.models.duiXiangList=[]
             if(dbData){
               dbData.forEach(function(e){
                  that.models.duiXiangList.push({label:e.jian_ce_dui_xiang,value:e.jian_ce_dui_xiang})
               })
               //that.models.jianCeDuiXiang=dbData[0].jian_ce_dui_xiang
             }
        })
        that.$watch('models.jianCeDuiXiang', () => {
           let sql = "select id_,bu_men_id_,lei_xing_ FROM t_jclx a1 where jian_ce_dui_xiang='"+that.models.jianCeDuiXiang+"'"
           curdPost('sql',sql).then(response => {
                let dbData = response.variables.data
                that.models.leiBieList=[]
                if(dbData){
                  dbData.forEach(function(e){
                     that.models.leiBieList.push({label:e.lei_xing_,value:e.id_})
                  })
                  if(dbData.length>0)
                    that.models.bianZhiBuMenId=dbData[0].bu_men_id_
                }
           })
        }, { immediate: true })
    console.log("step 0: get data")
    if(this.openType=='add'){
      // this.init()
    }else if(this.openType=='edit'){
      get({id:this.id}).then(response => {
          console.log("step 1: get data")
          let dbData = response.variables
          Object.assign(this.models,dbData.entity)
          this.models.id=this.id
          this.$set(this.models,"id",this.id)
          this.$set(this.models,"status",this.models.status)
          this.$set(this.models,"sheBei",this.models.sheBei)
          this.models.buZhouList=[]
          this.models.buZhou2List=[]
          this.models.fhxpdList=[]
          this.models.sbsyffList=[]
          this.models.xyList=[]
          this.models.hjyqList=[]
          this.models.sjclList=[]
          this.models.jswjList=[]
          this.models.jswxList=[]
          //this.models.bzbbList=[]
          this.models.sbList=[]
          var maxXuHao1 = -1;
          var maxXuHao2 = -1;
          var maxXuHao3 = -1;
          var maxXuHao4 = -1;
          var maxXuHao5 = -1;
          var maxXuHao6 = -1;
          var maxXuHao7 = -1;

           console.log("step 2: get data",dbData)
          dbData.subList.forEach(function(e){
            if(e.leiXing=='buZhou2_desc'||e.leiXing=='buZhou2_fangFaWaiJian'){
              if(parseInt(e.xuHao)>maxXuHao3)
                maxXuHao3 = parseInt(e.xuHao);
            }
            if(e.leiXing=='buZhou_desc'||e.leiXing=='buZhou_picList'){
              if(parseInt(e.xuHao)>maxXuHao1)
                maxXuHao1 = parseInt(e.xuHao);
            }
            if(e.leiXing=='sbsy_desc'||e.leiXing=='sbsy_sb'||e.leiXing=='sbsy_picList'){
              if(parseInt(e.xuHao)>maxXuHao2)
                maxXuHao2 = parseInt(e.xuHao);
            }
            if(e.leiXing=='fhxpd_desc'){
              if(parseInt(e.xuHao)>maxXuHao4)
                maxXuHao4 = parseInt(e.xuHao);
            }
            if(e.leiXing=='xy_desc'){
              if(parseInt(e.xuHao)>maxXuHao5)
                maxXuHao5 = parseInt(e.xuHao);
            }
            if(e.leiXing=='hjyq_desc'){
              if(parseInt(e.xuHao)>maxXuHao6)
                maxXuHao6 = parseInt(e.xuHao);
            }
            if(e.leiXing=='sjcl_desc'){
              if(parseInt(e.xuHao)>maxXuHao7)
                maxXuHao7 = parseInt(e.xuHao);
            }
          })
           console.log("step 3: get data")
          //this.models.buZhouList=[]
          this.$set(this.models,'buZhouList',[])
          for(let i=0;i<=maxXuHao1;i++){
            this.models.buZhouList.push({})
          }
          //this.models.sbsyffList=[]
          this.$set(this.models,'sbsyffList',[])
          for(let i=0;i<=maxXuHao2;i++){
            this.models.sbsyffList.push({})
          }
         this.$set(this.models,'buZhou2List',[])
         console.log("eee55:",maxXuHao3)
         for(let i=0;i<=maxXuHao3;i++){
           this.models.buZhou2List.push({})
         }

         this.$set(this.models,'fhxpdList',[])
         for(let i=0;i<=maxXuHao4;i++){
           this.models.fhxpdList.push({desc:''})
         }
         this.$set(this.models,'xyList',[])
         for(let i=0;i<=maxXuHao5;i++){
           this.models.xyList.push({desc:''})
         }
         this.$set(this.models,'hjyqList',[])
         for(let i=0;i<=maxXuHao6;i++){
           this.models.hjyqList.push({desc:''})
         }
         this.$set(this.models,'sjclList',[])
         for(let i=0;i<=maxXuHao7;i++){
           this.models.sjclList.push({desc:''})
         }
         console.log("step 4: get data")
          let that = this
          dbData.subList.forEach(function(e){
            let xuHao = parseInt(e.xuHao)
            console.log("step 5: get data",e.leiXing)
            switch(e.leiXing){
              case 'buZhou2_fangFaWaiJian':
                if(!that.models.buZhou2List[xuHao]||!that.models.buZhou2List[xuHao].displayFlag){
                  that.$set(that.models.buZhou2List,xuHao,{})
                  that.$set(that.models.buZhou2List[xuHao],'picId',[])
                  that.$set(that.models.buZhou2List[xuHao],'fileList',[])
                }
                that.$set(that.models.buZhou2List[xuHao],'fangFaWaiJian',e.value)
                if(e.value){
                  let fangFaEntity = JSON.parse(e.value)
                  // curdPost('select',
                  //             '{"tableName": "t_ffgl","paramWhere":{"id_":"'+e.value+'"}}'
                  //                 ).then(response => {
                  //               if( response.variables.data&& response.variables.data.length>0){
                  //                 let name = response.variables.data[0].fang_fa_ming_chen
                  //                    let fangFaWenJian = response.variables.data[0].fang_fa_wen_jian_
                  //                 that.$set(that.models.buZhou2List[xuHao],'fangFaWenJian',fangFaWenJian)
                  //                 that.$set(that.models.buZhou2List[xuHao],'fangFaName',name)
                  //               }
                  //  })
                  that.$set(that.models.buZhou2List[xuHao],'fangFaWenJian',fangFaEntity.fangFaWenJian)
                  that.$set(that.models.buZhou2List[xuHao],'fangFaName',fangFaEntity.fangFaMingChen)
                }

                that.$set(that.models.buZhou2List[xuHao],'displayFlag',true)
                break
                case 'buZhou2_desc':
                  if(!that.models.buZhou2List[xuHao]||!that.models.buZhou2List[xuHao].displayFlag){
                    that.$set(that.models.buZhou2List,xuHao,{})
                    that.$set(that.models.buZhou2List[xuHao],'picId',[])
                    that.$set(that.models.buZhou2List[xuHao],'fileList',[])
                  }
                  that.$set(that.models.buZhou2List[xuHao],'desc',e.value)
                  that.$set(that.models.buZhou2List[xuHao],'displayFlag',true)
                  break
              case 'buZhou2_picList':
                if(!that.models.buZhou2List[xuHao]||!that.models.buZhou2List[xuHao].displayFlag){
                  that.$set(that.models.buZhou2List,xuHao,{})
                  that.$set(that.models.buZhou2List[xuHao],'picId',[])
                  that.$set(that.models.buZhou2List[xuHao],'fileList',[])
                }
                that.models.buZhou2List[xuHao]['picId'].push(e.value)
                that.models.buZhou2List[xuHao]['fileList'].push({name:e.value,url:baseApi+GET_IMAGE+"?attachmentId="+e.value})
                that.$set(that.models.buZhou2List[xuHao],'displayFlag',true)
                break
              case 'buZhou_desc':
                if(!that.models.buZhouList[xuHao]||!that.models.buZhouList[xuHao].displayFlag){
                  that.$set(that.models.buZhouList,xuHao,{})
                  that.$set(that.models.buZhouList[xuHao],'picId',[])
                  that.$set(that.models.buZhouList[xuHao],'fileList',[])
                }
                that.$set(that.models.buZhouList[xuHao],'desc',e.value)
                that.$set(that.models.buZhouList[xuHao],'displayFlag',true)
                break
              case 'buZhou_picList':
                if(!that.models.buZhouList[xuHao]||!that.models.buZhouList[xuHao].displayFlag){
                  that.$set(that.models.buZhouList,xuHao,{})
                  that.$set(that.models.buZhouList[xuHao],'picId',[])
                  that.$set(that.models.buZhouList[xuHao],'fileList',[])
                }
                that.models.buZhouList[xuHao]['picId'].push(e.value)
                that.models.buZhouList[xuHao]['fileList'].push({name:e.value,url:baseApi+GET_IMAGE+"?attachmentId="+e.value})
                that.$set(that.models.buZhouList[xuHao],'displayFlag',true)
                break
              case 'sbsy_sb':
                if(!that.models.sbsyffList[xuHao]||!that.models.sbsyffList[xuHao].displayFlag){
                  that.$set(that.models.sbsyffList,xuHao,{})
                  that.$set(that.models.sbsyffList[xuHao],'picId',[])
                  that.$set(that.models.sbsyffList[xuHao],'fileList',[])
                }
                that.$set(that.models.sbsyffList[xuHao],'sb',e.value)
                that.$set(that.models.sbsyffList[xuHao],'displayFlag',true)
                break
              case 'sbsy_desc':
                if(!that.models.sbsyffList[xuHao]||!that.models.sbsyffList[xuHao].displayFlag){
                  that.$set(that.models.sbsyffList,xuHao,{})
                  that.$set(that.models.sbsyffList[xuHao],'picId',[])
                  that.$set(that.models.sbsyffList[xuHao],'fileList',[])
                }
                that.$set(that.models.sbsyffList[xuHao],'desc',e.value)
                that.$set(that.models.sbsyffList[xuHao],'displayFlag',true)
                break
              case 'sbsy_picList':
                if(!that.models.sbsyffList[xuHao]||!that.models.sbsyffList[xuHao].displayFlag){
                  that.$set(that.models.sbsyffList,xuHao,{})
                  that.$set(that.models.sbsyffList[xuHao],'picId',[])
                  that.$set(that.models.sbsyffList[xuHao],'fileList',[])
                }
                that.models.sbsyffList[xuHao]['picId'].push(e.value)
                that.models.sbsyffList[xuHao]['fileList'].push({name:e.value,url:baseApi+GET_IMAGE+"?attachmentId="+e.value})
                that.$set(that.models.sbsyffList[xuHao],'displayFlag',true)
                break
              case 'fhxpd_desc':
                //if(!that.models.fhxpdList)
                //  that.models.fhxpdList=[]
                //that.models.fhxpdList.push({desc:e.value})
                that.models.fhxpdList[xuHao]['desc']=e.value
                break
              case 'xy_desc':
                //if(!that.models.xyList)
                //  that.models.xyList=[]
                //that.models.xyList.push({desc:e.value})
                that.models.xyList[xuHao]['desc']=e.value
                break
              case 'hjyq_desc':
                //if(!that.models.hjyqList)
                //  that.models.hjyqList=[]
                //that.models.hjyqList.push({desc:e.value})
                that.models.hjyqList[xuHao]['desc']=e.value
                break
              case 'sjcl_desc':
                //if(!that.models.sjclList)
               //   that.models.sjclList=[]
                //that.models.sjclList.push({desc:e.value})
                that.models.sjclList[xuHao]['desc']=e.value
                break
              case 'jswx_wj':
                if(!that.models.jswxList||that.models.jswxList=="")
                  that.models.jswxList=e.value
                else
                  that.models.jswxList=that.models.jswxList+","+e.value
                break
            }
          })
          console.log("step 6: get data")
          if(!that.models.buZhou2List||that.models.buZhou2List.length<=0){
            that.models.buZhou2List.push({displayFlag:true,updateId:'upload1',fangFaName:'',fangFaBianHao:'',fangFaWenJian:'',desc:''})
          }
          if(!that.models.buZhouList||that.models.buZhouList.length<=0){
            that.models.buZhouList.push({displayFlag:true,updateId:'upload3',desc:'',picId:[],fileList:[]})
          }
          if(!that.models.sbsyffList||that.models.sbsyffList.length<=0){
            that.models.sbsyffList.push({displayFlag:true,updateId:'upload2',picId:[],desc:'',fileList:[]})
          }
          if(!that.models.fhxpdList[0]){
            that.models.fhxpdList.push("")
          }
          if(!that.models.hjyqList[0]){
            that.models.hjyqList.push("")
          }
          if(!that.models.xyList[0]){
            that.models.xyList.push("")
          }
          if(!that.models.sjclList[0]){
            that.models.sjclList.push("")
          }
          if(!that.models.sbList[0]){
            that.models.sbList.push("")
          }
          console.log("step 7:done")
      })
    }
  },
  data() {
    return {
      typeOptions: typeOptions,
      statusOptions: statusOptions,
      form: {
        id: ''
      },
      readonlyText:'text',
      dialogImageUrl:'',
      width:'380px',
      hideUploadEdit:false,
      dialogImgVisible: false,////大图预览框
      hideUploadEdit:false,//图片个数设置 超过5张为true
      activeName:'tab1',
      defaultForm: {},
      defaulRules: {},
      models:{
              duiXiangList:[],
              canShuList:[],
              leiBieList:[],
              buMenList:[],
              sheBei:'',
              id:'',
              status:'00',
              price:'',
              bianZhiBuMenId:'',
              bianZhiBuMen:'',
              shiFouCnas:'',
              jianCeDuiXiang:'',
              jianCeLeiBie:'',
              jianCeLeiBieId:'',
              xiangMuCanShu:'',
              buZhou2List:[{displayFlag:true,updateId:'upload1',fangFaName:'',fangFaBianHao:'',fangFaWenJian:'',desc:''}],
              fhxpdList:[{desc:''}],
              hjyqList:[{desc:''}],
              sbsyffList:[{displayFlag:true,updateId:'upload2',picId:[],desc:'',fileList:[]}],
              xyList:[{desc:''}],
              sjclList:[{desc:''}],
              sbList:[{desc:''}],
              buZhouList:[{displayFlag:true,updateId:'upload3',desc:'',picId:[],fileList:[]}],
              jswxList:'',
              },
      rules: {

      },
      toolbars: [
        { key: 'save', hidden: () => { return this.readonly } },
        { key: 'cancel' }
      ]
    }
  },
  computed: {

  },
  watch: {

  },

  methods: {
    nextDo(data,closeFlag){

    },
    biaoZhunChange(k,val,r,ind){
      let name=""
      let bianhao=""
      k.forEach(function(e,ind){
        if(ind==0){
           name=e.wen_jian_ming_che
        }else{
          name=name+","+e.wen_jian_ming_che
        }
      })
      r.fangFaName=name
    },

    handleRemove(file,row,i) {
      row.picId.forEach(function(e1,ind){
        if(file.name==e1){
          row.picId.splice(ind,1)
        }
      })
    },
    handlePictureCardPreview:function(file){
        this.dialogImageUrl = file.url;
        this.dialogImgVisible = true;
    },
    emitCallback(fileList) {
    },
    handleError(err, file, fileList) {
      this.fileList = fileList
    },
    httpRequest(o,row) {

    },
    handleSuccess(response, file, fileList,row) {

    },
    beforeUpload(file,row,ind){

                    var that=this;
                    var fileName=file.name.substring(file.name.lastIndexOf('.')+1);
                    if(fileName!='jpg'&&fileName!='png'&&fileName!='jpeg'){
                        that.$message({
                            type:'error',
                            showClose:true,
                            duration:3000,
                            message:'文件类型不是图片文件!'
                        });
                        return false;
                    }
                    //读取文件大小
                    var fileSize=file.size;
                    if(fileSize>1048576){
                        that.$message({
                            type:'error',
                            showClose:true,
                            duration:3000,
                            message:'文件大于1M!'
                        });
                        return false;
                    }
                    const data = new FormData() // 创建form对象
                          data.append('file', file)

                          request({
                              url: SYSTEM_URL() + '/file/upload',
                              method: 'post',
                              isLoading: true,
                              gateway: true,
                              data: data
                          }).then(rsp=>{
                            if(!row.picId)
                              row.picId=[]
                            row.picId.push(rsp.data.id)
                          })

                    return true;
                } ,
          handleActionEvent({ ind,key,type }) {
            switch (key) {
              case 'shortSave':
                this.handleSave(true)
                break
              case 'save':
                this.handleSave(false)
                break
              case 'cancel':
                this.closeDialog()
                break
              case 'addRow':
                  switch (this.activeName) {
                    case 'tab1':
                        this.models.buZhou2List.push({displayFlag:true,updateId:'upload1',fangFaName:'',fangFaBianHao:'',fangFaWenJian:'',picId:[],desc:'',fileList:[]})
                    case 'tab2':
                        this.models.buZhouList.push({displayFlag:true,updateId:'upload2',picId:[],desc:'',fileList:[]})
                        break
                    case 'tab3':
                        this.models.sbsyffList.push({displayFlag:true,updateId:'upload3',picId:[],desc:'',sb:'',fileList:[]})
                         if(this.models.sbsyffList.length>1)
                          this.$set(this.models.sbsyffList[this.models.sbsyffList.length-1],'sb',this.models.sbsyffList[this.models.sbsyffList.length-2].sb)
                        break
                    case 'tab4':
                        this.models.hjyqList.push({desc:''})

                        break
                    case 'tab5':
                        this.models.sjclList.push({desc:''})
                    case 'tab6':
                        this.models.xyList.push({desc:''})
                        break
                    case 'tab7':
                        this.models.fhxpdList.push({desc:''})
                        break
                    case 'tab8':
                         this.models.sbList.push({desc:''})
                        break
                    default:
                          break
                  }
                  break;
              case 'deleteRow':

                  switch (type) {
                    case 'buZhou':
                      this.models.buZhouList.splice(ind,1)
                      //this.models.buZhouList[ind].displayFlag=false
                      //this.models.buZhouList = JSON.parse(JSON.stringify(this.models.buZhouList));
                      break
                    case 'buZhou2':
                      //this.models.buZhouList.splice(ind,1)
                      this.models.buZhou2List[ind].displayFlag=false
                      //this.models.buZhouList = JSON.parse(JSON.stringify(this.models.buZhouList));
                      break
                    case 'fhxpd':
                      this.models.fhxpdList.splice(ind,1)
                      break
                    case 'sbsyff':
                       //this.models.sbsyffList.splice(ind,1)
                      this.models.sbsyffList[ind].displayFlag=false
                      break
                    case 'xy':
                        this.models.xyList.splice(ind,1)
                        break
                    case 'hjyq':
                        this.models.hjyqList.splice(ind,1)
                        break
                    case 'sjcl':
                        this.models.sjclList.splice(ind,1)
                        break
                    case 'sb':
                        this.models.sbList.splice(ind,1)
                        break
                    default:
                          break
                      }

                  break;
              default:
                break
            }
        },
        getFormData(){


        },
    closeDialog() {
      this.$emit('close', false)
    },
    generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
    },
    async handleSave(closeFlag) {
      if(!this.models.xiangMuCanShu||this.models.xiangMuCanShu==""){
         this.$message("项目参数不能为空！")
         return
      }
      if(!this.models.bianZhiBuMenId||this.models.bianZhiBuMenId==""){
         this.$message("部门不能为空！")
         return
      }
      if(!this.models.shiFouCnas||this.models.shiFouCnas==""){
         this.$message("检测类别不能为空！")
         return
      }
      if(!this.models.jianCeDuiXiang||this.models.jianCeDuiXiang==""){
         this.$message("检测对象不能为空！")
         return
      }
      if(!this.models.jianCeLeiBieId||this.models.jianCeLeiBieId==""){
         this.$message("检测类型不能为空！")
         return
      }
      var amtreg=/^\d+(\.\d{1,2})?$/;
      console.log("eee0:",this.models.price)
      if(this.models.price!=null&&this.models.price!=""&&!amtreg.test(this.models.price)){
          this.$message("请输入正确的金额格式！");
          return;
      }
      console.log("step 1: save")
      let this_ = this
      let data = {}
        data['entity']={}
        data['entity']['id']=this.models.id
        data['entity']['bianZhiBuMenId']=this.models.bianZhiBuMenId
        this.models.buMenList.forEach(function(e2){
          if(e2.value==this_.models.bianZhiBuMenId){
            data['entity']['bianZhiBuMen']=e2.label
          }
        })
        data['entity']['shiFouCnas']=this.models.shiFouCnas
        data['entity']['jianCeDuiXiang']=this.models.jianCeDuiXiang
        data['entity']['jianCeLeiBieId']=this.models.jianCeLeiBieId
        console.log("step 2: save")
        this.models.leiBieList.forEach(function(e2){
          if(e2.value==this_.models.jianCeLeiBieId){
            data['entity']['jianCeLeiBie']=e2.label
          }
        })
        console.log("step 3: save")
        data['entity']['bianZhiRenId']=this.$store.getters.userInfo.user.id
        data['entity']['bianZhiRen']=this.$store.getters.userInfo.user.name
        data['entity']['status']=this.models.status
        data['entity']['price']=this.models.price
        data['entity']['xiangMuCanShu']=this.models.xiangMuCanShu
        data['entity']['sheBei']=this.models.sheBei
        console.log("step 4: save")
        data['childEntity']=[]

        data['entity']['id']=this_.id||''

        // await curdPost('delete',data2).then(response => {
        //    console.log("step 4: delete")

        // })
        this.models.buZhou2List = this.models.buZhou2List.filter(item => item.displayFlag).map(item => item)
        this.models.buZhou2List.forEach(function(e1,ind){
          if(e1.desc){
            let item = {}

            if(e1.displayFlag){
              item['leiXing']='buZhou2_desc'
              item['value']=e1.desc
              item['xuHao']=ind
            }
            data['childEntity'].push(item)
          }

          if((e1.fangFaName||e1.fangFaWenJian)&&e1.displayFlag){
            let e_={}

            e_['jianCeDuiXiang']=this_.models.jianCeDuiXiang
            if(e1.fangFaName){
              e_['fangFaMingChen']=e1.fangFaName
            }
            if(e1.fangFaWenJian){
               e_['fangFaWenJian']=e1.fangFaWenJian
            }
            e_['createBy']=this_.$store.getters.userInfo.user.id
            //e_['jing_tai_shu_ju_b']=this_.id


             // let ffItemAdd = {}
             // ffItemAdd['leiXing']='buZhou2_add'
             // ffItemAdd['value']=JSON.stringify(e_)
             // ffItemAdd['xuHao']=ind
             // data.childEntity.push(ffItemAdd)
            // curdPost('add',
            //          '{"tableName": "t_ffgl","paramWhere":'+JSON.stringify(arrayE)+'}'
            //               ).then(response2 => {

            //     console.log("step 5: save2")
            // })
             let item3 = {}
             item3['leiXing']='buZhou2_fangFaWaiJian'
             item3['value']=JSON.stringify(e_)
             item3['xuHao']=ind
             data.childEntity.push(item3)
          }
        })
       console.log("step 6: save")
       this_.models.sbsyffList = this_.models.sbsyffList.filter(item => item.displayFlag).map(item => item)
       this_.models.sbsyffList.forEach(function(e1,ind){
         if(e1.desc!=""){
           let item = {}
           if(e1.displayFlag){
             item['leiXing']='sbsy_desc'
             item['value']=e1.desc
             item['xuHao']=ind
           }
           data.childEntity.push(item)
         }
         if(e1.sb!=""){
           let item = {}
           if(e1.displayFlag){
             item['leiXing']='sbsy_sb'
             item['value']=e1.sb
             item['xuHao']=ind
           }
           data.childEntity.push(item)
         }
         if(e1.picId){
           e1.picId.forEach(function(e2){
             if(e2!=""){
               let item = {}
               if(e1.displayFlag){
                 item['leiXing']='sbsy_picList'
                 item['value']=e2
                 item['xuHao']=ind
               }
               data.childEntity.push(item)
             }
           })
         }
       })
       console.log("step 7: save")

       this_.models.fhxpdList.forEach(function(e1,ind){
         if(e1.desc!=""){
           let item = {}
           item['leiXing']='fhxpd_desc'
           item['value']=e1.desc
           item['xuHao']=ind
           data.childEntity.push(item)
         }
       })
        console.log("step 8: save")

       if(this_.models.xyList){
         this_.models.xyList.forEach(function(e1,ind){
           if(e1.desc!=""){
             let item = {}
             item['leiXing']='xy_desc'
             item['value']=e1.desc
             item['xuHao']=ind
             data.childEntity.push(item)
           }
         })
       }
        console.log("step 9: save")

       if(this_.models.hjyqList){
         this_.models.hjyqList.forEach(function(e1,ind){
           if(e1.desc!=""){
             let item = {}
             item['leiXing']='hjyq_desc'
             item['value']=e1.desc
             item['xuHao']=ind
             data.childEntity.push(item)
           }
         })
       }
        console.log("step 10: save")

       if(this_.models.sjclList){
         this_.models.sjclList.forEach(function(e1,ind){
           if(e1.desc!=""){
             let item = {}
             item['leiXing']='sjcl_desc'
             item['value']=e1.desc
             item['xuHao']=ind
             data.childEntity.push(item)
           }
         })
       }
        console.log("step 6: nextDo")

       this_.models.buZhouList.forEach(function(e1,ind){
         if(e1.desc!=""){
           let item = {}
           item['leiXing']='buZhou_desc'
           item['value']=e1.desc
           item['xuHao']=ind
           data.childEntity.push(item)
         }
         if(e1.picId){
           e1.picId.forEach(function(e2){
             if(e2!=""){
               let item = {}
               if(e1.displayFlag){
                 item['leiXing']='buZhou_picList'
                 item['value']=e2
                 item['xuHao']=ind
               }
               data.childEntity.push(item)
             }
           })
         }
       })
        console.log("step 11: save")
       if(this_.models.jswxList&&this_.models.jswxList!=""){
         this_.models.jswxList.split(",").forEach(function(e1,ind){
          if(e1!=""){
            let item = {}
            item['leiXing']='jswx_wj'
            item['value']=e1
            data.childEntity.push(item)
           }
         })
       }
       let that = this_
       if(that.openType=='add'){
         add(JSON.stringify(data)).then(response => {
           if(response.state==500){
             that.$message(response.message)
           }else{
             that.$message("新增成功！")
             that.$emit('loadData',closeFlag)
           }
         })
       }else if(that.openType=='edit'){
         update(JSON.stringify(data)).then(response => {
           if(response.state==500){
             that.$message(response.message)
           }else{
             that.$message("修改成功！")
             that.$emit('loadData',closeFlag)
           }
         })
       }
        console.log("step 12: save")
    }
  }
}
</script>
<style>

  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 630px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
 .el-form--label-left{
  padding-left:2px;
  text-align: left;
  }
 .el-form--label-left .el-form-item__label{
  padding-left:2px;
  text-align: left;
  }
  .disUoloadSty{
      display:none;   /* 上传按钮隐藏 */
  }
 .e-dialog{
   padding-right:0px;
   z-index: 9999!important;
 }

</style>
