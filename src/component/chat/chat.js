import React from 'react'
import { InputItem, List, NavBar, Icon, Grid } from 'antd-mobile'
import { getChatId } from 'common/utils.js'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim'
import { getMsgList, sendMsg, recvMsg, readMsg } from 'src/store/actions/chat'
import './chat.styl'
// import io from 'socket.io-client'
// 由于当前是跨域  前端端口是3000 后端是9093 需要手动连接  否则 可以直接 io()
// const socket = io('ws://localhost:9093')
@connect(state => state, { getMsgList, sendMsg, recvMsg, readMsg })
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    }
    this.girdFix = this.girdFix.bind(this)
  }
  handleSubmit() {
    // socket.emit('sendmsg', { text: this.state.text})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    console.log({ from, to, msg }, '999*');
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    // getQuery('name')
    // socket.on('recvmsg', (data)=>{
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }
  componentWillUnmount() {
    // 简单操作 处理聊天中 未读消息数量控制
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }  
  girdFix() {
    // 处理grid bug： 需点击才扩展开
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }
  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋ 🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({ text: v }))
    const Item = List.Item
    // const user = this.props.user.user
    const userid = this.props.match.params.user
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    return <div>
      <NavBar
        node="dark"
        icon={<Icon type='left'></Icon>}
        onLeftClick={() => {
          this.props.history.goBack()
        } }
        >
        {users[userid].name}
      </NavBar>
      <QueueAnim type="left">
        {chatmsgs.map((v, i) => {
          const avatar = require(`./imgs/${users[v.from].avatar}.png`)
          return v.from === userid ? (
            <List key={v._id}>
              <Item
                thumb={avatar}
                >{v.content}</Item>
            </List>
          ) : (
              <List key={v._id}>
                <Item
                  id="chat-me"
                  extra={<img src={avatar} alt="头像"/>}
                  className="chat-me"
                  >{v.content}</Item>
              </List>
            )
        })}
      </QueueAnim>
        
      <div className="stick-footer">
        <List>
          <InputItem
            placeholder='请输入'
            value={this.state.text}
            onChange={v => this.setState({ text: v })}
            extra={
              <div>
                <span style={{ marginRight: '.15rem' }} onClick={() => { 
                  this.setState({ showEmoji: !this.state.showEmoji })
                  console.log(this.state.showEmoji, 'showEmoji')
                  this.girdFix()
                }}>😀</span>
                <span onClick={() => this.handleSubmit()}>发送</span>
              </div>
            }
            >信息
          </InputItem>
          {this.state.showEmoji ?
            <Grid
              data={emoji}
              columnNum={8}
              carouselMaxRow={3}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                })
                console.log(el)
              }}
              /> :
            null
          }
        </List>
      </div>
    </div>
  }
}
export default Chat