<template>
  <div>
    <el-button type="primary" size="mini" round @click="isShow = !isShow">显示/隐藏</el-button>
    <transition-group 
      name="animate__animated animate__bounce" 
      :appear="true"
      enter-active-class="animate__swing"
      leave-active-class="animate__backOutUp"
    >
      <h1 v-show="isShow" key="1">你好啊！</h1>
      <h1 v-show="!isShow" key="2">何毛宁！</h1>
    </transition-group>
    <el-button type="primary" size="mini" @click="getData">获取信息</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      isShow: true
    }
  },
  methods: {
    getData() {
      axios.get('http://localhost:8080/wang/students').then(res =>{
        console.log(res.data)
      })
    }
  }
}
</script>

<style>
  h1 {
    background-color: orange;
  }
  /* .come {
    animation: at 1s;
  }
  .go {
    animation: at 1s reverse;
  } */
  /* .v-enter-active {
    animation: at 1s;
  }
  .v-leave-active {
    animation: at 1s reverse;
  }
  @keyframes at {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0px);
    }
  } */
</style>