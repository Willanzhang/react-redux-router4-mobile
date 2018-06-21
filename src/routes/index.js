import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import AuthRoute from 'component/authRoute/authRoute'

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
// const Auth = asyncComponent(() => import("pages/auth"))
const Login = asyncComponent(() => import("container/login/login"))
const Register = asyncComponent(() => import("container/register/register"))
const BossInfo = asyncComponent(() => import("container/bossInfo/bossInfo"))
const GeniusInfo = asyncComponent(() => import("container/geniusInfo/geniusInfo"))
const Dashboard = asyncComponent(() => import("component/dashboard/dashboard"))

// boss genius me msg 4个页面
class Routers extends Component {
  render() {
    const app = (<div>
      <Router>
        <div>
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path='/bossInfo' component={BossInfo}></Route>
            <Route path='/geniusInfo' component={GeniusInfo}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route component={Dashboard}></Route>
          </Switch> 
        </div>
      </Router>
    </div>)
    return app
  }
}
export default Routers