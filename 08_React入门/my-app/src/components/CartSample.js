import React, { Component } from 'react'

class CartSample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      good: [
        { id: 1, text: 'aaaaaa' },
        { id: 2, text: 'bbbbbbbb' }
      ]
    }
  }
  render() {
    // const title = this.props.title ? <h1>this.props.title</h1> : null

    return (
      <div>
        {/* 短路逻辑写条件渲染 */}
        {this.props.title && <h1>this.props.title</h1>}

        {/* 列表渲染 */}
        <ul>
          {this.state.good.map(good => (
            <li key="good.id">{good.text}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CartSample
