<template>
  <div>
    <el-button type="primary" size="mini" @click="changeStyl">改变div样式</el-button>
    <div class="basic" :class="styl"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      classArr: ['stly1', 'stly2', 'stly3'],
      styl: ''
    }
  },
  methods: {
    changeStyl() {
      const arr = ['stly1', 'stly2', 'stly3']
      const index = Math.floor(Math.random()*3)
      this.styl = arr[index]
    }
  },
}
</script>

<style lang="scss">
.basic {
  width: 200px;
  height: 200px;
  border: 1px solid black;
}
.stly1 {
  border: 2px solid red;
}
.stly2 {
  background-color:rgb(50, 99, 57);
}
.stly3 {
  border-radius: 15px;
}
</style>