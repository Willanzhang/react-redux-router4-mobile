import axios from 'axios'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const USERDATA = 'USERDATA'

export function login(log) {
	return {
		type: LOGIN
	}
}

export function logout() {
	return {
		type: LOGOUT
	}
}

export function userData(data) {
	return {
		type: USERDATA,
		userData: data
	}
}
// export function addGunAsync() {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(addGun())
//         },2000)
//     }
// }
export function getUserData() {
	// dispatch 用来通知消息修改
	return dispatch => {
		axios.get('/data')
			.then(res => {
				if(res.status === 200) {
					dispatch(userData(res.data))
				}
			})
	}
}