import React from 'react'
import Logo from 'component/logo/logo'
import { List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from 'src/store/actions/user'
@connect(state => ({
  user: state.user
}), {
  register
})
 class Register extends React.Component{
   state = {
     type: 'genius',
     user: '',
     pwd: '',
     repeatpwd: ''
   }
   constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
   }
   handleChange (key, v) {
     this.setState({
       [key]: v
     })
   }
   handleRegister () {
     console.log(this.state)
     this.props.register(this.state)
   }
   componentWillMount() {
     console.log(this.props.user, 'this.props.user')
  }
   render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
      <Logo/>
      <List>
        {this.props.user.msg}
        <InputItem 
          onChange={(v) => this.handleChange('user',v)}>用户名</InputItem>
        <WhiteSpace/>
        <InputItem
          type="password"
          onChange={(v) => this.handleChange('pwd',v)}>密码</InputItem>
        <WhiteSpace/>
        <InputItem
          type="password"
          onChange={(v) => this.handleChange('repeatpwd',v)}>确认密码</InputItem>
        <WhiteSpace/>
        <RadioItem 
          checked={this.state.type == 'genius'}
          onChange={(v) => this.handleChange('type','genius')}
        >牛人</RadioItem>
        <RadioItem 
          checked={this.state.type == 'boss'}
          onChange={(v) => this.handleChange('type','boss')}
          >BOSS</RadioItem>
        <WhiteSpace/>
        <Button type="primary" onClick={this.handleRegister}>注册</Button>
      </List>
      </div>
    )
   }
 }
 export default Register