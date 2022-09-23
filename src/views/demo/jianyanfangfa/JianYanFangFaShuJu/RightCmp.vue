<template>
  <div class="top-left-cmp">
     <Right-Chart-Cmp-1 />
     <Right-Chart-Cmp-2 />
  </div>
</template>

<script>
import RightChartCmp1 from './RightChartCmp1'
import RightChartCmp2 from './RightChartCmp2'
export default {
  name: 'TopLeftCmp',
  components: {
     RightChartCmp1,
     RightChartCmp2
  }
}
</script>

