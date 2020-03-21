import React from 'react'
import './App.css'
import AntdTest from './components/AntdTest'
import CommentList from './components/CommentList.jsx'
// import Hoc from './components/Hoc'
import Hoc2 from './components/Hoc2'
import HookTest from './components/HookTest'
import ContextTest from './components/ContextTest'
import AntdForm from './components/AntdForm'
import MyForm from './components/MyForm'
import RouterExample from './components/RouterExample'
import RouterExampleRedux from './components/RouterExampleRedux'
import ReduxTest from './components/redux-study/ReduxTest'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        -----路由插件 +redux:------
        <br />
        <RouterExampleRedux></RouterExampleRedux>
        <div className="hr"></div>
        -----路由插件 react-router-dom:------
        <br />
        <RouterExample></RouterExample>
        <div className="hr"></div>
        -----自己制作form表单组件:------
        <br />
        <ReduxTest></ReduxTest>
        <div className="hr"></div>
        -----自己制作form表单组件:------
        <br />
        <MyForm></MyForm>
        <div className="hr"></div>
        -----antdfrom:------
        <br />
        <AntdForm></AntdForm>
        <div className="hr"></div>
        -----组件跨层级通信:------
        <br />
        <ContextTest></ContextTest>
        <div className="hr"></div>
        -----hook:------
        <br />
        <HookTest></HookTest>
        <div className="hr"></div>
        -----引入antd ui框架:------
        <AntdTest></AntdTest>
        <div className="hr"></div>
        <CommentList></CommentList>
        <div className="hr"></div>
        {/* <Hoc></Hoc> */}
        <Hoc2></Hoc2>
      </header>
    </div>
  )
}

export default App
