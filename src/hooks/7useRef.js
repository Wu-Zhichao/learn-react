import React, { useEffect, useRef, useState } from "react";
import  ReactDOM  from "react-dom";
/**
 * useRef:
 * 两个作用：
 * 1. 相当于类组件的一个实例属性，只要组件实例不销毁，就一直保持着引用，组件更新时也不会重新初始化,返回一个包含current属性的对象
 * 2. 获取dom元素的一个引用
 * 
 */
const Counter1 = () => {
  const [count,setCount] = useState(0)
  // 初始化后会一直保持着引用，状态变化组件更新重新渲染时也不会被重新初始化，返回一个具有current属性的对象
  const countRef = useRef(0)
  console.log('countRef',countRef)
  useEffect(() => {
    // 组件初始化和状态更新时执行
    countRef.current = count
    console.log('组件渲染完成')
  }) 
  const prevCount = countRef.current
  return (
    <div>
      NowCount: {count}, beforeCount: {prevCount}
      { console.log('组件渲染中')}
      <button onClick={() => setCount(count + 1)}>更新count</button>
    </div>
  )
}
// 使用类组件实现相似功能： 使用useRef定义的变量，相当于类组件的实例属性
class Counter2 extends React.Component {
  state = { count: 0}
  prevCount = 0 // 相当于useRef定义的变量，不会在更新渲染时重新初始化
  // 初始化渲染完成后执行
  componentDidMount() {
    console.log('组件初始化渲染完毕Counter2')
  }
  // 数据状态更新时执行
  componentDidUpdate() {
    console.log('组件更新渲染完毕Counter2')
    this.prevCount = this.state.count
  }
  render() {
    return (
      <div>
      NowCount: {this.state.count}, beforeCount: {this.prevCount}
      { console.log('组件更新渲染中Counter2')}
      <button onClick={() => this.setState({ count:this.state.count+1})}>更新count</button>
    </div>
    )
  }
}
// 自定义属性模拟类似功能
const countRef = { current: 0} // 唯一区别是因为使用的全局变量，Counter3卸载时，该变量引用还在，数据一直不会变，而使用useRef，组件卸载时引用会丢失
const Counter3 = () => {
  const [count,setCount] = useState(0)
  useEffect(() => {
    console.log('组件初始化渲染/更新渲染完成Counter3')
    countRef.current = count
  })
  const prevCount = countRef.current
  return (
    <div>
    NowCount: {count}, beforeCount: { prevCount }
    { console.log('组件渲染中Counter3')}
    <button onClick={() => setCount(count + 1)}>更新count</button>
  </div>
  )
}

// useRef第二个作用演示：获取一个DOM元素的引用
const TextInputWithFocusButton = () => {
  // 配合ref属性使用可以获取input元素的引用，类似react中的基础api：React.createRef(); 唯一区别是，createRef在每次组件更新时都重新创建一个新的变量，useRef则一直会保持初始化时创建的对象的引用
  const inputElement = useRef()
  const onButtonOnFocus = () => {
    console.log('inputElement',inputElement)
    inputElement.current.focus()
  }
  return (
    <React.Fragment>
      <input ref={inputElement} type='text'/>
      <button onClick={onButtonOnFocus}>Focus this input </button> 
    </React.Fragment>
  )
}
const App = () => {
  const [show,setShow] = useState(true)
  return (
    <div>
      <h3>useRef第一个作用演示案例：</h3>
      <div>
        { show ? <Counter1 /> : null}
        <hr />
        { show ? <Counter2 /> : null}
        <hr />
        { show ? <Counter3 /> : null}
        <button onClick={() => setShow(!show)}>重新挂载</button>
      </div>
      <hr />
      <h3>useRef第二个作用演示案例：</h3>
      <div>
        <TextInputWithFocusButton />
      </div>
    </div>
  )
}

ReactDOM.render(<App/>,document.getElementById('root'))