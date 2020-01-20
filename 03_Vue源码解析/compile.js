// 用法 new Compile(el,vm)

class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm

    // 判断el的存在性
    if (this.$el) {
      // 转换内部内容为片段Fragment
      this.$fragment = this.node2Fragment(this.$el)
      // 执行编译
      this.compile(this.$fragment)
      //   将编译玩的HTML结果追加至$el
      this.$el.appendChild(this.$fragment)
    }
  }

  // 将诉诸元素中代码片段拿出来遍历，这样做比较高效
  node2Fragment(el) {
    const frag = document.createDocumentFragment()
    //   将el中所有子元素搬家至frag
    let child
    while ((child = el.firstChild)) {
      frag.appendChild(child) // appendChild 是移动操作
    }
    return frag
  }

  // 编译过程
  compile(el) {
    const childNodes = el.childNodes
    //  Array.from() 从类数组中转出一个数组
    Array.from(childNodes).forEach(node => {
      // 类型判断
      if (this.isElement(node)) {
        // console.log('编译元素', node.nodeName)
        // 元素
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
          const attrName = attr.name //属性名
          const exp = attr.value // 属性值
          if (this.isDirective(attrName)) {
            // k-model k-text
            const dir = attrName.substring(2)
            // 执行指令
            this[dir] && this[dir](node, this.$vm, exp)
          }
          if (this.isEvent(attrName)) {
            const dir = attrName.substring(1) // @click
            this.eventHandler(node, this.$vm, exp, dir)
          }
        })
      } else if (this.isInterpolation(node)) {
        //文本
        // console.log('编译文本', node.textContent)
        this.compileText(node)
      }
      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  compileText(node) {
    console.log(RegExp.$1)
    // node.textContent = this.$vm.$data[RegExp.$1]
    this.update(node, this.$vm, RegExp.$1, 'text')
  }

  //  更新函数
  update(node, vm, exp, dir) {
    const updaterFn = this[dir + 'Updater']
    // 初始化
    updaterFn && updaterFn(node, vm[exp])
    // 依赖收集
    new Watcher(vm, exp, function(value) {
      updaterFn && updaterFn(node, value)
    })
  }

  text(node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }

  html(node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }

  model(node, vm, exp) {
    this.update(node, vm, exp, 'model')
    let val = vm.exp
    node.addEventListener('input', e => {
      let newValue = e.target.value
      vm[exp] = newValue
      val = newValue
    })
  }

  //   事件处理器
  eventHandler(node, vm, exp, dir) {
    const fn = vm.$options.methods && vm.$options.methods[exp]
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm))
    }
  }

  modelUpdater(node, value) {
    node.value = value
  }

  textUpdater(node, value) {
    node.textContent = value
  }
  htmlUpdater(node, value) {
    node.innerHtml = value
  }

  isDirective(attr) {
    return attr.indexOf('k-') == 0
  }

  isEvent(attr) {
    return attr.indexOf('@') == 0
  }

  isElement(node) {
    return node.nodeType === 1
  }

  // 插值文本
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    // 注意这个 正则中间的内容加了小括号 ( .* )
  }
}
