import React from 'react'

// function Cart(props) {
function Cart({ data, minus, add }) {
  return (
    <div>
      {data.map(good => {
        return (
          <p key={good.id}>
            {good.text}: {good.count}
            <button onClick={() => minus(good.id)}>-</button>
            <button onClick={() => add(good.id)}>+</button>
          </p>
        )
      })}
    </div>
  )
}

export default Cart
