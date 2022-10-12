/**
 * vue核心流程：
 *  1.创造了响应式数据 initState（针对对象来说主要是增加了defineProperty，针对数组就是重写方法）
 *  2.将模板转换成ast语法树
 *  3.将ast语法树转换成了render函数
 *    --- 每次重新渲染都会用正则替换，消耗性能比较大，所以就将ast语法树转换成render函数
 *  4.后续每次数据更新可以只执行render函数，无需再次执行ast转换的过程
 *  5.render函数会去产生虚拟节点（使用响应式数据）
 *    --- 每次更新，就会调用render函数 render(){_c('div', null, _v(name))}
 *  6.根据生成的虚拟节点创造真实的DOM
 */

import { createElementVNode, createTextVNode } from './vnode/index'

function createElm(vnode) {
  let { tag, data, children, text } = vnode
  if (typeof tag === 'string') {
    // 这里将真实节点和虚拟节点对应起来，后续如果修改属性了，会进行diff对比
    vnode.el = document.createElement(tag)
    patchProps(vnode.el, data)
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function patchProps(el, props) {
  for (let key in props) {
    if (key === 'style') {
      // style{color: "red"}
      for (let styleName in props.style) {
        el.style[styleName] = props.style[styleName]
      }
    } else {
      el.setAttribute(key, props[key])
    }
  }
}

function patch(oldVNode, vnode) {
  // 初步渲染流程
  const isRealElement = oldVNode.nodeType
  if (isRealElement) {
    const elm = oldVNode // 获取真实元素
    const parentElm = elm.parentNode // 拿到父元素
    let newElm = createElm(vnode)
    parentElm.insertBefore(newElm, elm.nextSibling)
    parentElm.removeChild(elm)
    return newElm
  }
}

export function initLifeCycle(Vue) {
  // 将虚拟dom(vnode)转换成真实dom
  Vue.prototype._update = function (vnode) {
    const vm = this
    const el = this.$el
    console.log('_update', vnode, el)
    // patch既有初始化的功能，又有更新的功能
    vm.$el = patch(el, vnode)
  }

  Vue.prototype._c = function () {
    return createElementVNode(this, ...arguments)
  }

  Vue.prototype._v = function () {
    return createTextVNode(this, ...arguments)
  }

  Vue.prototype._s = function (value) {
    if (typeof value !== 'object') return value
    return JSON.stringify(value)
  }
  Vue.prototype._render = function () {
    // 当渲染的时候会去实例中取值，我们就可以将属性和视图绑定在一起
    return this.$options.render.call(this) // 通过ast语法转义
  }
}

export function mountComponent(vm, el) {
  vm.$el = el
  // 1.调用render方法产生虚拟节点 虚拟DOM
  vm._update(vm._render()) // vm.$option.render() 虚拟节点

  // 2.根据虚拟DOM产生真实DOM

  // 3.插入到el元素中
}
