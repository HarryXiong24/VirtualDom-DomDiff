/**
 * Element virdual-dom对象定义
 * @param {String} tagName - dom元素名称
 * @param {Object} props - dom属性
 * @param {Array<Element|String>} - 子节点
 */

/**
 * Element 生成虚拟dom
 */
function Element (type, props, children) {
  this.type = type
  this.props = props
  this.children = children

  // 如果有key值, 则要设置key值
  if (props.key) {
    this.key = props.key
  }
 
  // diff算法才需要
  // // 记录子节点个数
  // let count = 0
  // children.forEach( (child, index) => {
  //   // 区分是子节点是元素节点还是文字节点
  //   if (child instanceof Element) {
  //       count += child.count     // 如果是元素节点, 则判断子节点下面还有多少个子节点         
  //   } else {                
  //       children[index] = '' + child   // 如果不是子节点, 把子文档节点里的文字记录到对应的children中, 等于重复赋值
  //   }
  //   count++
  // })
  // // 记录子节点个数
  // this.count = count
}


/**
 * render 将virdual-dom对象渲染为实际 DOM 元素
 * 绑定为Element的一个实例方法, 要创建一个对象才能使用
 */
Element.prototype.render = function () {
    let el = document.createElement(this.type)   // 创建元素节点
    let props = this.props                // 获取节点的属性

    // 设置节点的DOM属性
    for (let propName in props) {
      let propValue = props[propName]
      el.setAttribute(propName, propValue)
    }

    // 处理子节点, 没有子节点的情况视为空文档节点
    let children = this.children || []
    children.forEach( (child) => {
      let childEl = (child instanceof Element)    // 判断子节点为元素节点还是文档节点
        ? child.render() // 如果子节点也是虚拟DOM(元素节点)，递归构建DOM节点
        : document.createTextNode(child) // 如果是文档节点，只构建文本节点
      el.appendChild(childEl)    // 将处理结果追加到当前节点里面
    })
    return el
}

// 测试
// let virtualDom = createElement(
//   'div', 
//   {id: '1'}, 
//   [
//     createElement('ul', {id: '2'}, ['this is ul'])
//   ]
// )

/**
 * Element 对象创建
 */
function createElement(tagName, props, children){
  return new Element(tagName, props, children);
}


