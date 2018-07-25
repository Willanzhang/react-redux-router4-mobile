import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'common/stylus/index.styl'
// import App from './App';
import registerServiceWorker from './registerServiceWorker'
import store from 'src/store'
import { Provider } from 'react-redux'
import Router from 'src/routes'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './axios'
import 'common/js/rem'
// 使用 immutable.js 后
import Immutable from 'immutable'
// import { Map} from 'immutable'
// import { createSelector } from 'reselect'
// let foo = Immutable.fromJS({a: {b: 1}})
// let bar = foo.setIn(['a', 'b'], 2)  // 使用 setIn 赋值
// console.log(foo.getIn(['a', 'b']), )  // 使用 getIn 取值，打印 1
// console.log(foo === bar)  //  打印 false
// immutable 优点
// 1 减少内存使用
// 2 并发安全
// 3 降级项目复杂度
// 4 便于比较复杂数据，定制shouldComponentUpdate 方便
// 5 时间旅行功能
// 6 函数式编程
// 缺点
// 1 学习成本
// 2 库的大小
// 3 对现有项目入侵太严重 （新项目使用， 老项目评估再用）
// let a = Map({
//   name: 'users',
//   filter: Map({ name: 'Cam' })
// })
// let a1 = a.set('name', 'bowen')


// If you use ReactDOM.hydrate to start web application, you will see this warning.
// If your application is not ssr, please use ReactDOM.render to start. 
ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<Router>
			</Router>
		</BrowserRouter>
	</Provider>, document.getElementById('root'));
// store.subscribe(render)
registerServiceWorker();
