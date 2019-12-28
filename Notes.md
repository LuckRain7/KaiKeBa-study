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

