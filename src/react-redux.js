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
// connect 负责链接组件，给到redux里的数据放到组件的属性里
export function connect() {

}

// provider, 把store放到context里， 所有的子元素可以直接取到store
class Provider extends React.Component{
  static  childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {store: this.store}
  }
  constructor(props, context){
    super(props, context)
    this.store = props.store
  }
  render () {
    return this.props.children
  }
}