import React from 'react'
import './authRoute.styl'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { register } from 'src/store/actions/user'
@withRouter

class AuthRoute extends React.Component{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('user/info').
      then(res => {
        if (res.status === 200) {
          console.log(res)
          if (res.data.errCode === 0) {
            // 有登录信息
          } else {
            console.log(this.props.history, 'this.props.histroy')
            this.props.history.push('/login')
          }
        }
      })
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