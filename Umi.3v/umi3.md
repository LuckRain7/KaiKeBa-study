# umi 3.0

## 1、安装

```bash
mkdir myapp && cd myapp
yarn create @umijs/umi-app
```

## 2、路由

### 约定路由（不推荐）

路由不需要权限管理时，可以使用约定路由，否则需自己配置路由

目录下文件：

```
.
└── pages
    └── users
        ├── _layout.tsx
        ├── index.tsx
        ├── [id].tsx
        └── list.tsx
```

生成路由：

```js
[
  { exact: false, path: '/users', component: '@/pages/users/_layout',
    routes: [
      { exact: true, path: '/users', component: '@/pages/users/index' },
      { exact: true, path: '/users/:id', component: '@/pages/users/[id]' },
      { exact: true, path: '/users/list', component: '@/pages/users/list' },
    ]
  }
]
```

> ps：
>
> 1、目录没有 _layout.tsx 时 不会生成 exact：false 的嵌套路由
>
> 2、同样文件夹也可以使用[Foldername]
>
> 3、约定404页面  404.tsx

###  自己配置路由

在根目录下的 `.umirc.ts` 自己配置路由，同时约定路由失效 

推荐文件位置  约定路由形式

```js
import { defineConfig } from 'umi';

export default defineConfig({
    routes: [
        { path: "/", component: "@/pages/index" },
        { path: "/login", component: "@/pages/login" },
        {
            path: "/user",
            component: "@/pages/user/_layout",
            routes: [
                { path: "/user/", component: "./user/index" },
                { path: "/user/:id", component: "./user/[id]" },
            ]
        },
        { component: "@/pages/404" }
    ]
});
```

### 路由传值

路由组件可通过 `props` 获取到以下属性，

