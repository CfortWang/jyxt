<template>
  <div class="top-left-cmp">
     <Middle-Chart-Cmp-1 />
     <Middle-Chart-Cmp-2 />
  </div>
</template>

<script>
import MiddleChartCmp1 from './MiddleChartCmp1'
import MiddleChartCmp2 from './MiddleChartCmp2'
export default {
  name: 'TopLeftCmp',
  components: {
    MiddleChartCmp1,
    MiddleChartCmp2
  }
}
</script>

