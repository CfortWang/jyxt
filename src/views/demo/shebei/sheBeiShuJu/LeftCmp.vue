<template>
  <div class="top-left-cmp">
     <Left-Chart-Cmp-1 />
     <Left-Chart-Cmp-2 />
  </div>
</template>

<script>
import LeftChartCmp1 from './LeftChartCmp1'
import LeftChartCmp2 from './LeftChartCmp2'
export default {
  name: 'TopLeftCmp',
  components: {
    LeftChartCmp1,
    LeftChartCmp2
  }
}
</script>

