<template>
  <div>
    {{currentScan}}
    <component
    :is="currentScan"
    :scanVisible="scanVisible"
    @scanOff = "scanOff"/>
  </div>
</template>

<script>
  /* 共同调用类， 与脚本统一调用。*/
import facility from './goods/facility'
import material from './goods/material'
import sample from './goods/sample'
import sampleConfirmation from './goods/sampleConfirmation'
import manualConfirmation from './goods/manualConfirmation'

export default {
  components: { facility,material,sample,sampleConfirmation,manualConfirmation},
  props:{
    currentScan:String,
    scanVisible:Boolean
  },

  methods:{
    scanOff(val){
       this.$emit('scanOff',val)
    }
  },
}
</script>
