import React from 'react'
// import './login.styl'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
import Logo from 'component/logo/logo'
 class Login extends React.Component{
   constructor(props) {
     super(props)
     this.register = this.register.bind(this)
   }
   register() {
     console.log(this.props, 'register')
     this.props.history.push('./register')
   }
   render() {
     const RadioTiem = Radio.RadioItem
     return(
       <div>
         <Logo></Logo >  
         <h2> 登录页</h2>
         <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <WhiteSpace/>
            <InputItem>密码</InputItem>
          </List>
          <Button>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register}>注册</Button>
         </WingBlank>
       </div>
     )
   }
 }
 export default Login