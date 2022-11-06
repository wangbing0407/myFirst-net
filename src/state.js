import Dep from './observe/dep'
import { observe } from './observe/index'
import Watcher, { nextTick } from './observe/watcher'

export function initState(vm) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initWatch(vm) {
  let watch = vm.$options.watch
  for (let key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm, key, handler) {
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(key, handler)
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    // vm.name
    get() {
      return vm[target][key] // vm._data.name
    },
    set(newValue) {
      vm[target][key] = newValue
    },
  })
}

function initData(vm) {
  let data = vm.$options.data
  data = typeof data === 'function' ? data.call(vm) : data

  vm._data = data
  observe(data)

  // 将vm._data用vm来代理，使data中的数据可以直接通过vm.propertyKey访问
  for (let key in data) {
    proxy(vm, '_data', key)
  }
}

function initComputed(vm) {
  const computed = vm.$options.computed
  const watchers = (vm._computedWatchers = {}) // 将计算属性watcher保存到vm上
  for (let key in computed) {
    let userDef = computed[key]

    // 我们需要监控计算属性中get的变化
    let fn = typeof userDef === 'function' ? userDef : userDef.get
    watchers[key] = new Watcher(vm, fn, { lazy: true })

    defineComputed(vm, key, userDef)
  }
}

function defineComputed(target, key, userDef) {
  const getter = typeof userDef === 'function' ? userDef : userDef.get
  const setter = userDef.set || (() => {})
  Object.defineProperty(target, key, {
    get: createComputedGetter(key),
    set: setter,
  })
}

// 计算属性根本不会收集依赖，只会让自己的依赖属性去收集依赖
function createComputedGetter(key) {
  return function () {
    const watcher = this._computedWatchers[key]
    console.log(watcher)
    if (watcher.dirty) {
      // 如果是脏的就去执行用户传入的函数
      watcher.evaluate()
    }
    // 计算属性出栈后，还要渲染watcher，我们应该让计算属性watcher里的属性，也去收集上一层的watcher
    if (Dep.target) {
      watcher.depend()
    }
    return watcher.value // 最后返回的是watcher上的值
  }
}

export function initStateMixin(Vue) {
  Vue.prototype.$nextTick = nextTick
  Vue.prototype.$watch = function (exprOrFn, cb, option = {}) {
    // firstname的值变化了，直接执行cb函数即可
    new Watcher(this, exprOrFn, { user: true }, cb)
  }
}
