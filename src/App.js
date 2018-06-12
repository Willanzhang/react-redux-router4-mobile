import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import { Button } from 'antd-mobile'
// import 'antd-mobile/dist/antd-mobile.css'
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
  constructor(props) {
    super(props)
    // this.state = {
    //   age: 190
    // }
  }
  componentDidMount() {
    console.log(this.props, 'this.props', this.state)
  }
  love = (e) => {
    console.log('love you', e)
    console.log(this)
  }
  render() {
    const {num, addGun, addGunAsync, removeGun} = this.props
    // const store  = this.props.store
    // const {counter} = store.getState()
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            现在又 {num}
          </h1>
        </header>
        <Button type="primary" onClick={() => addGunAsync()}>1 异步添加按钮</Button>
        <Button type="primary" onClick={() => removeGun()}>1 减少按钮</Button>
        <Button type="primary" onClick={() => addGun()}>1 点击按钮</Button>
        <Button type="primary" onClick={() => this.love(12)}>1 love</Button>
        <Button type="primary" onClick={this.love}>1 love</Button>
        <Button type="primary" onClick={this.love.bind(this, 89)}>1 love</Button>
      </div>
    );
  }
}


export default App;
