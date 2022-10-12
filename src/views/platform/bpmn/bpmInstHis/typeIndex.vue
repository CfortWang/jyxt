<template>
  <div>
    <component
    :is="listType"
    :reportAll="reportAll"
    :tableTitle="tableTitle"
    :typeId = "typeId"
      />
  </div>
</template>

<script>
  /* 共同调用类， 统一调用。*/
import guangShen from './listType/guangShen'
import neiShen from './listType/neiShen'
import gongZheng from './listType/gongZheng.vue'
import peiXun from './listType/peiXun.vue'
import jianDu from './listType/JianDu.vue'
import sheBei from './listType/sheBei.vue'
import huanJing from './listType/huanJing.vue'
import jiLiang from './listType/jiLiang.vue'
import heCha from './listType/heCha.vue'
import gongYing from './listType/gongYing.vue'
import fangFa from './listType/fangFa.vue'
import touSu from './listType/touSu.vue'
import jieGuo from './listType/jieGuo.vue'
import keHu from './listType/keHu.vue'
import ceLiang from './listType/ceLiang.vue'
import jiuZheng from './listType/jiuZheng.vue'
import nengLiYanZheng from './listType/nengLiYanZheng.vue'
import fengXianKongZhi from './listType/fengXianKongZhi.vue'
export default {
  components: {
    guangShen,
    neiShen,
    ceLiang,
    gongZheng,
    jiuZheng,
    nengLiYanZheng,
    fengXianKongZhi,
    peiXun,
    jianDu,
    sheBei,
    huanJing,
    jiLiang,
    heCha,
    gongYing,
    fangFa,
    touSu,
    jieGuo,
    keHu
     },
  props:{
    listType:String,
    reportAll:Array,
    tableTitle:String,
    typeId:String,
  }
}
</script>
