
import React, { useMemo, useState } from "react";
import ReactDOM from 'react-dom'
/**
 * useMemo
 * 作用：可以保存组件的渲染结果，根据条件确实是否重新渲染,主要是用来进行性能优化
 * 特性：
 * 1. 使用useMemo包括的jsx代码段初次渲染后，会将渲染结果保存，组件再次更新时不会重复渲染
 * 2. 指定状态条件发生变化时，才会进行重新渲染
 * 场景：
 * 在一些复杂计算的代码段中，可能并不依赖很多组件状态，如果任一状态发生变化时都重新渲染，是很大的性能开销，此时就可以使用useMemo，将这样的代码段包裹起来，
 * 只有依赖的状态发生变化时才会重新渲染，可以进行组件的性能提升。
 */
const Child = ({c}) => {
  console.log('Child重新渲染',c)
  return (
    <div>{c}</div>
  )
}

const Parent = ({a,b}) => {
  // a,b发生改变时都会重新渲染
  const child1 = <div>
    { console.log('这是一个复杂的计算child1')}
    <Child c={a}/>
  </div>
  // 初次渲染，之后只有b发生改变时才会重新渲染，否则保留上一次渲染的结果
  const child2 = useMemo(() => 
    <div>
      { console.log('这是一个复杂的计算child2')}
      <Child c={b}/>
    </div>,
    [b]
  )
  return (
    <React.Fragment>
      { child1 }
      { child2 }
    </React.Fragment>
  )
}

const App = () => {
  const [a,setA] = useState(0)
  const [b,setB] = useState(0)
  return (
    <div>
      <Parent a={a} b={b}/>
      <button onClick={() => setA(a + 1)}>改变a</button>
      <button onClick={() => setB(b + 1)}>改变b</button>
    </div>
  )
}
ReactDOM.render(<App/>,document.getElementById('root'))
