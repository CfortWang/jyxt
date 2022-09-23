<template>
  <div class="custom-control">
    <span>
      宽：<el-input v-model="dataModel.width" style="width: 200px;" />
    </span>
    <span>
      高：<el-input v-model="dataModel.height" style="width: 200px;" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'custom-width-height',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dataModel: {
        width: '',
        height: ''
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        if (this.$utils.isEmpty(val)) {
          this.dataModel = {
            width: '',
            height: ''
          }
        } else {
          this.dataModel = JSON.parse(val)
        }
      },
      immediate: true
    },
    dataModel: {
      handler(val) {
        this.$emit('input', JSON.stringify(val))
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.custom-control{
  background: #eee;
  padding: 10px;

  span{
    +span{
      margin-left: 10px;
    }
  }
}
</style>
