<template>
  <div>
    <h2>watch与computed比较</h2>
    <div>
      <label for="">姓：</label>
      <el-input v-model="fistName" placeholder="请输入内容"></el-input>
    </div>
    <div>
      <label for="">名：</label>
      <el-input v-model="lastNme" placeholder="请输入内容"></el-input>
    </div>
    <label for="">全名：</label>
    <div>{{fullName}}</div><hr><hr>
    <template>
      <el-button type="primary" @click="add">增加一项</el-button>
      <ul>
        <li v-for="item in personList" :key="item.id">
          {{item.name}} -- {{item.age}}
          <input type="text">
        </li>
      </ul>
    </template>
    <!-- 过滤查询 -->
    <template>
      <el-input v-model="inputVal"></el-input>
      <ul>
        <li v-for="item in roles" :key="item.id">
          {{item.name}} -- {{item.age}}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>

export default {
  data() {
    return {
      fistName: '张',
      lastNme: '三',
      // fullName: '张-三',
      window:window,
      personList: [
        {id:'01', name: '关羽', age: 18},
        {id:'02', name: '刘备', age: 19},
        {id:'03', name: '张飞', age: 17},
      ],
      searchList: [
        {id:'01', name: '剑圣', age: 18},
        {id:'02', name: '剑姬', age: 19},
        {id:'03', name: '妖姬', age: 17},
        {id:'04', name: '海妖', age: 17},
      ],
      inputVal: '',
      // roles: []
    }
  },
  computed: {
    fullName(){
      // 计算属性里面不能用异步方法，不能用普通函数
      // setTimeout(() =>{
      //   return this.fistName  + '-' + this.lastNme
      // },1000)
      console.log('执行了11111')
      return this.fistName  + '-' + this.lastNme
    },
    roles(){
      console.log('执行了2222')
      return this.searchList.filter(r => r.name.indexOf(this.inputVal) !== -1)
    }
  },
  watch: {
    // 计算属性里面可以用异步方法，不能用普通函数
    // fistName(val){
    //   setTimeout(() =>{
    //   console.log(this)
    //     this.fullName = val + '-' + this.lastNme
    //   },1000)
    // },

    // inputVal: {
    //   handler(val) {
    //     this.roles = this.searchList.filter(r => r.name.indexOf(val) !== -1)
    //   },
    //   immediate: true
    // }
  },
  mounted() {
    console.log(this.window)
  },
  methods: {
    add() {
      const list = {id:'04', name: '赵云', age: 16}
      this.personList.unshift(list)
    }
  }
}
</script>

<style lang="scss">

</style>