export default {
  install(Vue) {
    Vue.filter('mySlice', function(value){
      return value.slice(0,4)
    })

    Vue.directive('fbind', {
      // 指令与元素成功绑定时（一上来）
      bind(el,binding){
        el.value = binding.value
      },
      // 指令所在元素被插入页面时
      inserted(el,binding){
        el.focus()
      },
      // 指令所在的模板被重新解析时
      update(el,binding){
        el.value = binding.value
      }
    })
  }
}