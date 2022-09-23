<template>
  <div class="home">
    <button-list :p-vue="pVue" />
    <div style="height: 20px" />
    <table-list :p-vue="pVue" />
  </div>
</template>

<script>
import Vue from 'vue'
import ButtonList from '../testDemo/button-list'
import TableList from '../testDemo/table-list'

export default {
  name: 'Home',
  data() {
    return {
      pVue: new Vue()
    }
  },
  mounted() {
    console.log(this.pVue)
  },
  components: {
    ButtonList,
    TableList
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
