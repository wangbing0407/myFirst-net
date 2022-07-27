<template>
  <div>
    <h2>{{num}}</h2>
    <el-button type="primary" size="mini" @click="add">点我增加1</el-button>
  </div>
</template>

<script>
import 'animate.css';
export default {
  data(){
    return {
      num: 1
    }
  },
  methods:{
    add(){
      this.num++
    }
  },
  beforeCreate(){
    console.log('beforeCreate')
  },
  created(){
    console.log('created')
  },
  beforeMount(){
    console.log('beforeMount')
  },
  mounted(){
    console.log('mounted')
  },
  beforeUpdate(){
    console.log('beforeUpdate')
  },
  updated(){
    console.log('updated')
  },
  beforeDestroy(){
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  },
}
</script>
