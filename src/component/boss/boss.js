import React from 'react'
import './boss.styl'
import axios from 'axios'
class Boss extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    axios.get('/user/list?type=genius')
      .then(res => {
        if (res.data.errCode === 0) {
          this.setState({
            data: res.data.data
          })
        }
      })
  }
  render() {
    console.log(this.state.data)
    return <div className="boss">
      <h2>boss页面</h2>
    </div>
  }
}
export default Boss