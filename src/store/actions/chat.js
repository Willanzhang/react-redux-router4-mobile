import axios from 'axios'
import io from 'socket.io-client'
// 由于当前是跨域  前端端口是3000 后端是9093 需要手动连接  否则 可以直接 io()
const socket = io('ws://localhost:9093')
// 获取聊天列表
export const MSG_LIST = 'MSG_LIST'

// 读取信息
export const MSG_RECV = 'MSG_RECV'

// 标识已读
export const MSG_READ = 'MSG_READ'


export function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } }
}

export function msgRecv(msg,userid) {
  return { type: MSG_RECV, payload: {msg, userid} }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get(`/user/getmsglist`)
      .then(res => {
        if (res.status === 200 && res.data.errCode === 0) {
          const userid = getState().user._id
          dispatch(msgList(res.data.data, res.data.users, userid))
        }
      })
  }
}
// 发送信息
export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}
// receive 接收信息
export function recvMsg(msgs) {
  return (dispatch, getState) => {
    socket.on('recvmsg', function (data) {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}
