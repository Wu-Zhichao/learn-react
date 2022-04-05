 import React, { useCallback, useState,memo }  from "react";
 import  ReactDOM  from "react-dom";
 import { Modal } from 'antd' 
 /**
  * useCallback:  记忆函数
  * 作用：性能优化，避免重复的创建引用和重复无意义的组件渲染，加大性能开销，对于一些开销昂贵的组件来说是很好的优化手段。
  * 特性：
  * 1. useCallback 会将第一个函数参数作为回调函数返回，使用useCallback优化过的回调函数，会在组件初始化渲染时创建函数对象并生成引用，之后组件再次更新渲染时则不会再次创建新对象和引用（普通函数每次组件更新都会创新新的函数对象并生成引用）
  * 2. useCallback可以通过传递第二个参数，控制对应的状态数据发生变化时才重新创建对象并生成新的引用，默认值时空数组[]，即不监控状态数据
  */
/**
 * 案例：
 */
 // 1. 未使用useCallback的组件函数，每次数据更新时都会重复创建函数对象生成新的引用
 let fn = null
const Example1 = ({count,setCount}) => {
  // 组件内普通函数
  const ordinaryCallback = () => {
    console.log('我是函数函数')
  }
  // 状态发生变化，组件渲染，一直都返回false => 表明每次渲染都会创建新的函数对象，产生新的引用
  console.log('是否是Example1的同一个回调函数：',Object.is(fn,ordinaryCallback)) // false
  fn = ordinaryCallback
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <div>Count:{count}</div>
    </div>
    
  )
}
// 2. 使用useCallback优化的组件函数，组件重新渲染时不会重新创建函数对象
let fn1 = null
const Example2 = ({count,setCount}) => {
  // 使用useCallback 优化后的组件函数，组件重复渲染时不会重复创新函数对象
  const memoizedCallback = useCallback(() => {
    console.log('我是组件函数')
  },[])
  // 状态更新时，组件重新渲染，初次渲染返回false，更新渲染一直返回true => 表示经过useCallback优化后的函数，在组件更新渲染时不会重复创建函数对象，依旧保持第一次创建时的引用
  console.log('是否是Example2的同一个回调函数：', Object.is(fn1,memoizedCallback)) // 初始渲染是false，之后一直是true
  fn1 = memoizedCallback
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <div>Count: {count}</div>
    </div>
  )
}

// 3. 通过useCallback的第二个参数控制指定状态数据更新，组件重新渲染时，再创建新的函数对象 （感觉没啥卵用）
let fn3 = null
function Example3({count,setCount}) {
  const [visible, setVisible] = useState(false)
  // 设定只有visible发生变化组件更新时才创新创建函数对象，其他情况下渲染不会重新创建
  const memoizedCallback = useCallback(() => {
    console.log('我是组件函数')
  },[visible])
 // count状态发生变化时返回true => 表示不会重新创建函数
 // visible状态发生变化时返回false => 表示会重新创建函数
  console.log('是否是Example3的同一个回调函数：', Object.is(fn3,memoizedCallback))
  fn3 = memoizedCallback
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>增加数量</button>
      <div>Count: {count}</div>
      <button onClick={() => setVisible(!visible)}>显示/隐藏弹框</button>
      <Modal visible={visible} onOk={() => setVisible(!visible)} onCancel={() => setVisible(!visible)}/>
    </div>
  )
}

// 4. 综合案例
// 昂贵开销的组件
const ExpensiveComponent = memo(({fn}) => {
  // 初始化时执行，p1状态更新时会执行，p2状态更新时则不会
  console.log('我被迫渲染啦！！！')
  return <div onClick={fn}>我是一个渲染消耗昂贵的组件</div>
})
let fnn1 = null
const Child1 = () => {
  const fn1 = () => console.log('fn1')
  console.log('fnn1: ', Object.is(fnn1,fn1))
  fnn1 = fn1
  return <div>
    <ExpensiveComponent fn={fn1}/>
  </div>
}
let fnn2 = null
const Child2 = () => {
  // 使用useCallback 不会重复创建函数对象，fn2不会重复创建增加ExpensiveComponent组件的重复渲染
  const fn2 = useCallback(() => console.log('fn2'),[])
  console.log('fnn2: ', Object.is(fnn2,fn2))
  fnn2 = fn2
  return <div>
    {/* p2状态改变不会导致fn2引用变化，因此该组件不会重复渲染 */}
    <ExpensiveComponent fn={fn2}/>
  </div>
}
const Example4 = () => {
  const [p1, setP1] = useState(0)
  const [p2, setP2] = useState(0)
  return (
    <div>
      <h4>每次点击fn4都是新的</h4>
      <Child1 p1={p1}/>
      <button onClick={() => setP1(p1 + 1)}>按钮1</button>
      <hr />
      <h4>每次点击fn4不重新生成</h4>
      <Child2 p2={p2}/>
      <button onClick={() => setP2(p2 + 1)}>按钮2</button>
    </div>
  )
}

const App = props => {
  const [count,setCount] = useState(0)
  return (
    <div>
      <Example1 count={count} setCount={setCount}/>
      <hr />
      <Example2 count={count} setCount={setCount}/>
      <hr />
      <Example3 count={count} setCount={setCount}/>
      <hr />
      <Example4 />
    </div>
  )
}
 ReactDOM.render(<App/>,document.getElementById('root'))