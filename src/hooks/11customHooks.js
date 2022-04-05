import React, {  useState } from 'react';
import ReactDOM from 'react-dom';
// 自定义hook
function useCount(){
  // 公共逻辑放在内部实现
  let [count,setCount] = useState(0);
  const setMyCount = () => {
    setCount(count + 1)
  }
  // 只暴露外部需要的数据
  return [count,setMyCount];
}
// 在不同组件中使用不会共享同一份数据，都是独立的一份
function Example1(){
  // setCount 为自定义hooks中返回的setMyCount
    let [count,setCount] = useCount();
    return (
        <div>
          Count: {count}
          <button onClick={()=>{setCount()}}>更新count</button>
        </div>
    )
}
function Example2(){
    let [count,setCount] = useCount();
    return (
        <div>
          Count: {count}
          <button  onClick={()=>{ setCount()}}>更新count</button>
        </div>
    )
}
ReactDOM.render(<><Example1 /><Example2 /></>, document.getElementById('root'));