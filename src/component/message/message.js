import React from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'
@connect(
  state => state
)
class Msg extends React.Component {
  componentDidMount() {
    let s = Object.values({ name: 'zbw', age: 123 }) // 返回 ["zbw", 123]
  }
  componentWillUnmount() {
  }  
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const msgGroup = {}
    if (!this.props.chat.chatmsg.length) {

    }
    this.props.chat.chatmsg.forEach(v => {
      // 按一个属性值分类 小技巧
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // 按create_time 排序 最新的消息在上面
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    // 1 eslint 代码校验工具
    // 2 react 16 特有的代码处理机制
    // 3 react 性能优化 服务端

    // [1,11,10,2,3,4,5,21].sort(function(a,b){return a-b})
    // 根据chatid 分组
    return (
      <div>
        {chatList.map((v, i) => {
          {/* 最新消息*/ }
          const item = this.getLast(v)
          const targetId = item.from === userid ? item.to : item.from
          const name = this.props.chat.users[targetId] && this.props.chat.users[targetId].name
          const avatar = this.props.chat.users[targetId] && this.props.chat.users[targetId].avatar
          const unreadNum = v.filter(v => !v.read && v.to === userid).length
          return <List
            key={i}
            >
            <Item
              extra={<Badge text={unreadNum}></Badge>}
              thumb={require(`./imgs/${avatar}.png`)}
              arrow="horizontal"
              onClick={() => {
                this.props.history.push(`/chat/${targetId}`)
              } }
              >
              {item.content}
              <Brief>
                {name}
              </Brief>
            </Item>
          </List>
        })}

      </div>
    )
  }
}
export default Msg