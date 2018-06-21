import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List } from 'antd-mobile'
import './avatarSelector.styl'
class AvatarSelector extends React.Component{
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      icon: '',
      text: ''
    }
  }
  choose (e) {
    this.setState({
      icon: e.icon,
      text: e.text
    })
  }
  render() {
  const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
    .split(',')
    .map(v => ({
      icon: require(`./imgs/${v}.png`),
      text: v
    }))
  const chooseAvatar = this.state.icon ? (<div><span>已选择头像</span><img style={{width: '0.4rem'}} src={this.state.icon} alt="头像"/></div>)
    : '请选择头像' 
  return <div>
    <List renderHeader={()=> chooseAvatar}>
      <Grid 
        data={avatarList} 
        columnNum={5}
        onClick={elm => {
          this.choose(elm)
          this.props.selectAvatar(elm.text)
        }}
      ></Grid>
    </List>
    
  </div>
  }
}
// AvatarSelector.propTypes = {
//   selectAvatar: PropTypes.func.isRequire
// }
export default AvatarSelector
