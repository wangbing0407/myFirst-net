<template>
  <div>
    <h2>当前求和的值为：{{sum}}</h2>
    <h2>当前放大十倍后的值为：{{bigSum}}</h2>
    <h2>我的名字叫：{{name}},今年{{age}}</h2>
    <h3 style="color: red">Person组件的总人数是: {{personList.length}}</h3>
    <div>
      <el-select v-model="value" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="add(value)"></el-button>
      <el-button type="primary" icon="el-icon-minus" size="mini" @click="reduce(value)"></el-button>
      <el-button type="primary" size="mini" @click="oddNumber(value)">当前求和为奇数再加</el-button>
      <el-button type="primary" size="mini" @click="wait">等一等再加</el-button>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      options: [{
          value: 1,
          label: '1'
        }, {
          value: 2,
          label: '2'
        }, {
          value: 3,
          label: '3'
        }],
        value: 1
    }
  },
  computed: {
    // sum() {
    //   return this.$store.state.sum
    // }
    // ...mapState({he:'sum', name: 'name', age: 'age'})
    // ...mapState(['sum','name','age','personList']),
    ...mapState('sumOptions',['sum','name','age']),
    ...mapState('personOptions',['personList']),


    // ...mapGetters(['bigSum'])
    ...mapGetters('sumOptions',['bigSum'])
  },
  methods: {
    // add() {
    //   this.$store.commit('SET_ADD', this.value)
    // },
    // reduce(){
    //   this.$store.commit('SET_REDUCE', this.value)
    // },

    // ...mapMutations({add: 'SET_ADD', reduce: 'SET_REDUCE'}),
    ...mapMutations('sumOptions',{add: 'SET_ADD', reduce: 'SET_REDUCE'}),
    // ...mapMutations(['SET_ADD','SET_REDUCE']),

    /*********************************************************/
    // oddNumber(){
    //     this.$store.dispatch('oddNumber', this.value)
    // },
    wait(){},
    // ...mapActions({oddNumber: 'oddNumber'})
    ...mapActions('sumOptions',{oddNumber: 'oddNumber'})
  }
}
</script>

<style>

</style>