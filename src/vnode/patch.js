export function createElm(vnode) {
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

export function patchProps(el, props) {
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

export function patch(oldVNode, vnode) {
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
