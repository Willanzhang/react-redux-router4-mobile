import React from 'react'
import Logo from 'component/logo/logo'
import { List, InputItem, WhiteSpace, Radio } from 'antd-mobile'

 class Register extends React.Component{
   state = {
     type: 'genius'
   }
   constructor(props) {
    super(props)
   }
   componentWillMount() {
  }
   render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
      <Logo/>
      <h2> 注册页</h2>
      <List>
        <InputItem>用户名</InputItem>
        <WhiteSpace/>
        <InputItem>密码</InputItem>
        <WhiteSpace/>
        <InputItem>确认密码</InputItem>
        <WhiteSpace/>
        <RadioItem checked={this.state.type == 'genius'}>牛人</RadioItem>
        <RadioItem checked={this.state.type == 'boss'}>BOSS</RadioItem>
        <WhiteSpace/>
        <InputItem>密码</InputItem>
      </List>
      </div>
    )
   }
 }
 export default Register