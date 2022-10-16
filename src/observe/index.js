import { newArrayProto } from './array'
import Dep from './dep'

class Observer {
  constructor(data) {
    // Object.defineProperty只能劫持已经存在的属性，新增删除的属性并不能劫持到
    // 对此，vue2里面会单独进行处理 $set $delete

    data.__ob__ = this // 给数据加了一个标识，如果数据上有__ob__，则说明这个属性被观测过
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false, // 将 __ob__ 变成不可枚举（循环的时候无法获取到）
    })
    if (Array.isArray(data)) {
      data.__proto__ = newArrayProto
      this.observeArray(data) // 如果数组中放的是对象，可以监控到对象的变化
    } else {
      this.walk(data)
    }
  }

  // 循环对象，对属性依此进行劫持
  walk(data) {
    // 重新定义属性
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]))
  }
  // 观测数组
  observeArray(data) {
    data.forEach((item) => observe(item))
  }
}

export function defineReactive(target, key, value) {
  observe(value) // 对所有的对象都进行劫持
  let dep = new Dep() // 每个属性都有一个dep
  Object.defineProperty(target, key, {
    get() {
      if (Dep.target) {
        dep.depend() // 让这个属性的收集器记住当前的watcher
      }
      return value
    },
    set(newValue) {
      if (newValue === value) return
      observe(newValue) // 修改的值如果是对象，就重新进行劫持
      value = newValue
      dep.notify() //通知更新
    },
  })
}

// 对data这个对象进行劫持
export function observe(data) {
  // console.log(data)

  if (typeof data !== 'object' || data === null) {
    return // 只对对象进行劫持
  }

  if (data.__ob__ instanceof Observer) {
    // 说明这个对象被代理过了
    return data.__ob__
  }

  // 如果一个对象被劫持过了，那就不需要再被劫持了
  // 要判断一个对象是否被劫持过，可以添加一个实例，用实例来判断是否被劫持欧

  return new Observer(data)
}
