
/**
 * vue核心流程：
 *  1.创造了响应式数据
 *  2.将模板转换成ast语法树
 *  3.将ast语法树转换成了render函数
 *    --- 每次重新渲染都会用正则替换，消耗性能比较大，所以就将ast语法树转换成render函数
 *  4.后续每次数据更新可以只执行render函数，无需再次执行ast转换的过程
 *  5.render函数会去产生虚拟节点（使用响应式数据）
 *    --- 每次更新，就会调用render函数
 *  6.根据生成的虚拟节点创造真实的DOM
 */

export function initLifeCycle(Vue) {
  Vue.prototype._update = function() {
    console.log('_update')
  }
  Vue.prototype._reder = function() {
    console.log('reder');
  }
}

export function mountComponent(vm, el) {

  // 1.调用render犯法产生虚拟节点 虚拟DOM
  vm._update(vm._reder()); // vm.$option.render() 虚拟节点

  // 2.根据虚拟DOM产生真实DOM

  // 3.插入到el元素中
}