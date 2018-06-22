import React from 'react'
import './authRoute.styl'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userInfo } from 'src/store/actions/user'
// import { register } from 'src/store/actions/user'
@withRouter
@connect(null,{userInfo})
class AuthRoute extends React.Component {
  constructor(props) {
    super(props)
    this.redirectToLogin = this.redirectToLogin.bind(this)
  }
  redirectToLogin() {
    this.props.history.push('/login')
  }
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    } else {
      this.props.userInfo(this.redirectToLogin)
    }
    // 获取用户信息
    
    //  是否登录
    //  现在的url 地址 login 是不需要跳转的
    //  用户的type 身份是boss 还是牛人
    //  用户是否完善信息 （选择头像 个人简介）
  }
  render() {
    return <div>
    </div>
  }
}
export default AuthRoute