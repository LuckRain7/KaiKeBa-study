// 高阶组件装饰器写法

import React, { Component } from 'react'

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
