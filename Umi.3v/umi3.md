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
  const isLogin: boolean = Math.random > 0.5 ? true : false;
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
```





## 3、一些问题

### 约定路由不自动添加问题

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

