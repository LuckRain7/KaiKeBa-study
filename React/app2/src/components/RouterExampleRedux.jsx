/* eslint-disable no-unused-vars */
/*
 * @Author: LuckRain7
 * @Date: 2020-03-21 13:17:55
 * @Last Modified by: LuckRain7
 * @Last Modified time: 2020-03-21 13:47:06
 */

import React from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { asyncLogin } from '../store/user.redux.js'

function Home(params) {
  return (
    <div>
      <h3>课程列表</h3>
      <ul>
        <li>
          <Link to="/detail/web">Web架构师</Link>
        </li>
        <li>
          <Link to="/detail/python">Python架构师</Link>
        </li>
      </ul>
    </div>
  )
}
// 当前用户信息
function About(params) {
  return (
    <div>
      <h3>个人信息</h3>
      <div>
        <Link to="/about/me">个人信息</Link>||||
        <Link to="/about/order">订单信息</Link>
      </div>
      {/* Switch只显示一个 */}
      <Switch>
        <Route path="/about/me" component={() => <div>me</div>}></Route>
        <Route path="/about/order" component={() => <div>order</div>}></Route>
        <Redirect to="/about/me"></Redirect>
      </Switch>
    </div>
  )
}
function NoMatch({ location }) {
  return <div>404,地址{location.pathname}不存在</div>
}

// 传递进来路由器对象
function Detail(props) {
  // 1\history 导航指令
  // 2\match 获取参数信息
  // 2\location 当前url信息
  console.log(props)

  return (
    <div>
      当前课程是：{props.match.params.course}
      <button onClick={props.history.goBack}>后退</button>
    </div>
  )
}

// 路由守卫
// 希望用法：<PrivaterRoute path="/about" component={}></PrivaterRoute>
// redux第一个更改
const PrivaterRoute = connect(state => ({ isLogin: state.user.isLogin }))(
  ({ component: Comp, isLogin, ...rest }) => {
    // 做认证
    // render 根据条件动态渲染组件
    return (
      <Route
        {...rest}
        render={props =>
          isLogin ? (
            <Comp></Comp>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { redirect: props.location.pathname }
              }}
            />
          )
        }
      ></Route>
    )
  }
)

// 登录组件
const Login = connect(
  state => ({
    isLogin: state.user.isLogin,
    loading: state.user.loading
  }),
  { asyncLogin }
)(function Login({ location, isLogin, asyncLogin, loading }) {
  const redirect = location.state.redirect || '/'

  if (isLogin) {
    return <Redirect to={redirect} />
  }
  return (
    <div>
      <p>用户登录</p>
      <hr />
      <Button onClick={asyncLogin} disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </Button>
    </div>
  )
})

function RouterExample(props) {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* 导航链接 */}
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/about">关于</Link>
            </li>
          </ul>
          <Switch>
            {/* 路由配置：路由及组件 */}
            <Route exact path="/" component={Home}></Route>
            <Route path="/detail/:course" component={Detail}></Route>
            <PrivaterRoute path="/about" component={About} />
            <Route path="/login" component={Login}></Route>
            {/* 404:没有path 必然匹配 */}
            <Route exact component={NoMatch}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default RouterExample
