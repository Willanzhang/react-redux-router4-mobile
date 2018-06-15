import React from 'react'
import Logo from 'component/logo/logo'
import { List, InputItem, WhiteSpace} from 'antd-mobile'

 class Register extends React.Component{
   render() {
     return (
       <div>
        <Logo/>
        <h2> 注册页</h2>
        <List>
          <InputItem>用户名</InputItem>
          <InputItem>密码</InputItem>
          <InputItem>确认密码</InputItem>
          <WhiteSpace/>
          <InputItem>密码</InputItem>
        </List>
       </div>
     )
   }
 }
 export default Register