import React from 'react'
import logo from './logo.svg'
import './App.css'
import AntdTest from './components/AntdTest'
import CommentList from './components/CommentList.jsx'
// import Hoc from './components/Hoc'
import Hoc2 from './components/Hoc2'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <AntdTest></AntdTest>
        <CommentList></CommentList>
        {/* <Hoc></Hoc> */}
        <Hoc2></Hoc2>
      </header>
    </div>
  )
}

export default App
