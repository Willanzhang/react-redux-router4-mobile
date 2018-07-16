// class Navbar extends React.Componet{
//   static contentTypes = {
//     user: PropTypes.string
//   }
//   render() {
//     return <div>
//       {this.context.user}
//     </div>
//   }
// }
// function Navbar(props, content){

// }
// class Page extends React.Componet{
//   static childContextTypes = {

//   }
// }

import React from 'react'
import PropTypes from 'prop-types'

// 中间件原理 


// connect 负责链接组件，给到redux里的数据放到组件的属性里
// 1 负责接收一个组件， 把state里的一些数据放进去，返回一个组件
// 2 数据变化的时候，能够通知组件
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  // 等于一个高阶组件 要处理mapStateToProps 和 mapDispatchToProps
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor (props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      const {store} = this.context
      store.subscribe(() => this.update())
      this.update()
    }
    update () {
      // 获取mapStateToProps 和 mapDispatchToProps 放入this.state里
      const { store } = this.context
      const stateProps = mapStateToProps(store.getState())
      // action 方法  store.dispatch(action)
      // bindActionCreators redux 中有，现在自己实现
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props
          ...stateProps,
          ...dispatchProps,
        }
      })
    }
    render () {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

// provider, 把store放到context里， 所有的子元素可以直接取到store
export class Provider extends React.Component{
  static  childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {store: this.store} // 把传进来的sore放在全局
  }
  constructor(props, context){
    super(props, context)
    this.store = props.store
  }
  render () {
    return this.props.children
  }
}