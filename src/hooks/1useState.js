import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button,Modal } from 'antd'
/**
 * useState：保存组件状态
 */

// 类组件写法
class Example extends React.Component {
  constructor() {
    super()
    this.state = { count: 0}
  }
  render() {
    return (
      <div>
        <div>你点击了{this.state.count}次</div>
        <button onClick={() => this.setState({count: this.state.count +1})}>点击</button>
      </div>
    )
  }
}
// hooks 写法
function Example1() {
  // 定义一个count变量，赋初始值0
  const [count,setCount] = useState(0)
  return (
    <div>
      <div>你点击了{count}次</div>
      <button onClick={() => setCount(count +1 )}>点击</button>
    </div>
  )
}
// setCount 接收函数作为参数
function Example2() {
  const [count,setCount] = useState(0)
  // preCount 参数为上一次的值
  const countAction = (preCount,a) =>  preCount + a
  return (
    <div>
      <div>你点击了{count}次</div>
      <button onClick={() => setCount(countAction(count,1))}>点击</button>
    </div>
  )
}
/**
 * 2 . renderProps 和 hooks 的比较。彻底理解 hooks 的价值和优点。
 */
// renderProps 抽离公共逻辑
class Toggle extends React.Component {
  // 定义默认属性
  state= { on: false}
  constructor(props) {
    super(props)
    // 接收父组件传递的参数
    this.state.on = this.props.initial
  }
  toggle = () => {
    this.setState({ on: !this.state.on })
  }
  render() {
    // 向子组件传递了属性和方法
    return this.props.children(this.state.on,this.toggle)
  }
}
function Example3() {
  return (
    <Toggle initial={false}>
      {/* 通过一个方法接收参数 */}
      {
        (on,toggle) => (
          <React.Fragment>
            <Button type="primary" onClick={toggle}>打开弹框</Button>
            <Modal visible={on} onOk={toggle} onCancel={toggle}>我是弹框</Modal>
          </React.Fragment>
        )
      }
    </Toggle>
  )
}

// hooks 写法 - 优势：多个状态不会产生嵌套
function Example4 () {
  const [visible,setVisible] = useState(false)
  return (
    <div>
      <Button type='primary' onClick={() => setVisible(true)}>打开弹框</Button>
      <Modal visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>我是弹框内容</Modal>
    </div>
  )
}

const App = props => <div>
  <Example />
  <hr />
  <Example1 />
  <hr/>
  <Example2/>
  <hr />
  <Example3 />
  <hr />
  <Example4 />
</div>

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
