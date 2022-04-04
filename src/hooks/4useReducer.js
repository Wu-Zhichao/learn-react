import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
/**
 * useReducer: 就是子当以useState执行了比较复杂的state更新
 * 以hook的方式定了新的全局状态管理，可以用来替代redux（实际为同一个作者）
 */
// 接收派发的action，执行对state进行更改
function reducer(state,action) {
  // 传入旧的state，返回新的state
  switch (action.type) {
    case 'reset':
      return { count: action.payload }
    case 'increment':
      return { count: state.count + 1}
    case 'decrement':
      return { count: state.count - 1}
    default: 
      return state
  }
}
// 允许对初始state执行二次变更
function init(initialCountState) {
  return { count : initialCountState.count + 1}
}
function Counter({initialCount}) {
  // state, dispatch 是useReducer返回的内容
  const [state, dispatch] = useReducer(
    reducer,// 派发action 执行state修改
    initialCount, // 传递给state的初始值
    init // 可选参数，允许对初始state进行二次变更
  )
  return (
    <React.Fragment>
      <div>Count: {state.count}</div>
      {/* 执行dispatch派发变更state的action */}
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount.count })}>重置</button>
      <button onClick={() => dispatch({type: 'increment'})}>增加</button>
      <button onClick={() => dispatch({type: 'decrement'})}>减少</button>
    </React.Fragment>
  )
}

const App = props => {
  const initialCountState = {count: 0}
  return (
    <div>
      <Counter initialCount={initialCountState}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);