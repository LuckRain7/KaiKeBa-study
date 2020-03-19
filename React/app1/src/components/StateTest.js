import React, { Component } from 'react'

class StateTest extends Component {
  //状态初始化一般放到构造器中
  constructor(props) {
    super(props)
    this.state = { counter: 1 }
  }

  //组件挂载前
  componentDidMount() {
    //函数式写法(推荐)
    this.setState((prevState) => {
        return {
          counter: prevState.counter + 1
        }
      })
    this.setState((prevState, props) => {
      return {
        counter: prevState.counter + 1
      }
    })
  }

  render() {
    return <div>{this.state.counter}</div>
  }
}

export default StateTest
