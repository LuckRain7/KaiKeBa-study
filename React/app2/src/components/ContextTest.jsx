import React, { useContext } from 'react'

//创建上下文
const MyContext = React.createContext()

// 方法一 Consumer
const { Provider, Consumer } = MyContext

function Child(props) {
  return <div>child:{props.foo}</div>
}

// 方法二 hook消费
function Child2() {
  const ctx = useContext(MyContext)
  return <div>child2:{ctx.foo}</div>
}

// 方法三 使用class指定静态contentType

class Child3 extends React.Component {
  static contextType = MyContext
  render() {
    return <div>child3:{this.context.foo}</div>
  }
}

function ContxtTest(props) {
  return (
    <div>
      <Provider value={{ foo: 'bar' }}>
        {/* 消费方法1：Consumer */}
        <Consumer>{value => <Child {...value} />}</Consumer>
        {/* 消费方法2：hook */}
        <Child2></Child2>
        {/* 消费方法3：contentType */}
        <Child3></Child3>
      </Provider>
    </div>
  )
}

export default ContxtTest
