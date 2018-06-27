import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from 'src/store/actions/chat'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import UserCard from 'component/userCard/userCard'
import './boss.styl'
import axios from 'axios'
@connect(state=> state.chatUser, {getUserList})
class Boss extends React.Component{
  componentDidMount () {
    this.props.getUserList('genius')
    // console.log(queryString.parse(this.props.location.search), 'location')
  }
  render() {
    console.log(this.props.userList, 'userList')
    const {Header, Body} = Card
    return <div className="boss">
      <UserCard
        userList={this.props.userList}
      /> 
    </div>
  }
}
export default Boss