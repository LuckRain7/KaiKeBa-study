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
