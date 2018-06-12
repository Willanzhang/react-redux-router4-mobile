import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import { login, getUserData } from 'src/store/actions/auth'
import axios from 'axios'
function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    async componentDidMount() {
      const { default: component } = await importComponent();
      console.log(1110000000000000)
      this.setState({
        component: component
      });
    }
    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }
  return AsyncComponent;
}
@connect(state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  age: state.auth.age
}), {
  login,
  getUserData
})
class Login extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount () {
    console.log(this.props, 'this.props')
  }
  isLogin = () =>{
    console.log('this')
    axios.get('/data')
      .then(res => {
        console.log(res, 'res68989')
        this.props.getUserData(res.data)
      })
    // this.props.login()
  }
  render () {
    return (
      <div>
        <h2>我的名字是{this.props.user},年龄{this.props.age}</h2>
        { this.props.isAuth ? <div>123</div>: (
          <div>
            <h2>你没有 权限需要登陆 </h2>
            <Button type="primary" onClick={this.isLogin}>登陆</Button>  
          </div>
        )}
      </div>
    )
  }
}
export default Login