- match，当前路由和 url match 后的对象，包含 `params`、`path`、`url` 和 `isExact` 属性
- location，表示应用当前出于哪个位置，包含 `pathname`、`search`、`query` 等属性
- history，同 [api#history](https://umijs.org/zh-CN/api#history) 接口
- route，当前路由配置，包含 `path`、`exact`、`component`、`routes` 等

### 路由跳转

使用 Link 组件

```js
import { Link } from 'umi';

export default () => (
  <div>
    <Link to="/users">Users Page</Link>
  </div>
);
```

使用 history.push()，history 可用于获取当前路由信息，

```js
import { history } from 'umi';

// history 栈里的实体个数
console.log(history.length);

// 当前 history 跳转的 action，有 PUSH、REPLACE 和 POP 三种类型
console.log(history.action);

// location 对象，包含 pathname、search 和 hash
console.log(history.location.pathname);
console.log(history.location.search);
console.log(history.location.hash);

// 跳转到指定路由
history.push('/list');

// 带参数跳转到指定路由
history.push('/list?a=b');
history.push({
  pathname: '/list',
  query: {
    a: 'b',
  },
});

// 跳转到上一个路由
history.goBack();
```

### 路由权限

### wrappers

- Type: `string[]`

配置路由的高阶组件封装。

路由表中为有权限的路由添加  wrappers 属性

```js
import { defineConfig } from 'umi';

export default defineConfig({
    routes: [
        { path: "/", component: "@/pages/index" },
        {
            path: "/admin",
            wrappers: [
                '@/wrappers/auth',
            ], component: "@/pages/admin"
        },
        { path: "/login", component: "@/pages/login" },
        {
            path: "/user",
            component: "@/pages/user/_layout",
            routes: [
                { path: "/user/", component: "./user/index" },
                { path: "/user/:id", component: "./user/[id]" },
            ]
        },
        { component: "@/pages/404" }
    ]
});

```

 然后在 `src/wrappers/auth` 中， 增加权限认证

```tsx
import React from 'react';
import { Redirect } from 'umi';

export default (props: any) => {
  const isLogin: boolean = Math.random() > 0.5 ? true : false;
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
```

## 3、引入Antd

### 安装

```bash
yarn add antd
yarn add @umijs/preset-react -D
```

### 使用

```tsx
import React from 'react';
import { Link } from 'umi';
import { Button } from 'antd';

export default () => {
  return (
    <div>
      <h1>Page index hello world</h1>

      <Button>
        <Link to="admin">admin</Link>
      </Button>
    </div>
  );
};
```



## 4、引入Dav

umi内置dav 直接使用即可

### 使用

创建文件夹  src/models

新建文件 src/models/goods.ts

这个 model 里：

- `namespace` 表示在全局 state 上的 key
- `state` 是初始值，在这里是空数组
- `reducers` 等同于 redux 里的 reducer，接收 action，同步更新 state

```js
export default {
    // model的命名空间，区分多个model
    namespace: 'goods',
    // 初始状态
    state: [{ title: 'javascript' }, { title: 'Golang' }],
    // 异步操作
    effects: {},
    // 更新状态
    reducers: {
        addGood(state, action) {
            return [...state, { title: action.title }]
        }
    },
};
```

在组件中使用 src\pages\goods.jsx

```jsx
import React from 'react';
import { connect } from 'dva';
import { Button, Card } from 'antd';

export default connect(
  state => ({
    goodsList: state.goods, //获取指定命名空间的模型状态
  }),
  {
    // action的type需要以命名空间为前缀+reducer名称
    addGood: title => ({
      type: 'goods/addGood',
      title,
    }),
  },
)(function({ goodsList, addGood }) {
  return (
    <div>
      <h1>Page goods</h1>
      {/* 商品列表 */}
      <div>
        {goodsList.map(good => {
          return (
            <Card key={good.title}>
              <div>{good.title}</div>
            </Card>
          );
        })}
        <div>
          <Button onClick={() => addGood('商品' + new Date().getTime())}>
            添加商品
          </Button>
        </div>
      </div>
    </div>
  );
});
```

### 异步使用

创建mock数据 mock\goods.js

```js
const data = [{ title: 'web全栈' }, { title: 'java架构师' }];

export default {
  // "method url": Object 或 Array
  //   "get /api/goods": { result: data },

  // "method url": (req, res) => {}
  'get /api/goods': function(req, res) {
    setTimeout(() => {
      res.json({ result: data });
    }, 1250);
  },
};
```

在dva中加入异步 src\models\good.ts

```ts
+ import axios from 'axios'

+ function getGoods() {
+    return axios.get('/api/goods')
+}


export default {
    // model的命名空间，区分多个model
    namespace: 'goods',
    // 初始状态
    // state: [{ title: 'javascript' }, { title: 'Golang' }],
    state: [],
    // 异步操作
    effects: {
+        *getList(actions, { call, put }) {
+            const res = yield call(getGoods)
+            yield put({ type: 'initGoods', payload: res.data.result })
+        }
    },
    // 更新状态
    reducers: {
        addGood(state, action) {
            return [...state, { title: action.title }]
        },
+        initGoods(state, action) {
+            return action.payload
+        }

    },
};

```

在组件中使用  src\pages\goods.jsx

使用hook useEffect接受异步

```jsx
import React from 'react';
import { connect } from 'dva';
import { Button, Card } from 'antd';
+ import { useEffect } from 'react';

export default connect(
  state => ({
+    loading: state.loading, //dva 可以通过loading空间获取加载状态
    goodsList: state.goods, //获取指定命名空间的模型状态
  }),
  {
    // action的type需要以命名空间为前缀+reducer名称
    addGood: title => ({
      type: 'goods/addGood',
      title,
    }),
+    getList: () => ({
+      type: 'goods/getList',
+    }),
  },
+)(function({ goodsList, addGood, getList, loading }) {
+  useEffect(() => {
+    getList();
+  }, []);
  return (
    <div>
      <h1>Page goods</h1>
      {/* 商品列表 */}
      <div>
        {/* 加载状态 */}
+        {loading.models.goods && <p>loading...</p>}
        {goodsList.map(good => {
          return (
            <Card key={good.title}>
              <div>{good.title}</div>
            </Card>
          );
        })}
        <div>
          <Button onClick={() => addGood('商品' + new Date().getTime())}>
            添加商品
          </Button>
        </div>
      </div>
    </div>
  );
});

```

## 5、一些问题

### （1）约定路由不自动添加问题

根目录下的.umirc.ts进行修改

```js
import { defineConfig } from 'umi';

export default defineConfig({
   //删除一下三行
-  routes: [
-    { path: '/', component: '@/pages/index' },
-  ],
});
```

