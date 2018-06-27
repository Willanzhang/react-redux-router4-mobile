import React from 'react'
import io from 'socket.io-client'
import { InputItem, List } from 'antd-mobile'
import { getQuery } from 'common/utils.js'
import './chat.styl'
// 由于当前是跨域  前端端口是3000 后端是9093 需要手动连接  否则 可以直接 io()
const socket = io('ws://localhost:9093')

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', msg: [] }
  }
  handleSubmit() {
    socket.emit('sendmsg', { text: this.state.text })
    console.log(this.state.text)
    this.setState({ text: '' })
  }
  componentDidMount() {
    getQuery('name')
    socket.on('recvmsg', (data)=>{
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    })
  }
  render() {
    return <div>
      {this.state.msg.map((v, i) => {
        return <p key={i}>{v}</p>
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