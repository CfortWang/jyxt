<template>
  <div class="top-left-cmp">
     <Middle-Chart-1 />
     <Middle-Chart-2 />
  </div>
</template>

<script>
import MiddleChart1 from './MiddleChart1'
import MiddleChart2 from './MiddleChart2'
export default {
  name: 'TopLeftCmp',
  components: {
    MiddleChart1,
    MiddleChart2
  }
}
</script>

