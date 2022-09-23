<template>
  <el-form label-width="80px">
    <el-form-item label="参数1">
      <el-input disabled v-model="code1"></el-input>
    </el-form-item>
    <el-form-item label="参数2">
      <el-input disabled v-model="code2"></el-input>
    </el-form-item>
    <el-form-item label="参数3">
      <el-input disabled v-model="code3"></el-input>
    </el-form-item>
    <el-form-item label="参数4">
      <el-input disabled v-model="code4"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      code1: '',
      code2: '',
      code3: '',
      code4: ''
    }
  },
  props: {
    pVue: {
      type: Object
    }
  },
  watch: {
    code1(newVal, oldVal) {
      console.log(oldVal)
      console.log(newVal)
    }
  },
  mounted() {
    if (this.pVue) {
      /**
       * 单项接收
       */
      this.pVue.$on('send1', data => {
        this.code1 = data.code
        console.log(`表格组件1 => 接收参数 `,data)
        this.pVue.boo = true
      })
      /**
       * 发送并接收回调
       */
      this.pVue.$on('send2', (data, cb) => {
        this.code2 = data.code
        console.log(`表格组件2 => 接收参数 ${data.code}`)
        // 个人逻辑... 然后返回参数
        cb({
          code: data.code
        })
      })
      /**
       * 发送接收并再发送
       */
      this.pVue.$on('send3', (data, cb) => {
        this.code3 = data.code
        console.log(`表格组件3 => 接收参数 ${data.code}`)
        // 个人逻辑... 然后返回参数
        cb({
          code: data.code
        }, () => {
          this.code4 = data.code
          console.log(`表格组件3 => 再次接收参数 ${data.code}`)
        })
      })
    }
  }
}
</script>
