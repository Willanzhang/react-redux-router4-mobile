import React from 'react'
// import './login.styl'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
import Logo from 'component/logo/logo'
import { connect } from 'react-redux'
import { login } from 'src/store/actions/user'
import { Redirect } from 'react-router-dom'
@connect(
  state => state.user,
  {login}
)
 class Login extends React.Component{
   constructor(props) {
     super(props)
     this.register = this.register.bind(this)
     this.login = this.login.bind(this)
   }
   register() {
     console.log(this.props, 'register')
     this.props.history.push('./register')
   }
   handleChange(key, val) {
     this.setState({
       [key]: val
     })
   }
   login() {
     const {user, pwd} = this.state
     this.props.login({user,pwd})
    //  this.props.history.push('./bossInfo')
   }
   render() {
     return(
        <WingBlank>
        {this.props.redirectTo.length && this.props.redirectTo !== '/login' ?
        <Redirect to={this.props.redirectTo} /> :
					null}
         <Logo></Logo >
          <List>
            <WhiteSpace/>
            <InputItem onChange={(v)=>this.handleChange('user',v)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem onChange={(v)=>this.handleChange('pwd',v)} type="password">密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.login}>登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
     )
   }
 }
 export default Login