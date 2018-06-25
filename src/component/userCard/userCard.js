import React from 'react'
import ReactDOM from 'react-dom';
import { Card, WhiteSpace, WingBlank, PullToRefresh } from 'antd-mobile'
import PropTypes from 'prop-types'

class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      down: false,
      height: document.documentElement.clientHeight
    }
  }
  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei
    }), 0);
  }
  render() {
    const {Header, Body} = Card
    return <PullToRefresh
      damping={60}
      ref={el => this.ptr = el}
      style={{
        height: this.state.height,
        overflow: 'auto',
      }}
      indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
      direction={this.state.down ? 'down' : 'up'}
      refreshing={this.state.refreshing}
      onRefresh={() => {
        this.setState({ refreshing: true });
        setTimeout(() => {
          this.setState({ refreshing: false });
        }, 1000);
      } }
      >
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userList.map(v =>
          v.avatar ?
            (<Card key={v._id}>
              <Header
                title={v.user}
                thumb={require(`./imgs/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
                ></Header>
              <Body>
                {v.desc.split('\n').map(d =>
                  <div key={d}>{d}</div>
                )}
                {v.type === 'boss' ? <div>公司:{v.company}</div> : null}
                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
              </Body>
            </Card>) : null
        )}
      </WingBlank>
    </PullToRefresh>
  }
}
export default UserCard