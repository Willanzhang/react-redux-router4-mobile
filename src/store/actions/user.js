import axios from 'axios'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const ERROR_MSG = 'ERROR_MSG'

export function errorMsg(msg) {
  return { msg, type: ERROR_MSG}
}
export function register({user, pwd, type, repeatpwd}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).
    then(res => {
      if(res.status === 200 && res.data.errCode === 0){
        dispatch(registerSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.errMsg))
      }
    })
  }
}
export function registerSuccess (data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}
