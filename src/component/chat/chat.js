import React from 'react'
import { InputItem, List, NavBar } from 'antd-mobile'
import { getQuery } from 'common/utils.js'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from 'src/store/actions/chat'
import './chat.styl'
import io from 'socket.io-client'
// 由于当前是跨域  前端端口是3000 后端是9093 需要手动连接  否则 可以直接 io()
const socket = io('ws://localhost:9093')
@connect(state => state,{getMsgList, sendMsg, recvMsg})
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', msg: [] }
  }
  handleSubmit() {
    // socket.emit('sendmsg', { text: this.state.text})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    console.log({from, to, msg}, '999*');
    this.props.sendMsg({from, to, msg})
    this.setState({ text: '' })
  }
  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
    // getQuery('name')
    // socket.on('recvmsg', (data)=>{
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }
  render() {
    const user = this.props.user.user
    const _id = this.props.match.params.user
    return <div>
    <NavBar node="dark">
      { _id }
    </NavBar>
      {this.props.chat.chatmsg.map((v, i) => {
        return v.from === _id?(
          <p key={i._id}>对方发来的：{v.content}</p>
        ):(
          <p key={i._id}>我发的：{v.content}</p>
        )
      })}
      <div className="stick-footer">
        <List>
          <InputItem
            placeholder='请输入'
            value={this.state.text}
            onChange={v => this.setState({ text: v })}
            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            >信息
        </InputItem>
        </List>
      </div>
    </div>
  }
}
export default Chat