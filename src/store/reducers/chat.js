import {USER_LIST} from '../actions/chat'
import {getRedirectPath} from 'common/utils'
const initState = {
  userList: []
}

function chatuser (state=initState, action) {
  switch(action.type) {
    case USER_LIST:
      return {...state, userList:action.payload}
    default:
      return state
  }
}
export default chatuser
