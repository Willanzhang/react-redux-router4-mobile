import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Button } from 'antd-mobile'
// import 'antd-mobile/dist/antd-mobile.css' // 全局引用
import './App.css';
import { addGun, removeGun, addGunAsync } from 'src/store/actions/gun'
// <Button type="primary">1 点击按钮</Button>

// const  mapStatetoProps = (state) => {
//   return {num: state.counter}
// }
// const actionCreators = {
//   addGun,
//   addGunAsync,
//   removeGun
// }
// export default connect(mapStatetoProps,actionCreators)(App);
// @connect(mapStatetoProps,actionCreators)
@connect(state => ({
  num: state.counter
}), {
    addGun,
    addGunAsync,
    removeGun
  })
class App extends Component {
  state = {
    name: '修复'
  }
  componentDidMount() {
  }
  love = (e) => {
  }
  render() {
    // const {num, addGun, addGunAsync, removeGun} = this.props
    return (
      <div className="App">
      </div>
    );
  }
}


export default App;
