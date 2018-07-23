import React from 'react'
import { Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLinkBar from 'component/navLink/navLink'
import Boss from 'component/boss/boss'
import Genius from 'component/genius/genius'
import Msg from 'component/message/message'
import { getMsgList, recvMsg } from 'src/store/actions/chat'

import User from 'component/user/user'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim'


@connect(state => state, { getMsgList, recvMsg })
class Dashboard extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render() {
    let { pathname } = this.props.location
    console.log(pathname)
    const user = this.props.user
    // const hehe = [1, 2, 3, 4, 5]
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    if (pathname === "/") {
      this.props.history.push('/me')
      return false
    }
    const page = navList.find(v => v.path === pathname)
    console.log(page, 'page------')
    return <div className="dashboard">
      <NavBar className="fixd-header" mode='dard'>{navList.find(v => v.path === pathname) && navList.find(v => v.path === pathname).title}</NavBar>
      <div style={{ marginTop: 45 }}>
      <QueueAnim type="scaleX" duration={800}>
        <Route key={page.path} path={page.path} component={page.component}></Route>
      </QueueAnim>
      </div>
      <NavLinkBar
        data={navList}
        />
    </div>
    // return <div className="dashboard">
    //   <NavBar className="fixd-header" mode='dard'>{navList.find(v => v.path === pathname) && navList.find(v => v.path === pathname).title}</NavBar>
    //   <div style={{ marginTop: 45 }}>
    //     <Switch>
    //       {navList.map(v =>
    //         (<Route key={v.path} path={v.path} component={v.component}></Route>)
    //       )}
    //     </Switch>
    //   </div>
    //   <NavLinkBar
    //     data={navList}
    //     />
    // </div>
  }
}
export default Dashboard