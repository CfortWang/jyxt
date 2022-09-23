<template>
  <div class="ren-yuan-left-cmp">
     <Ren-Yuan-Left-Chart-1 />
     <Ren-Yuan-Left-Chart-2 />
     <Ren-Yuan-Left-Chart-3 />
  </div>
</template>

<script>
import RenYuanLeftChart1 from './RenYuanLeftChart1'
import RenYuanLeftChart2 from './RenYuanLeftChart2'
import RenYuanLeftChart3 from './RenYuanLeftChart3'
export default {
  name: 'RenYuanLeftCmp',
  components: {
   RenYuanLeftChart1,
   RenYuanLeftChart2,
   RenYuanLeftChart3
  }
}
</script>

