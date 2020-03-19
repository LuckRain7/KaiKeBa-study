import React from 'react'

// 创建上下文
const MyContext = React.createContext()
const { Provider, Consumer } = MyContext

function Child(props) {
  return <div>child:{props.foo}</div>
}

function ContxtTest(props) {
  return (
    <div>
      <Provider value={{ foo: 'bar' }}>
        <Consumer>{value => <Child {...value} />}</Consumer>
      </Provider>
    </div>
  )
}

export default ContxtTest
