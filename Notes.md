# 笔记

## 1、 Vue核心API&&组件设计

- 官方推荐使用的引用组件的命名形式

```js
// 推荐使用小写
import Cart from "./components/Cart";
<cart></cart>

// 中间添加 - 
import HelloWorld from "./components/Cart";
<hello-world></hello-world>
```

- checkbox

```vue
<input type="checkbox" v-model="item.isActive" />
```

- 一定要遵守单项数据流
  
  父组件的数据要在父组件进行修改

- element-ui 已经被 vue-cli 纳入组件库
  
  vue add element-ui     使用按需引入
  
  ```js
  // src/plugins/element.js
  
  import Vue from 'vue'
  import { Button,Form,FormItem,Input } from 'element-ui'
  
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  
  // src/main.js
  
  import './plugins/element.js'
  ```

- **element-ui**   form表单的校验
  
  ```js
  rules: {
    username: [
      { required: true, message: "请输入用户名" },
      { min: 6, max: 10, message: "请输入6~10的用户名" }
    ],
    password: [{ required: true, message: "请输入密码" }]
  }
  ```

- 需要思考的问题

  1、input是自定义组件，它是怎么实现双向绑定？

  2、FormItem是怎么知道执行校验的，它是怎么知道input状态的？它是怎么获取对应数据模型的？

  3、Form是怎么进行全局校验的？它用什么办法把数据模型和校验规则传递给内部组件？

  - 数据校验包 `async-validator`

    ```js
    import Schema from 'async-validator'
    
    validator() {
      // 进行校验
      const rules = this.KForm.rules[this.prop]
      const value = this.KForm.model[this.prop]
      const descriptor = { [this.prop]: rules }
      const schema = new Schema(descriptor)
      schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errMessage = errors[0].message
          this.errStatus = true
        } else {
          this.errMessage = ''
          this.errStatus = false
        }
      })
    }
    ```

  > 设计思想：
  >
  > - from 绑定数据模型 添加校验规则
  >   - formitem label prop 校验和显示错误
  >     - input

-  [provide / inject](https://cn.vuejs.org/v2/api/#provide-inject) *****

   主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中 

  ```js
  // 父级组件
    provide() {
      return {
        someval:'来自app.vue'
      };
    },
  
  // 子组件注入 someval
    inject: ["someval"]
  ```

  



  