import React from 'react'
import { Redirect } from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button ,WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
import { connect} from 'react-redux'
import { update } from '../../store/actions/user'

@connect(
  state => state.user,
  {update}
)
export default class BossInfo extends React.Component {
  state = {
    title: '',
    company: '',
    money: '',
    desc: '',
    avatar: ''
  }
  constructor(props) {
    super(props)
    this.selectAvatar = this.selectAvatar.bind(this)
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  selectAvatar(val) {
    this.setState({
      avatar: val
    })
    console.log(val, 'val')
  }
  render() {
    const path = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    console.log(redirectTo, 'redirectTo')
    return <div>
    {redirectTo !== path && redirectTo? <Redirect to={this.props.redirectTo}></Redirect>:null}
      <NavBar mode="dark">boss完善信息</NavBar>
      <AvatarSelector
        selectAvatar={this.selectAvatar}
      ></AvatarSelector>  
      <InputItem onChange={v => this.onChange('title', v)}>招聘职位</InputItem>
      <InputItem onChange={v => this.onChange('company', v)}>公司名称</InputItem>
      <InputItem onChange={v => this.onChange('money', v)}>职位薪资</InputItem>
      <TextareaItem  
        onChange={v => this.onChange('desc', v)}
        autoHeight
        title="职位要求"
      ></TextareaItem >
      <WhiteSpace>
      </WhiteSpace>
      <Button 
        type="primary"
        onClick={() => {
          this.props.update(this.state)
        }}
      >保存</Button>
    </div>
  }
}