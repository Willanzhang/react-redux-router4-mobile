import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from 'src/store/actions/auth'


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
// const Setting =  import("components/setting")
// const Menu =  import("components/menu")
// const Home =  import("components/home")
const Setting = asyncComponent(() => import("pages/setting"))
const Menu = asyncComponent(() => import("pages/menu"))
const Home = asyncComponent(() => import("pages/home"))
const Auth = asyncComponent(() => import("pages/auth"))
@connect(state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
}))
class Routers extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount () {
  }
  render() {
    const { match } = this.props
    console.log(this.props, '')
    const rediretctaToLogin = <Redirect to='/login'></Redirect>
    const { isAuth, user} = this.props
    const app = (<div>
      <Router>
        <div>
          <ul>
            <li><Link to="/">home{isAuth}</Link></li>
            <li><Link to="/setting">setting</Link></li>
            <li><Link to="/menu">menu</Link> </li>
          </ul>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/setting" component={Setting}></Route>
            <Route path="/menu" component={Menu}></Route>
          </Switch>
        </div>
      </Router>
    </div>)
    return isAuth ? app : rediretctaToLogin
    // return app
  }
}
export default Routers