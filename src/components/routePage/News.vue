<template>
  <div>
    <h3 :style="{opacity}">新闻111</h3>
    <el-input v-model="input1" size="mini" placeholder="请输入内容"></el-input>
    <el-input v-model="input2" size="mini" placeholder="请输入内容"></el-input>
    <el-input v-model="input3" size="mini" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      opacity: 1
    }
  },
  // mounted() {
  //   this.timer = setInterval(() =>{
  //     this.opacity -=0.01
  //     if(this.opacity <= 0) this.opacity = 1
  //   })
  // },
  // beforeDestroy() {
  //   clearInterval(this.timer)
  // },
  activated() {
    console.log('News组件被激活了')
    this.timer = setInterval(() =>{
      this.opacity -=0.01
      if(this.opacity <= 0) this.opacity = 1
    },20)
  },
  deactivated() {
    console.log('News组件失活了')
    clearInterval(this.timer)
  }
}
</script>

<style>

</style>