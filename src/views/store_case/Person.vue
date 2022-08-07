<template>
  <div class="person-details">
    <h2>人员列表</h2>
    <h3>第一个人的名字是: {{firstPersonName}}</h3>
    <h3>随机生成的话: {{title}}</h3>
    <h3 style="color:red">Sun组件的求和为: {{sum}}</h3>
    <el-input v-model="inputVal" size="mini" placeholder="请输入内容"></el-input>
    <el-button type="primary" size="mini" @click="add">添加</el-button>
    <el-button type="primary" size="mini" @click="addW">添加一个W</el-button>
    <el-button type="primary" size="mini" @click="random">随机生成一段话</el-button>
    <ul>
      <li v-for="item in personList" :key="item.id">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>

import {nanoid} from 'nanoid'
export default {
  name: 'Person',
  data() {
    return {
      inputVal: ''
    }
  },
  computed:{
    personList() {
      return this.$store.state.personOptions.personList
    },
    sum() {
      return this.$store.state.sumOptions.sum
    },
    firstPersonName() {
      return this.$store.getters['personOptions/firstPersonName']
    },
    title() {
      return this.$store.state.personOptions.title
    }
  },
  methods: {
    add() {
      let obj = {
        id: nanoid(), name: this.inputVal
      }
      this.$store.commit('personOptions/SET_PERSON', obj)
      this.inputVal = ''
    },
    addW() {
      let obj = {
        id: nanoid(), name: this.inputVal
      }
      this.$store.dispatch('personOptions/addPersonWang', obj)
      this.inputVal = ''
    },
    random() {
      this.$store.dispatch('personOptions/addPersonServer')
    }
  }
}
</script>

<style>
.person-details .el-input {
  width: 20%;
}
</style>