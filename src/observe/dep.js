let id = 0

class Dep {
  constructor() {
    this.id = id++ //属性的dep要收集watcher
    this.subs = [] //这里存放着当前属性对应的watcher有哪些
  }
  depend() {
    // 这里我们不希望放重复的watcher，而且 dep -> watcher只是一个单向的关系
    // 还需要 watcher记录dep addSub()
    // 这里的Dep.target就是当前的watcher
    // this.subs.push(watcher) 放在这里会有重复的问题
    Dep.target.addDep(this)

    // dep和watcher是多对多的关系（一个属性可以在多个组件中使用 dep -> watcher）
    // 一个组件由多个属性组成 （一个watcher对应多个dep）
  }

  addSub(watcher) {
    this.subs.push(watcher)
  }

  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}

Dep.target = null

export default Dep
