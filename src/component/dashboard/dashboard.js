import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { TabBar, NavBar } from 'antd-mobile'
import NavLinkBar from 'component/navLink/navLink'
import Boss from 'component/boss/boss'
import Genius from 'component/genius/genius'
import { connect } from 'react-redux'

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
    const hehe = [1,2,3,4,5]
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
      <NavBar className="fixd-header" mode='dard'>{navList.find(v => v.path===pathname) && navList.find(v => v.path===pathname).title }</NavBar>
      <div style={{marginTop: 45}}>
        <Switch>
          {navList.map(v => 
            (<Route key={v.path} path={v.path} component={v.component}></Route>)
          )}
        </Switch>
      </div>
      <NavLinkBar
        data={navList}
      />
    </div>
  }
}
export default Dashboard