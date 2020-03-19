import React from 'react'
// import './App.css'
import AntdTest from './components/AntdTest'
import CommentList from './components/CommentList.jsx'
// import Hoc from './components/Hoc'
import Hoc2 from './components/Hoc2'
import HookTest from './components/HookTest'
import ContextTest from './components/ContextTest'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        -----组件跨层级通信:------
        <br />
        <ContextTest></ContextTest>
        <hr />
        -----hook:------
        <br />
        <HookTest></HookTest>
        <hr />
        -----引入antd ui框架:------
        <AntdTest></AntdTest>
        <hr />
        <CommentList></CommentList>
        <hr />
        {/* <Hoc></Hoc> */}
        <Hoc2></Hoc2>
      </header>
    </div>
  )
}

export default App
