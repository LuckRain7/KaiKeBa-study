/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import { Input, Button } from 'antd'

// 创建一个高阶组件：扩展现有表单，事件处理、数据收集、校验
function MyFormCreate(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.options = {}
      this.state = {}
    }

    handleChange = e => {
      const { name, value } = e.target
      console.log(name, value)

      this.setState({ [name]: value }, () => {
        // 确保值发生变化再校验
        this.validateField(name)
      })
    }

    // 校验
    validateField = field => {
      // 获取校验规则
      const rules = this.options[field].rules

      // 任意一项失败则返回false
      const ret = !rules.some(rule => {
        //   判断是否需要校验
        if (rule.require) {
          if (!this.state[field]) {
            // 校验失败
            this.setState({
              [field + 'Message']: rule.message
            })
            return true
          }
        }
      })

      if (ret) {
        this.setState({
          [field + 'Message']: ''
        })
      }

      return ret
    }

    // 校验所有字段
    validate = cb => {
      const rets = Object.keys(this.options).map(field => {
        return this.validateField(field)
      })

      const ret = rets.every(v => v === true)

      cb(ret, this.state)
    }

    // 创建input 包装器
    getFieldDec = (field, option) => {
      // 保存当前输入项的配置
      this.options[field] = option

      // 状态提升 进行包装
      return InputComp => (
        <div>
          {React.cloneElement(InputComp, {
            name: field,
            value: this.state[field],
            onChange: this.handleChange
          })}
          {/* 校验错误信息 */}
          {this.state[field + 'Message'] && (
            <p style={{ color: 'red' }}>{this.state[field + 'Message']}</p>
          )}
        </div>
      )
    }

    render() {
      // 通过 validate={this.validate} 将这个属性暴露给下面的组件
      return (
        <Comp getFieldDec={this.getFieldDec} validate={this.validate}></Comp>
      )
    }
  }
}

// 修饰器  使用高阶组件进行包装
@MyFormCreate
class RainForm extends Component {
  onSubmit = () => {
    console.log('onSubmit')
    // 校验所有字段
    this.props.validate((isValid, data) => {
      if (isValid) {
        console.log('登录成功', data)
      } else {
        console.log('登false')
      }
    })
  }

  render() {
    const { getFieldDec } = this.props
    return (
      <div>
        {getFieldDec('uname', {
          rules: [{ require: true, message: '用户名必填' }]
        })(<Input />)}

        {getFieldDec('pwd', {
          rules: [{ require: true, message: '密码必填' }]
        })(<Input type="password" />)}

        <Button onClick={this.onSubmit}>login</Button>
      </div>
    )
  }
}

export default RainForm
