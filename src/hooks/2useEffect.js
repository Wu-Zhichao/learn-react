import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button,Modal } from 'antd'
/**
 * useEffect: 类似生命周期函数，相当于是 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合，可以通过传参及其他逻辑，分别模拟*这三个生命周期函数。
 * useEffect具有以下5个特性：
 * 1. 第一次渲染时执行，任何状态发生变化都执行 - 只指定一个回调函数作为参数， 相当于componentDidMount & componentDidUpdate
 * 2. 第一次渲染执行，任何状态发生变化时不执行
 * 3. 第一次渲染执行，通过第二个参数指定状态发生变化时执行，其他状态发生变化不执行
 * 4. 监听多个状态时，可以同时定义多个useEffect
 * 5. 组件卸载时会执行回调函数返回的回调函数 - 相当于componentWillUnmount
 * 

/**
 * 1. useEffect只有一个回调函数作为第一个参数时：
 *   1.1.初始化时会执行一次回调函数
 *   1.2.任一一个状态数据发生变化时都会执行回调函数
 */
function Example () {
  const [count,setCount] = useState(0)
  useEffect(() => {
    // 初始化时执行一次，count每次变化的时候都会执行
    console.log('我执行啦！')
  })
  return (
    <div>
       <div>点击了{count}次</div>
      <Button type='primary' onClick={() => setCount(count+1)}>点击</Button>
    </div>
  )
}

/**
 * 2. useEffect传入两个参数：第一个参数是回调函数，第二个参数是空数组：
 *    useEffect的回调函数只会在初始化渲染时执行一次
 */
function Example1() {
  const [count,setCount] = useState(0)
  useEffect(() => {
    // 只会在初次渲染时执行，任何状态数据发生变化都不会执行
    console.log('我执行啦111111！')
  },[])
  return (
    <div>
      <div>你点击了{count}次</div>
      <Button type='primary' onClick={() => setCount(count + 1)}>点击</Button>
    </div>
  )
}

/**
 * 3. useEffect 传入两个参数，第一个是回调函数，第二个是指定数据的数组
 *   3.1 初次渲染时执行一次回调函数
 *   3.2 指定数据发生变化时执行一次回调函数
 */
function Example2() {
  const [visible,setVisible] = useState(false)
  const [count,setCount] = useState(0)
  useEffect(() => {
    // 初始渲染时会执行一次，visible状态发生变化时会执行，count发生变化时则不会执行
    console.log('我最帅了')
  },[visible])
  return (
    <div>
      <div>点击了{count}次</div>
      <Button type='primary' onClick={() => setCount(count +1) }>点击</Button>
      <Button type='primary' onClick={() => setVisible(true)}>打开弹框</Button>
      <Modal visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>我是弹框内容</Modal>
    </div>
  )
}

/**
 * 4. 监听多个状态发生变化时执行useEffect的回调函数时，可以同时使用多个useEffect
 */
 function Example3() {
  const [visible,setVisible] = useState(false)
  const [count,setCount] = useState(0)
  useEffect(() => {
    // 初始渲染的时候执行一次，count状态发生变化时会执行
    console.log('我是count')
  },[count])
  useEffect(() => {
    // 初始渲染时会执行一次，visible状态发生变化时会执行，count发生变化时则不会执行
    console.log('我是弹框')
  },[visible])
  return (
    <div>
      <div>点击了{count}次</div>
      <Button type='primary' onClick={() => setCount(count +1) }>点击</Button>
      <Button type='primary' onClick={() => setVisible(true)}>打开弹框</Button>
      <Modal visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>我是弹框内容</Modal>
    </div>
  )
}
/**
 * 5. 组件卸载时会执行useEffect的回调函数的返回值（回调函数）
 */
function Test() {
  const [ count, setCount ] = useState(0)
  useEffect(() => {
    console.log('Test组件渲染更新了')
    return () => {
      // 组件卸载时会执行
      console.log('Test组件销毁了')
    }
  },[])
  return (
    <div>
      <Button type='primary' onClick={() => setCount(count + 1)}>点击</Button>
      <div>测试子组件点击了{count}次数</div>
    </div>
  )
}
function Example4 () {
  const [show,setShow] = useState(true)
  return (
    <div>
      <Button type='primary' onClick={() => setShow(!show)}>显示/关闭</Button>
      {
        show ? <Test /> : null
      }
    </div>
  )
}



const App = props => {
  return (
    <div>
      <Example />
      <hr />
      <Example1 />
      <hr />
      <Example2 />
      <hr />
      <Example3 />
      <hr />
      <Example4 />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);