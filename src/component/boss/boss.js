import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from 'src/store/actions/chat'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import './boss.styl'
import axios from 'axios'
@connect(state=> state.chatUser, {getUserList})
class Boss extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    this.props.getUserList()
  }
  render() {
    console.log(this.props.userList, 'userList')
    const {Header, Body} = Card
    return <div className="boss">
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userList.map(v => 
          v.avatar?
          (<Card key={v._id}>
            <Header
              title={v.user}
              thumb={require(`./imgs/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            ></Header>
            <Body>
            {v.desc.split('\n').map(v => 
              <div key={v}>{v}</div>
            )}</Body>
          </Card>): null
        )}

      </WingBlank>  
    </div>
  }
}
export default Boss