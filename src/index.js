import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from 'src/store'
import { Provider } from 'react-redux'
import Router from 'src/routes'
console.log(store.getState())
// 新建store
// const  store = createStore(counter)

// const init = store.getState()
// console.log(init,' init')
// 派发事件

//结合插件使用 redux-devtools
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>, document.getElementById('root'));
// store.subscribe(render)
registerServiceWorker();
