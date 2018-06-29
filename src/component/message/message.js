import React from 'react'
import { connect } from 'react-redux'
@connect(
  state=> state
)
class Msg extends React.Component{
  render() {
    const msgGroup = {}
    console.log(this.props.chat.chatmsg, 111111111)
    this.props.chat.chatmsg.forEach(v => {
      // 按一个属性值分类 小技巧
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    console.log(this.props.chat.chatmsg, 222222222, msgGroup)
    // 根据chatid 分组
    return(
      <div>
        <h2>消息列表</h2>
      </div>
    )
  }
}
export default Msg