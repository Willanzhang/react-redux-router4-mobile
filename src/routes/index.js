import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from 'src/store/actions/auth'
import DashBoard from 'pages/dashBoard'

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
const Auth = asyncComponent(() => import("pages/auth"))


class Routers extends Component {
  render() {
    const app = (<div>
      <Router>
        <div>
          <DashBoard/>
          <Route path="/login" exact component={Auth}></Route>
        </div>
      </Router>
    </div>)
    return app
  }
}
export default Routers