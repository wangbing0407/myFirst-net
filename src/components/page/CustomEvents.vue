<template>
  <div class="custom-events">
    <el-button type="primary" size="mini" @click="handleSetVal">传值</el-button>
    <el-button type="danger" size="mini" @click="unbind">解绑</el-button>
    <el-button type="danger" size="mini" @click="death">销毁</el-button>
  </div>
</template>

<script>
export default {
  name: 'CustomEvents',
  data(){
    return {
      eventMsg: '自定义事件中的值'
    }
  },
  props: {
    changeMsg: {
      type: Function,
      default: () => Function
    }
  },
  methods:{
    handleSetVal(){
      this.$emit('handleSetVal', this.eventMsg)
      this.changeMsg('333')
    },
    // 解绑：解绑组件中的自定义事件，还能操作dom，但是页面的数据不会发生变化
    unbind(){
      this.$off()
    },
    death() {
      this.$destroy()
    }
  }
}
</script>

<style>

</style>