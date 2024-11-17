import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
// import './assets/css/global.css'
// 导入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入 font-awesome
import 'font-awesome/css/font-awesome.min.css'
// 全局引入 echarts
import * as echarts from 'echarts'
// 全局引入 lodash
import _ from 'lodash'
// 引入 axios
import axios from 'axios'
import '@/styles/index.scss' // global css
// 将 axios 挂载到 Vue 上
Vue.prototype.$axios = axios
// 将 lodash 挂载到 Vue 上
Vue.prototype._ = _
Vue.config.productionTip = false
import commonJs from '@/assets/js/common.js'
import constant from '@/assets/js/constant.js'
// 使用 ElementUI
Vue.use(ElementUI)
// 将 echarts 挂载到 Vue 上
Vue.prototype.$echarts = echarts
Vue.prototype.$commonJs = commonJs
Vue.prototype.$constant = constant

/** start 全局loading方法，支持调用n次loading时，需要调用n次close才能关闭 */
let loadingObj = {
  instance: null, // loading实例
  showCount: 0 // 当前需要显示loading地方的个数，只有为0时才会隐藏loading
}
Vue.prototype.$loading = (loadingText) => {
  // 如果没有实例，则创建
  if (!loadingObj.instance) {
    let instance = ElementUI.Loading.service({
      body: true,
      lock: true,
      text: loadingText || 'Loading...',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    });
    let close = instance.close
    // 重新封装close方法
    instance.close = () => {
      // 如果显示loading的个数<=0，则真正的close（隐藏）
      if (--loadingObj.showCount <= 0 && loadingObj.instance) {
        close.call(loadingObj.instance, ...arguments)
        loadingObj.instance = null
      }
    }
    loadingObj.instance = instance
    loadingObj.showCount = 1
  } else {
    loadingObj.showCount++ // 显示loading的个数累加
  }
  return loadingObj.instance
}
/** end 全局loading方法，支持调用n次loading时，需要调用n次close才能关闭 */

// 全局设置token
axios.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers['token'] = token
  }
  return config
})
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
