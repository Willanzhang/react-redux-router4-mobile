import {MSG_LIST, MSG_RECV, MSG_READ} from '../actions/chat'
const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

function chat (state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, chatmsg:action.payload.msgs,users:action.payload.users, unread: action.payload.msgs.filter(v => !v.read&&v.to===action.payload.userid).length}
    case MSG_RECV:
      const unread = action.payload.msg.to === action.payload.userid ? state.unread + 1:state.unread
      return {...state, chatmsg:[...state.chatmsg,action.payload.msg],unread:unread}
    // case MSG_READ:
    //   return {...state, userList:action.payload}
    default:
      return state
  }
}
export default chat
