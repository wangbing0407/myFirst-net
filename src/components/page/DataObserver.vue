<template>
  <div>
    <div class="bottons">
      <el-button type="primary" size="mini" @click="student.age++">年龄增加1</el-button>
      <el-button type="success" size="mini" @click="addSex">添加属性</el-button>
      <el-button type="info" size="mini" @click="addFriend">添加朋友</el-button>
      <el-button type="warning" size="mini" @click="changeFriend">修改朋友</el-button>
      <el-button type="danger" size="mini">添加爱好</el-button>
      <el-button type="danger" size="mini" @click="changeHobby">修改爱好</el-button>
      <el-button type="info" size="mini" @click="n++">点击改变n的值</el-button>
    </div>
    <h1>学生信息</h1>
    <h3>姓名：{{student.name}}</h3>
    <h3>年龄：{{student.age}}</h3>
    <h3 v-if="student.sex">性别：{{student.sex}}</h3>
    <h3>爱好：</h3>
    <ul>
      <li v-for="(h, index) of student.hobby" :key="index">
        {{h}}
      </li>
    </ul>
    <h3>朋友们：</h3>
    <ul>
      <li v-for="(f, index) in student.friends" :key="index">
        {{f.name}}--{{f.age}}
      </li>
    </ul>
    <h2 v-once>初始值:{{n}}</h2>
    <h2>点击变化的值:{{n}}</h2>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data(){
    return {
      student: {
        name: 'tom',
        age: 18,
        hobby: ['抽烟','喝酒','烫头'],
        friends: [
          {name: 'jerry', age: 35},
          {name: 'tony', age: 38},
        ]
      },
      n: 1
    }
  },
  mounted(){
    console.log(this)
  },
  methods: {
    addSex(){
      // 操作对象，使用的是Object.defineProperty(主要用的是setter) + Observer(观察者)来对数据做响应式处理的
      Vue.set(this.student, 'sex', '男')
    },
    addFriend(){
      // 操作数组，使用vue中包含的数组方法来对数据做响应式处理的
      this.student.friends.unshift({name: 'jack', age: 39})
    },
    changeFriend() {
      this.student.friends[0].name = 'hu'
    },
    changeHobby() {
      // this.student.hobby.splice(0, 1, '开车')
      this.$set(this.student.hobby, 0, '开车')
    }
  }
}
</script>

<style lang="scss">
.buttons {
  display: flex;
}
</style>