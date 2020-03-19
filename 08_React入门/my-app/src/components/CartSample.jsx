import React, { Component } from 'react'
import Cart from './Cart'

class CartSample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      good: [
        { id: 1, text: 'aaaaaa' },
        { id: 2, text: 'bbbbbbbb' }
      ],
      text: '',
      cart: []
    }
    this.addGood = this.addGood.bind(this) //添加商品

    //Cart组件
    this.addToCart = this.addToCart.bind(this) //添加至购物车
    this.minus = this.minus.bind(this) //购物车-
    this.add = this.add.bind(this) //购物车+
  }

  textChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  // 添加商品 (推荐在上面this绑定)
  addGood() {
    this.setState(prevState => {
      return {
        good: [
          ...prevState.good,
          {
            id: prevState.good.length + 1,
            text: prevState.text
          }
        ]
      }
    })
  }

  addToCart(good) {
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === good.id)
    const item = newCart[idx]
    if (item) {
      newCart.splice(idx, 1, { ...item, count: item.count + 1 })
    } else {
      newCart.push({ ...good, count: 1 })
      console.log(newCart)
    }

    this.setState({
      cart: newCart
    })
  }

  minus(id) {
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === id)
    const item = newCart[idx]
    if (item.count === 1) {
      newCart.splice(idx, 1)
    } else {
      newCart.splice(idx, 1, { ...item, count: item.count - 1 })
    }

    this.setState({
      cart: newCart
    })
  }

  add(id) {
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === id)
    const item = newCart[idx]
    newCart.splice(idx, 1, { ...item, count: item.count + 1 })

    this.setState({
      cart: newCart
    })
  }

  render() {
    // const title = this.props.title ? <h1>this.props.title</h1> : null

    return (
      <div>
        {/* 短路逻辑写条件渲染 */}
        {this.props.title && <h1>this.props.title</h1>}

        {/* 列表渲染 */}
        <div>
          <input
            type="text"
            value={this.state.text}
            onChange={this.textChange}
          />
          <button onClick={this.addGood}>添加</button>
        </div>
        <ul>
          {this.state.good.map(good => (
            <li key={good.id}>
              {good.text}

              <button onClick={_ => this.addToCart(good)}>加购</button>
            </li>
          ))}
        </ul>

        {/* 购物车 */}
        <Cart data={this.state.cart} add={this.add} minus={this.minus}></Cart>
      </div>
    )
  }
}

export default CartSample
