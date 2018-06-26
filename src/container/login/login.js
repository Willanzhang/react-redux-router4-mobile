import React from 'react'
import './login.styl'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import Logo from 'component/logo/logo'
import { connect } from 'react-redux'
import { login } from 'src/store/actions/user'
import { Redirect } from 'react-router-dom'
import Form from 'component/form/form'

// function WrapperHello(Comp) {
//   // class WarpComp extends React.Component {
//   class WarpComp extends Comp {
//     componentDidMount() {
//       console.log('高阶组件新增的生命周期，加载完成')
//     }
//     render() {
//       return <div>
//         <p>这是HOC高阶组建特有的元素</p>
//         <Comp {...this.props}></Comp>
//       </div>
//     }
//   }
//   return WarpComp
// }
// @WrapperHello
// class Hello extends React.Component {
//   componentDidMount() {
//     console.log('这是hello里面的')
//   }
//   render() {
//     return <div>
//       hello l love react redux code
//     </div>
//   }
// }
// Hello = WrapperHello(Hello)

@connect(
  state => state.user,
  { login }
)
@Form
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }
  register() {
    console.log(this.props, 'register')
    this.props.history.push('./register')
  }
  login() {
    this.props.login({...this.props.state})
    //  this.props.history.push('./bossInfo')
  }
  render() {
    return (
      <WingBlank>
        {this.props.redirectTo.length && this.props.redirectTo !== '/login' ?
          <Redirect to={this.props.redirectTo} /> :
          null}
        <Logo></Logo >
        <List>
          <p className="errMsg">{this.props.msg}</p>
          <InputItem onChange={(v) => this.props.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem onChange={(v) => this.props.handleChange('pwd', v)} type="password">密码</InputItem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={this.login}>登录</Button>
        <WhiteSpace />
        <Button type="primary" onClick={this.register}>注册</Button>
      </WingBlank>
    )
  }
}
export default Login