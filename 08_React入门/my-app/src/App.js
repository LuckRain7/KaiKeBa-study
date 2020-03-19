import React from 'react'
import logo from './logo.svg'
import './App.css'
import { CompType1, CompType2 } from './components/CompType'
import Clock from './components/Clock'
import StateTest from './components/StateTest'
import CartSample from './components/CartSample.jsx'
import Lifecycle from './components/Lifecycle'

function App() {
  const name = 'tom'
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.{name}
        </p>
        <CompType1 name="CompType1"></CompType1>
        <CompType2 name="CompType1"></CompType2>
        <Clock></Clock>
        <StateTest></StateTest>
        <CartSample></CartSample>
        <Lifecycle></Lifecycle>
      </header>
    </div>
  )
}

export default App
