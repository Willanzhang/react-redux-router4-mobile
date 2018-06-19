import {REGISTER_SUCCESS, ERROR_MSG} from '../actions/user'
const initState = {
  msg: '',
  isAuth: false,
  user: '',
  pwd: '',
  type: ''
}

function user (state=initState, action) {
  switch(action.type) {
    case 'REGISTER_SUCCESS':
      return {...state, msg:'', isAuth: true, ...action.payLoad}
    case 'ERROR_MSG':
      return {...state, msg:action.msg, isAuth: false}
    default:
      return state
  }
}
export default user
