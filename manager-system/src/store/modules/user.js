const state = {
  curUserInfo: '', // 当前登录用户信息
};

const mutations = {
  SET_CUR_USER_INFO: (state, userInfo) => {
    state.curUserInfo = userInfo || ''
  },
};

const actions = {
  // 设置当前登录用户信息
  async setCurUserInfo({ commit }, userInfo) {
    commit("SET_CUR_USER_INFO", userInfo);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
