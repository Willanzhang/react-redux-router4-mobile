import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from 'src/store/actions/chat'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import UserCard from 'component/userCard/userCard'
import './genius.styl'
import axios from 'axios'
@connect(state=> state.chatUser, {getUserList})
class Genius extends React.Component{
  componentDidMount () {
    this.props.getUserList('boss')
  }
  render() {
    const {Header, Body} = Card
    return <div className="genius">
      <UserCard
        userList={this.props.userList}
      />
    </div>
  }
}
export default Genius