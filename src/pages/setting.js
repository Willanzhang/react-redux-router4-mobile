import React, {Component} from 'react'
import Scroll from 'src/components/scroll/scroll'
// console.log(wrapper)
class Setting extends Component {
  state = {
    listenScroll: true,
    listArr: [1,2,1,3,2,4,5,1,2,4,5,1,2,31,1,2,1,3,2,4,5,1,2,4,5,1,2,31,1,2,1,3,2,4,5,1,2,4,5,1,2,31,1,2,1,3,2,4,5,1,2,4,5,1,2,31,1,2,1,3,2,4,5,1,2,4,5,1,2,31,1,2,1,3,2,4,5,1,2,4,5,1,2,31]
  }
   // 获取竞猜列表
  pullUp = () => {
    console.log('xiala xiala ')
    this.setState({
      listenScroll: false
    })
  }
  scrolls (pos) {
  }
  pullDowns () {
  }
  componentDidMount () {
    
  }
  render() {
    return (
      <Scroll
      listenScroll={this.state.listenScroll}
      data={this.state.listArr}
      scroll={this.scrolls}
      scrollDown={this.pullUp}
      pullDown={this.pullDowns}
      >
      <div className="wrapper">
        <h1> 设置</h1>
        <ul className="content">
          {this.state.listArr.map((val,ind) => {
            return (
              <li key={ind}>{ind}</li>
            )
          })}
        </ul>
      </div>
      </Scroll>
    )
  }
}
export default Setting