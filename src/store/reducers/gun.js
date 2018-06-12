import { ADD_GUN, REMOVE_GUN } from '../actions/gun'
 function counter(state = 0, action) {
	switch(action.type){
		case ADD_GUN:
			return state + 1
		case REMOVE_GUN :
			return state - 1
		default:
			return state
	}
}
export default counter