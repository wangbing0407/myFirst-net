import axios from "axios"

export default {
  namespaced: true,
  state: {
    personList: [
      {id: '001', name: '张三'}
    ],
    title: ''
  },
  mutations: {
    SET_PERSON(state, value) {
      state.personList.unshift(value)
    },
    SET_TITLE(state, value) {
      state.title = value
    }
  },
  actions: {
    addPersonWang(store, value) {
      if(value.name.indexOf('王') > -1) {
        store.state.personList.unshift(value)
      }
    },
    addPersonServer({commit}) {
      axios.get('https://api.uixsj.cn/hitokoto/get?type=social')
        .then(response => {
          console.log(response)
          commit('SET_TITLE', response.data)
        })
    }
  },
  getters: {
    firstPersonName(state) {
      return state.personList[0].name
    }
  }
}