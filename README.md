# KaiKeBa-study
> 开课吧Web全栈架构师学习代码

目录：

[TOC]



## Vue核心API&&组件设计

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

- [provide / inject](https://cn.vuejs.org/v2/api/#provide-inject) *****

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

- `slot`插槽

- 路由传参 `/page/123` 可是使用 `props:['id']`拿 `this.id === 123`

- [命名视图]( https://router.vuejs.org/zh/guide/essentials/named-views.html )（使用name进行区分）

  有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

  ```html
  <router-view class="view one"></router-view>
  <router-view class="view two" name="a"></router-view>
  <router-view class="view three" name="b"></router-view>
  ```

  一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

  ```js
  const router = new VueRouter({
    routes: [
      {
        path: '/',
        components: {
          default: Foo,
          a: Bar,
          b: Baz
        }
      }
    ]
  })
  ```

- 组件内的守卫

  ```js
  export default {
      beforeRouteEnter (to, from, next) {
          // 在渲染该组件的对应路由被 confirm 前调用
          // 不！能！ 获取组件实例 this
          // 因为当守卫执行前，组件实例还没有被创建
      },
      beforeRouteUpdate(to, from, next){
          // 在当前路由改变，但该组件被复用时调用
          // 举例来说，对于一个带有动态参数的路径 /foo/:id 在 /foo/1 和 /foo/2 之间跳转的时候
          // 由于会渲染同样的FOO组件，因此组件实例会被复用，而这个钩子会在这个情况下被调用。
          // 可以访问组件实例 this
      },
      beforeRouteLeave (to, from, next) {
          // 导航离开该组件的对应路由时调用
          // 可以访问组件实例 this
          // 通常用来禁止用户在还未保存修改前突然离开。该导航可以用过next（false）来取消
      }
  }
  
  ```

- `vuex mapActions`

  将两者进行映射 简化代码

 你在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）： 

  ```js
import { mapActions } from 'vuex'
  
export default {
    // ...
    methods: {
      ...mapActions([
        'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
  
        // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
	    ]),
	    ...mapActions({
	      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
	    })
	  }
	}

  ```

## Vue源码解析

![vue](F:\Rain\KaiKeBa-study\img\vue.png)

简化：

![vue-simple](F:\Rain\KaiKeBa-study\img\vue-simple.png)

## Vue项目实战

- 权限控制

```js
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要登录
    const token = localStorage.getItem('test-token')
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
  } else {
    next()
  }
})

```

```js
// 用户拦截请求和响应

import axios from 'axios'

export default function(vm){
    // 设置请求拦截器
    axios.interceptors.request.use(config => {
        // 获取token
        const token = localStorage.getItem('token')
        if (token) { // 如果存在令牌这添加token请求头
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    })

    // 响应拦截器
    // 参数1表示成功响应
    // 这里只关心失败响应
    axios.interceptors.response.use(null, err => {
        if (err.response.status === 401) { // 没有登录或者令牌过期
          // 清空vuex和localstorage
          vm.$store.dispatch("logout");
          // 跳转login
          vm.$router.push("/login");
        }
        return Promise.reject(err);
      });
}

```

```js
const Koa = require("koa");
const Router = require("koa-router");
// 生成令牌、验证令牌
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");

// 生成数字签名的秘钥
const secret = "it's a secret";

const app = new Koa();
const router = new Router();

router.get("/api/login", async ctx => {
  const { username, passwd } = ctx.query;
  console.log(username, passwd);

  if (username == "kaikeba" && passwd == "123") {
    // 生成令牌
    const token = jwt.sign(
      {
        data: { name: "kaikeba" }, // 用户信息数据
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
      },
      secret
    );
    ctx.body = { code: 1, token };
  } else {
    ctx.status = 401;
    ctx.body = { code: 0, message: "用户名或者密码错误" };
  }
});

router.get(
  "/api/userinfo",
  jwtAuth({ secret }),
  async ctx => {
    ctx.body = { code: 1, data: { name: "jerry", age: 20 } };
  }
);
app.use(router.routes());
app.listen(3000);

```

- bearer token

  > Authorization: Bearer <token>

- jwt

  > head.payload.hash
  >
  > head:type,alr
  >
  > payload：josn
  >
  > hash

## React

### install

` npm install -g create-react-app  `

`create-react-app  [appname]`

`npm run start`

### 两种组件形式

函数型组件 | 基于类组件

```jsx
import React from 'react'

// 函数类型组件
// 一般只进行值的显示 不进行复杂的业务逻辑
// 单项数据流

export function CompType1(props) {
  return <div>CompType1,{props.name}</div>
}

// 基于类组件
// 必须要用 render 函数
// 复杂的业务逻辑
// 双向数据流

export class CompType2 extends React.Component {
  render() {
    return <div>CompType2,{this.props.name}</div>
  }
}

```

简单应用

```jsx
import React, { Component } from 'react'

export default class Clock extends Component {
    // 状态固定名字
  state = {
    date: new Date()
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return <div>{this.state.date.toLocaleTimeString()}</div>
  }
}
```

### state 和 setSate (状态)

```jsx
import React, { Component } from 'react'

class StateTest extends Component {
  //状态初始化一般放到构造器中
  constructor(props) {
    super(props)
    this.state = { counter: 1 }
  }

  //组件挂载前
  componentDidMount() {
    //函数式写法(推荐)
    this.setState((prevState) => {
        return {
          counter: prevState.counter + 1
        }
      })
    this.setState((prevState, props) => {
      return {
        counter: prevState.counter + 1
      }
    })
  }

  render() {
    return <div>{this.state.counter}</div>
  }
}

export default StateTest

```

### 条件渲染 & 列表渲染 & 事件 & 组件间数据传递

点击事件传值 默认传递的事event 所以要用箭头函数进行传值

`<button onClick={_ => this.addToCart(good)}>加购</button>`或

`<button onClick={_ => this.addToCart(good,_)}>加购</button>`或

`<button onClick={() => this.addToCart(good,_)}>加购</button>`

组件间传值 可以传递数据 也可以传递方法

` <Cart data={this.state.cart} add={this.add} minus={this.minus}></Cart>`

ps: react提倡不直接修改数据

```jsx
import React, { Component } from 'react'
import Cart from './Cart'

class CartSample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      good: [
        { id: 1, text: 'aaaaaa' },
        { id: 2, text: 'bbbbbbbb' }
      ],
      text: '',
      cart: []
    }
    this.addGood = this.addGood.bind(this) //添加商品

    //Cart组件
    this.addToCart = this.addToCart.bind(this) //添加至购物车
    this.minus = this.minus.bind(this) //购物车-
    this.add = this.add.bind(this) //购物车+
  }

  textChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  // 添加商品 (推荐在上面this绑定)
  addGood() {
    this.setState(prevState => {
      return {
        good: [
          ...prevState.good,
          {
            id: prevState.good.length + 1,
            text: prevState.text
          }
        ]
      }
    })
  }

  addToCart(good) {
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === good.id)
    const item = newCart[idx]
    if (item) {
      newCart.splice(idx, 1, { ...item, count: item.count + 1 })
    } else {
      newCart.push({ ...good, count: 1 })
      console.log(newCart)
    }

    this.setState({
      cart: newCart
    })
  }

  minus(id) {
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === id)
    const item = newCart[idx]
    if (item.count === 1) {
      newCart.splice(idx, 1)
    } else {
      newCart.splice(idx, 1, { ...item, count: item.count - 1 })
    }

    this.setState({
      cart: newCart
    })
  }

  add(id) {
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === id)
    const item = newCart[idx]
    newCart.splice(idx, 1, { ...item, count: item.count + 1 })

    this.setState({
      cart: newCart
    })
  }

  render() {
    // const title = this.props.title ? <h1>this.props.title</h1> : null

    return (
      <div>
        {/* 短路逻辑写条件渲染 */}
        {this.props.title && <h1>this.props.title</h1>}

        {/* 列表渲染 */}
        <div>
          <input
            type="text"
            value={this.state.text}
            onChange={this.textChange}
          />
          <button onClick={this.addGood}>添加</button>
        </div>
        <ul>
          {this.state.good.map(good => (
            <li key={good.id}>
              {good.text}

              <button onClick={_ => this.addToCart(good)}>加购</button>
            </li>
          ))}
        </ul>

        {/* 购物车 */}
        <Cart data={this.state.cart} add={this.add} minus={this.minus}></Cart>
      </div>
    )
  }
}

export default CartSample

```

### 生命周期

可以通过此图更直观了解流程，具体生命周期看官网

![shewn](./img/reaact生命周期.png)

此处版本：16.12

#### 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- [`constructor()`](https://react.docschina.org/docs/react-component.html#constructor)
- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [`render()`](https://react.docschina.org/docs/react-component.html#render)
- [`componentDidMount()`](https://react.docschina.org/docs/react-component.html#componentdidmount)

> 注意:
>
> 下述生命周期方法即将过时，在新代码中应该[避免使用它们](https://react.docschina.org/blog/2018/03/27/update-on-async-rendering.html)：
>
> - [`UNSAFE_componentWillMount()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillmount)

#### 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)
- [**`render()`**](https://react.docschina.org/docs/react-component.html#render)
- [`getSnapshotBeforeUpdate()`](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](https://react.docschina.org/docs/react-component.html#componentdidupdate)

> 注意:
>
> 下述方法即将过时，在新代码中应该[避免使用它们](https://react.docschina.org/blog/2018/03/27/update-on-async-rendering.html)：
>
> - [`UNSAFE_componentWillUpdate()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillupdate)
> - [`UNSAFE_componentWillReceiveProps()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillreceiveprops)

#### 卸载

当组件从 DOM 中移除时会调用如下方法：

- [**`componentWillUnmount()`**](https://react.docschina.org/docs/react-component.html#componentwillunmount)

#### 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- [`static getDerivedStateFromError()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromerror)
- [`componentDidCatch()`](https://react.docschina.org/docs/react-component.html#componentdidcatch)

### ant-design 组件库

#### 安装

```bash
 yarn add antd 
 npm install antd --save 
```

#### 引入

```js
// 在app.css引入  或在app.js中引入
@import '~antd/dist/antd.css'; || import 'antd/dist/antd.css'

//按需引入组件
import { Button } from 'antd';     
```

##### 按需加载

参考：[https://ant.design/docs/react/use-with-create-react-app-cn](https://ant.design/docs/react/use-with-create-react-app-cn#高级配置) 

```bash
yarn add react-app-rewired customize-cra babel-plugin-import
```
根目录下新建：config-overrides.js


```js
const { override, fixBabelImports } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)

```

修改 package.json 的脚本

```json
"dev": "react-app-rewired start",
"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test"
```

直接引入组件  无需引入 css 文件

```js
 import { Button } from 'antd'; 
```

#### 容器组件 VS 展示组件

基本原则：容器组件负责数据获取，展示组件负责根据props显示信息

优势

1、工作、展示分离

2、复用性高

3、更高的可用性

4、更易于测试

```jsx
import React, { Component } from "react";

// 容器组件
export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        comments: [
          { body: "react is very good", author: "facebook" },
          { body: "vue is very good", author: "youyuxi" }
        ]
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => (
          <Comment key={i} data={c} />
        ))}
      </div>
    );
  }
}
// 展示组件
function Comment({data}){
  return (
    <div>
      <p>{data.body}</p>
      <p> --- {data.author}</p>
    </div>
  );
});
```

#####   PureComponent纯组件

  定制了shouldComponentUpdate后的Component（浅比较）  

  class Comp extends React.PureComponent {}  

#####   React.memo纯组件（函数式写法）  

  React v16.6.0 之后的版本，可以使用 React.memo 让函数式的组件也有PureComponent的功能  

```js
// memo高阶组件
const Comment = React.memo(function(props) {
  console.log("render Comment"); //打印两次

  return (
    <div>
      <p>{props.body}</p>
      <p> --- {props.author}</p>
    </div>
  );
});
```

#### 高阶组件

> 官网：[ https://react.docschina.org/docs/higher-order-components.html ]( https://react.docschina.org/docs/higher-order-components.html )

在React里就有了HOC（Higher-Order Components）的概念  

高阶组件也是一个组件，但是他返回另外一个组件，产生新的组件可以对属性进行包装，甚至重写部分生命周期  

```jsx
import React, { Component } from 'react'

// 一个简单组件
function Show(props) {
  return (
    <div>
      {props.stage}- {props.name}
    </div>
  )
}

// 高阶组件  接收一个组件 并 返回一个组件
const withShow = Comp => {
  const name = '高阶组件'

  // 简单形式
  // return props => <Comp {...props} name={name}></Comp>

  // 类形式  可以重写生命周期
  return class NewComp extends React.Component {
    componentDidMount() {
      console.log('do something')
    }

    render() {
      return <Comp {...this.props} name={name}></Comp>
    }
  }
}

const NewShow = withShow(Show)

class Hoc extends Component {
  render() {
    return (
      <div>
        <NewShow stage="React"></NewShow>
      </div>
    )
  }
}

export default Hoc

```

##### 高阶组件链式调用

31行

```jsx 
import React, { Component } from 'react'

function Show(props) {
  return (
    <div>
      {props.stage}- {props.name}
    </div>
  )
}

const withShow = Comp => {
  const name = '高阶组件'

  return class NewComp extends React.Component {
    componentDidMount() {
      console.log('do something')
    }

    render() {
      return <Comp {...this.props} name={name}></Comp>
    }
  }
}

const withLog = Comp => {
  console.log(Comp.name + '渲染了')
  return props => <Comp {...props}></Comp>
}

// 可以链式调用 打印：Show渲染了 NewComp渲染了
const NewShow = withLog(withShow(withLog(Show)))

class Hoc extends Component {
  render() {
    return (
      <div>
        <NewShow stage="React"></NewShow>
      </div>
    )
  }
}

export default Hoc

```

##### 高阶组件装饰器写法  

  ES7装饰器可用于简化高阶组件写法  

`yarn add react-app-rewired customize-cra`

`  yarn add -D @babel/plugin-proposal-decorators  `

config-overrides.js配置：

```js
const { override, fixBabelImports,addDecoratorsLegacy } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addDecoratorsLegacy({ legacy: true })
)
```

高阶组件装饰器写法：

```jsx
// 高阶组件装饰器写法
import React, { Component } from 'react'

const withShow = Comp => {
  const name = '高阶组件'

  return class NewComp extends React.Component {
    componentDidMount() {
      console.log('do something')
    }

    render() {
      return <Comp {...this.props} name={name}></Comp>
    }
  }
}

const withLog = Comp => {
  console.log(Comp.name + '渲染了')
  return props => <Comp {...props}></Comp>
}

// 修饰器进行修饰 应用组件直接使用 <Show></Show>
@withLog
@withShow
@withLog
class Show extends Component {
  render() {
    return (
      <div>
        {this.props.stage}- {this.props.name}
      </div>
    )
  }
}

// 修饰后这行代码就可以注释掉了
// const NewShow = withLog(withShow(withLog(Show)))

class Hoc extends Component {
  render() {
    return (
      <div>
        <Show stage="React"></Show>
      </div>
    )
  }
}

export default Hoc

```

##### 复合组件

```jsx
import React from "react";

// Dialog作为容器不关心内容和逻辑
// 等同于vue中slot
function Dialog(props) {
  return (
    <div style={{ border: `4px solid ${props.color || "blue"}` }}>
      {props.children}
      <div className="footer">
        {/* 具名插槽 */}
        {props.footer}
        </div>
    </div>
  );
}

// WelcomeDialog通过复合提供内容
function WelcomeDialog(props) {
  return (
    <Dialog {...props}>
      <h1>欢迎光临</h1>
      <p>感谢使用react</p>
    </Dialog>
  );
}

const Api = {
  getUser() {
    return { name: "jerry", age: 20 };
  }
};

function Fetcher(props) {
  const user = Api[props.name]();
  return props.children(user);
}

function Filter({ children, type }) {
  return (
    <div>
      {React.Children.map(children, child => {
        if (child.type !== type) {
          return;
        }
        return child;
      })}
    </div>
  );
}

// 修改children
function RadioGroup(props) {
  return (
    <div>
      {React.Children.map(props.children, child => {
        //   vdom不可更改，克隆一个新的去改才行
        return React.cloneElement(child, { name: props.name });
      })}
    </div>
  );
}

function Radio({children, ...rest}) {
  return (
    <label>
      <input type="radio" {...rest} />
      {children}
    </label>
  );
}

export default function() {
  const footer = <button onClick={() => alert("确定！")}>确定</button>;

  return (
    <div>
      {/* <WelcomeDialog color="green" footer={footer} /> */}
      {/* <Fetcher name="getUser">
        {({ name, age }) => (
          <p>
            {name}-{age}
          </p>
        )}
      </Fetcher> */}
      {/* 过滤器，可以过滤出指定标签类型 */}
      {/* <Filter type="p">
        <h1>react</h1>
        <p>react很不错</p>
        <h1>vue</h1>
        <p>vue很不错</p>
      </Filter> */}

      <RadioGroup name="mvvm">
        <Radio value="vue">vue</Radio>
        <Radio value="react">react</Radio>
        <Radio value="react">angular</Radio>
      </RadioGroup>
    </div>
  );
}
```

