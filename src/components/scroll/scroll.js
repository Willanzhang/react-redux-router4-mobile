import BScroll  from 'better-scroll'
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile'
let wrapper
// console.log(wrapper)
let scroll

class Scroll extends Component {
  state = {
    name: 'zbw'
  }
  constructor(props) {
    super(props)
  }
  _initScroll () {
    // if (!this.$refs.wrapper) {
    //   return
    // }
    // scroll = new BScroll(this.$refs.wrapper, {
    //   probeType: 3,
    //   click: true
    // })

    if (this.listenScroll) {
      let me = this
      scroll.on('scroll', (pos) => {
        // me.$emit('scroll', pos)
        this.scroll(pos)
      })
    }
    if (this.pullDown) {
      scroll.on('scrollEnd', (pos) => {
        if (scroll.y <= (scroll.maxScrollY + 50)) {
          // this.$emit('scrollDown')
          this.scrollDown()
        }
      })
    }
    if (this.pullUp) {
      let me = this
      scroll.on('touchEnd', (pos) => {
        if (pos.y > 50) {
          // me.$emit('pullDown')
          this.pullDown()
        }
      })
    }
  }
  disable () {
    scroll && scroll.disable()
  }
  enable () {
    scroll && scroll.enable()
  }
  refresh () {
    // console.log(scroll)
    scroll && scroll.refresh()
  }
  scrollTo () {
    scroll && scroll.scrollTo.apply(scroll, arguments)
  }
  scrollToElement () {
    scroll && scroll.scrollToElement.apply(scroll, arguments)
  }
  componentDidMount() {
    wrapper = document.querySelector('.wrapper')
    scroll = new BScroll(wrapper, {
      probeType: 3,
      click: true
    })
    this._initScroll()
    console.log(wrapper, 'wrapper',this.props)
  }
  componentWillUnmount() {

  }
  componentDidUpdate () {
    console.log('componentDidUpdate')
    setTimeout(() => {
      this.refresh()
    }, this.refreshDelay)
  }
  clickEvent() {
    this.setState({
      name: 'lxt'
    })
  }
  render() {
    return (
      <div className="wrapperContainer" style={{height: "100vh"}}>
        {this.props.children}
        {/*<Button type="primary" onClick={() => this.props.scrollDown()}></Button>*/}
        <Button type="primary" onClick={() =>this.props.scrollDown()}></Button>
      </div>
    )
  }
}
Scroll.propTypes= {
  probeType: PropTypes.number,
  listenScroll: PropTypes.bool,
  data: PropTypes.array,
  scroll: PropTypes.func,
  scrollDown: PropTypes.func,
  pullDown: PropTypes.func
}
Scroll.defaultProps = {
  probeType: 1,
  listenScroll: true,
  data: []
}
export default Scroll