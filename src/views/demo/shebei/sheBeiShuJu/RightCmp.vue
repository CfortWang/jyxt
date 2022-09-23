<template>
  <div class="top-left-cmp">
     <Right-Chart-1 />
     <Right-Chart-2 />
  </div>
</template>

<script>
import RightChart1 from './RightChart1'
import RightChart2 from './RightChart2'
export default {
  name: 'TopLeftCmp',
  components: {
     RightChart1,
     RightChart2
  }
}
</script>

