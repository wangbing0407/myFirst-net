import Vue from 'vue'
import Vuex from 'vuex'
import sumOptions from './sum'
import personOptions from './person'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  //   sum: 0,
  //   name: 'Mr.wang',
  //   age: 28,
  //   personList: [
  //     {id: '001', name: '张三'}
  //   ]
  // },
  // mutations: {
  //   SET_ADD(state, value) {
  //     console.log(value)
  //     state.sum += value
  //   },
  //   SET_REDUCE(state, value) {
  //     state.sum -= value
  //   },
  //   SET_PERSON(state, value) {
  //     state.personList.unshift(value)
  //   }
  // },
  // actions: {
  //   add(store,value) {
  //     store.commit('SET_ADD', value)
  //   },
  //   reduce({commit}, value) {
  //     commit('SET_REDUCE', value)
  //   },
  //   oddNumber(store, value) {
  //     if(store.state.sum % 2) {
  //       store.commit('SET_ADD', value)
  //     }
  //   }
  // },
  // 用于将state中的数据进行加工，与其它属性没有冲突
  // getters: {
  //   bigSum(state) {
  //     return state.sum*10
  //   }
  // },
  modules: {
    sumOptions,
    personOptions
  },
})
