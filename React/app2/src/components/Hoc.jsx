import React, { Component } from 'react'

function Show(props) {
  return (
    <div>
      {props.stage}- {props.name}
    </div>
  )
}

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

// 可以链式调用 打印：Show渲染了 NewComp渲染了
const NewShow = withLog(withShow(withLog(Show)))

class Hoc extends Component {
  render() {
    return (
      <div>
        <NewShow stage="React"></NewShow>
      </div>
    )
  }
}

export default Hoc
