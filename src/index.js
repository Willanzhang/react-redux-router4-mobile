import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'common/stylus/index.styl'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from 'src/store'
import { Provider } from 'react-redux'
import Router from 'src/routes'
import './axios'
import 'common/js/rem'
console.log(store.getState())
// 新建store
// const  store = createStore(counter)

// const init = store.getState()
// console.log(init,' init')
// 派发事件

ReactDOM.render(
	<Provider store={store}>
		<Router>
		</Router>
	</Provider>, document.getElementById('root'));
// store.subscribe(render)
registerServiceWorker();
