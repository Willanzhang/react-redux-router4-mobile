import React from 'react'
import { TabBar, NavBar } from 'antd-mobile'
import NavLinkBar from 'component/navLink/navLink'
import { connect } from 'react-redux'
function Boss () {
  return <h2>boss</h2>
}
function Genius () {
  return <h2>Genius</h2>
}
function Msg () {
  return <h2>msg</h2>
}
function User () {
  return <h2>User</h2>
}

@connect(state => state)
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    const { pathname } = this.props.location
    console.log(pathname)
    const user = this.props.user
    const navList = [
      {
        path:'/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path:'/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path:'/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path:'/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return <div className="dashboard">
      <NavBar className="fixd-header" mode='dard'>{navList.find(v => v.path===pathname).title}</NavBar>
      <NavLinkBar
        data={navList}
      />
    </div>
  }
}
export default Dashboard