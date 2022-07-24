import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Plugins from './plugin'

// 关闭vue的生成提示
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Plugins);

/**
 * 关于不同版本的Vue
 *    1.vue.js与vue.runtime.xxx.js的区别：
 *      1)vue.js是完整版的Vue，包含：核心功能(生命周期、监听器等)+模板解析器
 *      2)vue.runtime.xxx.js是运行班的Vue，只包含：核心功能；没有模板解析器
 * 
 *    2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
 *      render函数接收到的 createElement 函数去指定具体内容
 * 
 * vue打包后的文件，是不包含模板编译的代码（使用的是不同的vue版本打包），目的是让打包生成的文件体积变小
 * 1、runtime里的代码都去掉了template模板解析器
 * 2、esm代表 ES Module，表示如果用到了es模块化的东西，就用vue.runtime.esm.js
 * 3、common(vue.common.dev)表示CommonJs语法
 */
new Vue({
  router,
  store,
  render: h => h(App)
  // template: `<h1>222</h1>`
  // render(createElement){
  //   console.log(typeof createElement)
  //   console.log(createElement)
  //   return createElement('h1', '你好啊')
  // }
}).$mount('#app')
