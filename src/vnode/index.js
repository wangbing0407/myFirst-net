export function createElementVNode(vm, tag, data = {}, ...children) {
  data = data == null ? {} : data
  let key = data.key
  if (key) {
    delete data.key
  }
  return vnode(vm, tag, key, data, children)
}

export function createTextVNode(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text)
}

// ast做的是语法层面的转换，它描述的是语法本身
// 虚拟DOM，描述的是dom元素，可以增加自定义属性
export function vnode(vm, tag, key, props, children, text) {
  return {
    vm,
    tag,
    key,
    props,
    children,
    text,
  }
}
