import {MSG_LIST, MSG_RECV, MSG_READ} from '../actions/chat'
const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

function chat (state=initState, action) {
  //  现在流程是 进页面 MSG_LIST先获取所有页面   MSG_RECV筛选和当前用户相关数据  MSG_READ 数据库是改变了，但redux数据要通过数据库修改数量手动修改 显示已读
  switch(action.type) {
    case MSG_LIST:
      return {...state, chatmsg:action.payload.msgs,users:action.payload.users, unread: action.payload.msgs.filter(v => !v.read&&v.to===action.payload.userid).length}
    case MSG_RECV:
      const unread = action.payload.msg.to === action.payload.userid ? state.unread + 1:state.unread
      return {...state, chatmsg:[...state.chatmsg,action.payload.msg],unread:unread}
    case MSG_READ:
      return {...state, chatmsg:state.chatmsg.map(v=> {
        v.read = true
        return v
      }),unread:state.unread-action.payload.num}
    default:
      return state
  }
}
export default chat
