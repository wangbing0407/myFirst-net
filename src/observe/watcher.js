/**
 * 每个组件里面都会有一个watcher，初始化时，只有一个watcher，用来渲染根实例
 * 组件的特点：复用、方便维护、局部更新
 * 要做到局部更新的一个关键点，就是要利用每个组件独立的watcher
 */

import Dep, { popTarget, pushTarget } from './dep'

let id = 0

// 一个watcher代表一个视图(组件)
// 每个属性都有一个dep（属性就是被观察者），watcher就是观察者(属性变化了会通知观察者来更新)
// 观察者模式
class Watcher {
  constructor(vm, fn, option) {
    this.id = id++
    this.renderWatcher = option // 是一个渲染watcher
    this.getter = fn
    this.deps = [] // 后续我们实现计算属性，和一些清理工作(组件卸载)需要用到
    this.depsId = new Set()
    this.lazy = option.lazy
    this.dirty = this.lazy // 缓存值
    this.vm = vm

    this.lazy ? undefined : this.get()
  }
  // 一个组件对应多个属性，重复的不用记录
  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this) // watcher已经记住了dep，而且去重了，此时让dep也记住watcher
    }
  }

  evaluate() {
    this.value = this.get()
    this.dirty = false
  }

  depend() {
    // watcher记住dep
    let i = this.deps.length

    while (i--) {
      // dep.depend
      this.deps[i].depend()
    }
  }

  get() {
    pushTarget(this)
    let value = this.getter.call(this.vm) // 会去vm上取值
    popTarget()
    return value
  }

  update() {
    if (this.lazy) {
      // 如果是计算属性，依赖的值变化了，就标识计算属性是脏值了
      this.dirty = true
    } else {
      queunWatcher(this)
      // this.get()
    }
  }

  run() {
    this.get()
  }
}

let qunen = []
let has = {}
let pending = false

function flushSchedulerQueue() {
  let flushQueue = qunen.slice(0)
  qunen = []
  has = {}
  pending = false
  flushQueue.forEach((q) => q.run())
}

function queunWatcher(watcher) {
  const id = watcher.id
  if (!has[id]) {
    qunen.push(watcher)
    has[id] = true
    // 不管update执行多少次，最终只执行一轮刷新操作
    if (!pending) {
      nextTick(flushSchedulerQueue, 0)
      pending = false
    }
  }
}

let callbacks = []
let waiting = false
function flushCallbacks() {
  let cbs = callbacks.slice(0)
  waiting = false
  callbacks = []
  cbs.forEach((cb) => cb())
}

/**
 * nextTick没有直接使用某个api，而是采用优雅降级的方式
 * 内部先采用promise(ie不兼容)
 * MutationObserver(h5的api)
 * setImmediate(IE专享)
 * setTimeout
 */
let timerFunc
if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks)
  }
} else if (MutationObserver) {
  let observer = new MutationObserver()
  let textNode = document.createTextNode(1)
  observer.observe(textNode, {
    characterData: true,
  })
  timerFunc = () => {
    textNode.textContent = 2
  }
} else if (setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks)
  }
}

export function nextTick(cb) {
  callbacks.push(cb) // 放到队列中执行是同步
  if (!waiting) {
    timerFunc() // 刷新的时候是异步
    waiting = true
  }
}

export default Watcher
