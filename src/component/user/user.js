import React from 'react'
import { connect } from 'react-redux'
import { WhiteSpace, WingBlank, Result, List } from 'antd-mobile'
import './user.styl'
@connect(state=> state.user)
class UserCenter extends React.Component{
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item
    return <div className="userCenter">
      <Result
        img={<img src={require(`./imgs/${props.avatar}.png`)} style={{width: '0.5rem'}} alt={props.avatar}/>}
        title = {props.user}
        message = {props.type === 'boss'?props.company: null}
      ></Result>
      <List renderHeader={() => '简介'}>
        <Item
          multipleLine
        >
          {props.title}
          {props.desc.split('/n').map( (v, i) =><Brief key={i}>{v}</Brief>)}
          {props.money? <Brief>薪资：{props.money}</Brief>: null}
        </Item>        
      </List>

      <WhiteSpace></WhiteSpace> 
      <List>
        <Item>
          退出登录
        </Item>
      </List>
    </div>
  }
}
export default UserCenter