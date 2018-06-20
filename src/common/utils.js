// 根据用户类型和信息是否完善，决定跳转页面
export function getRedirectPath ({ type, avatar }) {
  console.log(type,'avatar', avatar)
	let url = (type === 'boss') ? '/boss' : '/genius'
	if (!avatar) {
		url += 'info'
	}
	return url
}

export function getChatId (userId, targetId) {
	return [userId, targetId].sort().join('_')
}

export function getLast (arr) {
	return arr[arr.length - 1]
}