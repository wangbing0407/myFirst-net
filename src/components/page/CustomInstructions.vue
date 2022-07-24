<template>
  <div>
    <el-button type="primary" size="mini" @click="n++">点击改变n的值</el-button>
    <h2>当前的值是：<span v-text="n"></span></h2>
    <h2>被放大后的值是：<span v-big="n"></span></h2>
    <el-divider></el-divider>
    <div>
      <input type="text" v-fbind="n">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 1
    }
  },
  directives: {
    /**
     * 调用逻辑
     * 1、指令与元素成功绑定时（一上来）
     * 2、指令所在的模板被重新解析时
     */
    big(ele,binding){
      ele.innerHTML = binding.value * 10
    },
    fbind: {
      // 指令与元素成功绑定时（一上来）
      bind(el,binding){
        el.value = binding.value
      },
      // 指令所在元素被插入页面时
      inserted(el,binding){
        el.focus()
      },
      // 指令所在的模板被重新解析时
      update(el,binding){
        el.value = binding.value
      }
    }
  }
}
</script>