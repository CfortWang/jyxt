<template>
  <div class="top-left-com">
     <Right-Chart-Com-1 />
     <Right-Chart-Com-2 />
  </div>
</template>

<script>
import RightChartCom1 from './RightChartCom1'
import RightChartCom2 from './RightChartCom2'
export default {
  name: 'TopLeftCom',
  components: {
     RightChartCom1,
     RightChartCom2
  }
}
</script>

