import {AUTH_SUCCESS, ERROR_MSG, LOAD_DATA} from '../actions/user'
import {getRedirectPath} from 'common/utils'
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

function user (state=initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {...state, msg:'',redirectTo:getRedirectPath(action.payload), ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, msg:action.msg}
    default:
      return state
  }
}
export default user
