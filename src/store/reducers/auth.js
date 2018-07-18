import { LOGIN, LOGOUT, USERDATA } from '../actions/auth'
const initState = {
	isAuth:false,
	user: 'William',
	age: 18
}
 function auth(state = initState, action) {
	// console.log(state, action, '************')
	switch(action.type){
		case LOGIN:
			return {...state, isAuth: true}
		case LOGOUT :
			return {...state, isAuth: false}
		case USERDATA:
			return {...state, ...action.userData}
		default:
			return state
	}
}
export default auth