class KVue {
  constructor(options) {
    this.$options = options

    // 数据响应化
    this.$data = options.data
    this.observe(this.$data)

    // 模拟一下watcher的创建
    // new Watcher()
    // this.$data.test
    // new Watcher()
    // this.$data.foo.bar

    new Compile(options.el, this)

    // created 执行
    if (options.created) {
      options.created.call(this)
    }
  }

  observe(value) {
    if (!value || typeof value !== 'object') {
      return
    }

    // traverse
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
      // 代理data中的属性到vue实例上
      this.proxyData(key)
    })
  }

  // 数据响应化（数据劫持）
  defineReactive(obj, key, val) {
    // traverse 解决数据的嵌套
    this.observe(val)

    // 2\初始化
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        // console.log(`${key}属性更新了：${val}`)
        dep.notify()
      }
    })
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}

// Dep:用来管理 Watcher
class Dep {
  constructor() {
    // 存放若干以来 （Watchers）
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}

// watcher
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前 Watcher 实例制定到 dep 静态属性 target
    // video 50 分钟左右讲解
    Dep.target = this // 先设置
    this.vm[this.key] // 触发 getter 添加依赖
    Dep.target = null // 然后在清空
  }

  update() {
    // console.log('属性更新了')
    this.cb.call(this.vm, this.vm[this.key])
  }
}
