import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(state => state.chat)
class NavLink extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render () {
    const { pathname } = this.props.location
    const navList = this.props.data.filter(v => !v.hide)
    return (
      <TabBar>
        {navList.map(v => (<TabBar.Item
          badge={v.path === '/msg'? this.props.unread: null}
          key={v.path}
          title={v.text}
          icon={{uri: require(`./imgs/${v.icon}.png`)}}
          selectedIcon={{uri: require(`./imgs/${v.icon}-active.png`)}}
          selected={pathname === v.path}
          onPress={() => {
            this.props.history.push(v.path)
          }}
          ></TabBar.Item>))}
      </TabBar>
    )
  }
}
export default NavLink
