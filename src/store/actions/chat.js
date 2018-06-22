import axios from 'axios'

export const USER_LIST = 'USER_LIST'

export function userList(data) {
  return { type: USER_LIST, payload: data }
}
export function getUserList(type) {
  return dispatch => {
    axios.get('/user/list?type=genius')
      .then(res => {
        if (res.data.errCode === 0) {
          dispatch(userList(res.data.data))
        }
      })
  }
}