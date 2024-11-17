import axios from 'axios'
import store from '@/store'
import {
  MessageBox,
  Message
} from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 60 * 30
})
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// post form-data
// service.defaults.transformRequest = [function (data) {
//   let ret = ''
//   for (const d in data) {
//     ret += encodeURIComponent(d) + '=' + encodeURIComponent(data[d]) + '&'
//   }
//   return ret
// }]
// request interceptor
service.interceptors.request.use(
  config => {
    if (config.data && config.data.headers) config.headers = Object.assign(config.headers, config.data.headers)
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    config.headers['Authorization'] = store.getters.curUserInfo
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // 集成erp接口返回的数据
    if (response.status != 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      // store.dispatch('user/resetToken').then(() => {
      //   location.reload()
      // })
      // to re-login
      // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //   confirmButtonText: 'Re-Login',
      //   cancelButtonText: 'Cancel',
      //   type: 'warning'
      // }).then(() => {
      //   store.dispatch('user/resetToken').then(() => {
      //     location.reload()
      //   })
      // })
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
