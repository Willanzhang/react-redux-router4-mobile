import axios from 'axios'
// export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const LOAD_DATA = 'LOAD_DATA'
export const ERROR_MSG = 'ERROR_MSG'
export const UPDATE = 'UPDATE'

export function errorMsg(msg) {
  return { msg, type: ERROR_MSG}
}
// 授权成功
export function authSuccess (data) {
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}
// // 登陆成功 authSuccess 取代了 loginSuccess 和 registerSuccess
// export function loginSuccess (data) {
//   return {
//     type: AUTH_SUCCESS,
//     payload: data
//   }
// }
// // 注册成功
// export function registerSuccess (data) {
//   return {
//     type: AUTH_SUCCESS,
//     payload: data
//   }
// }
// 加载
export function loadData (payload) {
	return { type: LOAD_DATA, payload }
}

// 登陆
export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}).
    then(res => {
      console.log(res.status, '000000000000000');
      if(res.status === 200 && res.data.errCode === 0){
        console.log(1111111)
        dispatch(authSuccess({user, pwd}))
      } else {
        console.log(2222222)
        dispatch(errorMsg(res.data.errMsg))
      }
    })
  }
}

// 获取用户信息
export function userInfo(callback) {
  return dispatch => {
    axios.get('/user/info').
    then(res => {
      if(res.status === 200 && res.data.errCode === 0){
        dispatch(loadData(res.data.data))
      } else {
        callback()
      }
    })
  }
}
// 注册
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
        dispatch(authSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.errMsg))
      }
    })
  }
}
// 更新boss信息
export function update (data) {
  return dispatch => {
    axios.post('/user/update',data)
      .then( res=> {
        if(res.status === 200 && res.data.errCode === 0){
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.errMsg))
        }
      })
  }
}
