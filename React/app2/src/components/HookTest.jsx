import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

function HookTest(props) {
  // 单个状态
  const [count, setCount] = useState(0)

  // 副作用钩子会在每次渲染时都执行
  useEffect(() => {
    // document.title = `您点击了${count}`
    console.log('api调用')
  }, [])

  useEffect(() => {
    document.title = `您点击了${count}`
  }, [count])

  // 自定义钩子 可以调用其他钩子
  function useAge() {
    const [age, setAge] = useState(0)

    useEffect(() => {
      setTimeout(() => {
        setAge(30)
      }, 2000)
    })

    return age
  }

  // 多个状态
  // const [age] = useState(20)
  const age = useAge()
  const [fruit, setFruit] = useState('banana')
  const [input, setInput] = useState('')
  const [fruits, setFruits] = useState(['apple', 'banana'])

  return (
    <div>
      <p>点击了{count}次</p>
      <Button onClick={() => setCount(count + 1)}>点击</Button>
      <hr />
      <p>年龄:{age ? age : 'loading...'}</p>
      <p>水果:{fruit}</p>
      <p>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button onClick={() => setFruits([...fruits, input])}>添加</Button>
      </p>
      <ul>
        {fruits.map(f => (
          <li key={f} onClick={() => setFruit(f)}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HookTest
