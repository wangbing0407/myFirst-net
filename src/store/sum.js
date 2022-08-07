export default {
  namespaced: true,
  state: {
    sum: 0,
    name: 'Mr.wang',
    age: 28,
  },
  mutations: {
    SET_ADD(state, value) {
      state.sum += value
    },
    SET_REDUCE(state, value) {
      state.sum -= value
    },
  },
  actions: {
    add(store,value) {
      store.commit('SET_ADD', value)
    },
    reduce({commit}, value) {
      commit('SET_REDUCE', value)
    },
    oddNumber(store, value) {
      if(store.state.sum % 2) {
        store.commit('SET_ADD', value)
      }
    }
  },
  getters: {
    bigSum(state) {
      return state.sum*10
    }
  }
}