<template>
  <div>
    <el-input v-model="code" placeholder="过程在控制台" />
    <el-row style="margin-top: 20px">
      <el-button :disabled="code ===''" type="primary" @click="send1()">单项发送</el-button>
      <el-button :disabled="code ===''" type="primary" @click="send2()">发送并接收回传</el-button>
      <el-button :disabled="code ===''" type="primary" @click="send3()">发送接收并再发送</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ''
    }
  },
  props: {
    pVue: {
      type: Object
    }
  },
  methods: {
    /**
     * 单项发送
     */
    send1() {
      this.pVue.$emit('send1', {
        code: this.code
      })
    },
    /**
     * 发送并接收回调
     */
    send2() {
      this.pVue.$emit('send2', {
        code: this.code
      }, (data) => {
        console.log(`按钮组件2 => 接收回传 ${data.code}`)
      })
    },
    /**
     * 发送接收并再发送
     */
    send3() {
      this.pVue.$emit('send3', {
        code: this.code
      }, (data, cb) => {
        console.log(`按钮组件3 => 接收回传 ${data.code}`)
        cb({
          code: data.code
        })
      })
    }
  }
}
</script>