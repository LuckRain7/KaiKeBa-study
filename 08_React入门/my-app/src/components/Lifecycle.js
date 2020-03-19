import React, { Component } from 'react'
export default class Lifecycle extends Component {
  constructor(props) {
    super(props)
    // 常用于初始化状态
    console.log('1.组件构造函数执行')
    
  }


  componentDidMount() {
    // 组件已挂载，可进行状态更新操作
    console.log('3.组件已挂载')
  }

  
  shouldComponentUpdate() {
    // 组件是否需要更新，需要返回布尔值结果，优化点
    console.log('5.组件是否需要更新？')
    return true
  }

  componentDidUpdate() {
    // 组件更新
    console.log('7.组件已更新')
  }
  componentWillUnmount() {
    // 组件将要卸载, 可做清理工作
    console.log('8.组件将要卸载')
  }
  render() {
    console.log('2、组件渲染')
    return <div>生命周期探究</div>
  }
}
