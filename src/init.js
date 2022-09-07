import {initState} from './state'

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this;
    // vm.$options 就是获取用户的配置
    vm.$options = options // 将用户的选项挂载到实例上

    initState(vm)
  }
}
