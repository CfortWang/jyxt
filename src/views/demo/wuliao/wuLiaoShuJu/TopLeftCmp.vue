<template>
  <div class="top-left-cmp">
     <Left-Chart-1 />
     <Left-Chart-2 />
  </div>
</template>

<script>
import LeftChart1 from './LeftChart1'
import LeftChart2 from './LeftChart2'
export default {
  name: 'TopLeftCmp',
  components: {
    LeftChart1,
    LeftChart2
  }
}
</script>

