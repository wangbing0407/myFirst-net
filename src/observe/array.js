let oldArrayProto = Array.prototype

export let newArrayProto = Object.create(oldArrayProto)

let methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice']

methods.forEach((method) => {
  newArrayProto[method] = function (...args) {
    // 这里重写了数组的方法
    // 内部调用原来的方法
    const result = oldArrayProto[method].call(this, ...args)
    console.log('arrayMethos', method)

    // 我们需要对新增的数据再次进行劫持
    let inserted
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
      default:
        break
    }

    console.log('数组新增的内容', inserted)
    // 如果数组新增的数据是对象类型，那么就重新进行劫持
    if (inserted) {
      ob.observeArray(inserted)
    }

    ob.dep.notify()

    return result
  }
})
