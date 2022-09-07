
// rollup默认可以导出一个对象，作为打包的配置文件
import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',
  output: {
    file: './dist/vue.js',
    name: 'Vue', // global.vue
    format: 'umd', // esm es6模块   commonjs模块   iife自执行函数   umd（commonjs amd）--不兼容es6
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

// 为什么vue2只能支持ie9以上的版本  Object.defineProperty不支持低版本的浏览器
// proxy是es6的语法，也没有替代方案，且vue3不再支持IE