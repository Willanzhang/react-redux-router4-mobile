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

// 获取连接query参数
export function getQuery (string){
  var reg = new RegExp("(^|&)" + string + "=([^&]*)(&|$)")
  var r = window.location.search.substr(1).match(reg)
  if (r)return decodeURI(r[2])
  return false
}

// 获取cookie值
export function getCookie (objname) {
  var arrstr = document.cookie.split('; ')
  for (var i = 0; i < arrstr.length; i++) {
    var temp = arrstr[i].split('=');
    if (temp[0] === objname) return unescape(temp[1])
  }
}

// 设置cookie
export function setCookie (name, value, days) {
  var d = new Date()
  d.setTime(d.getTime() + 24*60*60*1000*days)
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString()
}
