<template>
  <div class="top-left-com">
     <Left-Chart-Com-1 />
     <Left-Chart-Com-2 />
  </div>
</template>

<script>
import LeftChartCom1 from './LeftChartCom1'
import LeftChartCom2 from './LeftChartCom2'
export default {
  name: 'TopLeftCom',
  components: {
    LeftChartCom1,
    LeftChartCom2
  }
}
</script>
<style lang="less">
.top-left-com{width:100%}
</style>

