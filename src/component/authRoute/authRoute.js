import React from 'react'
import './authRoute.styl'
import axios from 'axios'
 class AuthRoute extends React.Component{
   componentDidMount() {
     // 获取用户信息
    //  是否登录
    //  现在的url 地址 login 是不需要跳转的
    //  用户的type 身份是boss 还是牛人
    //  用户是否完善信息 （选择头像 个人简介）
    axios.get('user')
   }
   render() {
     return 
     <div className="logo">
        <img src="http://img1.imgtn.bdimg.com/it/u=3546315408,389669527&fm=27&gp=0.jpg" alt="" />
     </div>
   }
 }
 export default AuthRoute