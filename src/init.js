import {initState} from './state'
import {compileToFunction} from './compiler/index'

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this;
    // vm.$options 就是获取用户的配置
    vm.$options = options // 将用户的选项挂载到实例上

    initState(vm)

    if(options.el) {
      vm.$mount(options.el)
    }
  }
  Vue.prototype.$mount = function(el) {
    const vm = this;
    el = document.querySelector(el);
    let opts = vm.$options
    if(!opts.render) { // 先进行查找有没有render函数
      let template // 没有render看一下是否写了template，
      // 没有写模板，但是写了el
      if(!opts.template && el) {
        template = el.outerHTML
      }else {
        if(el) { // 如果有el，就采用模板的内容
          template = opts.template
        }
      }
      if(template) {
        // 这里需要对模板进行编译
        const render = compileToFunction(template)
        opts.render = render  // jsx最终会被编译成h('xxx')
      }
      console.log(template)
    }
    opts.render

    // script标签引用的vue.global.js这个编译过程是在浏览器运行的
    // runtime是不包括模板编译的，整个编译是打包的时候通过loader来转移.vue文件的
    // 用runtime的时候不能使用template
  }
}
