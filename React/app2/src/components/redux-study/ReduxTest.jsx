/*
 * @Author: LuckRain7
 * @Date: 2020-03-20 20:30:15
 * @Last Modified by: LuckRain7
 * @Last Modified time: 2020-03-21 21:58:22
 */

import React, { Component } from 'react'

import { connect } from 'react-redux'

import { add, minus, asyncAdd } from '../../store/count.redux.js'

const mapStateToProps = state => ({ num: state.counter })
const mapDispatchToProps = { add, minus, asyncAdd }

// 普通写法

// function ReduxTest({ num, add, minus }) {
//   return (
//     <div>
//       <p>{num}</p>
//       <button onClick={add}>+</button>
//       <button onClick={minus}>-</button>
//     </div>
//   )
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)

// 装饰器写法
@connect(mapStateToProps, mapDispatchToProps)
class ReduxTest extends Component {
  render() {
    const { num, add, minus, asyncAdd } = this.props
    return (
      <div>
        <p>{num}</p>
        <button onClick={add}>+</button>
        <button onClick={minus}>-</button>
        <button onClick={asyncAdd}>auto</button>
      </div>
    )
  }
}

export default ReduxTest
