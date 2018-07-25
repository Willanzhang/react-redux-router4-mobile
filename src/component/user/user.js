import React from 'react'
import { connect } from 'react-redux'
import { WhiteSpace, Result, List, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import './user.styl'
import { logout } from '../../store/actions/user'
import { Redirect } from 'react-router-dom'
@connect(state => state.user, {
  logout
})
class UserCenter extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    // 添加确认窗口
    const alert = Modal.alert
    alert('注销', <div>是否退出登录</div>, [
      {
        text: '确定', onPress: () => {
          // 删除cookie
          browserCookie.erase('userId')
          // 刷新页面不能接受  可以清空rudex 数据 使其自动跳转
          // window.location.href = window.location.href
          this.props.logout()
        }
      },
      { text: '取消', onPress: () => console.log('取消') },
    ])
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user ? (
      < div className="userCenter" >
        <Result
          img={<img src={require(`./imgs/${props.avatar}.png`)} style={{ width: '0.5rem' }} alt={props.avatar} />}
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
          >
        </Result>
        <List renderHeader={() => '简介'}>
          <Item
            multipleLine
            >
            {props.title}
            {props.desc.split('/n').map((v, i) => <Brief key={i}>{v}</Brief>)}
            {props.money ? <Brief>薪资：{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>
            退出登录
        </Item>
        </List>
      </div >) : <Redirect to={props.redirectTo}></Redirect>

  }
}
export default UserCenter