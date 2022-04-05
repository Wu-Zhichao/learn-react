import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import  ReactDOM from "react-dom";
/**
 * useImperativeHandle(): 透传 Ref
 * 作用：使父组件具备了获取子组件【实例】和【状态数据】的能力，还可以根据参数来定义传递的数据是否要随着子组件对应数据的更新而更新
 *      即：子组件通过useImperativeHandle自定义要传递给父组件的状态或功能（想传什么给父组件，就通过useImperativeHandle第二个参数返回值对象中定义即可）
 * 注意：需要配合forwardRef一起使用，需要用到forwardRef转发ref给子组件的能力，否则无法获取到对应的ref引用，数据就不知道传给谁了。
 */
/**
 * 使用forwardRef，转发FancyButton的ref引用到组件内部
 */
const FancyButton = forwardRef((props,ref) => {
  const inputRef = useRef()
  const [inputValue,setInputValue] = useState(0)
  // 在useImperativeHandle中自定义要返回的属性给ref引用
  useImperativeHandle(ref, () => ({
    // 传递功能
    focus: () => {
      inputRef.current.focus()
    },
    // 传递状态数据
    inputValue,
    // 传递实例属性
    inputRef
  }))
  return <input ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
})
const App = () => {
  // 创建一个ref引用
  const ref = useRef()
  // 获取input的焦点
  const handleInputFocus = useCallback(() => {
    ref.current.focus()
  },[])
  // 获取传递的状态数据
  const handleGetChildState = useCallback(() => {
    // 因此ref被转发到了FancyButton内部，经过useImperativeHandle就可以获取到返回的相关属性
    console.log('ref',ref.current)
    // {inputValue: '11111', inputRef: {…}, focus: ƒ}
  },[])
  return (
    <div>
      {/* 绑定ref引用到 FancyButton上 */}
      <FancyButton ref={ref}/>
      <button onClick={handleInputFocus}>获取子组件input的焦点</button>
      <button onClick={handleGetChildState}>获取子组件的状态</button>
    </div>
  )
}
ReactDOM.render(<App />,document.getElementById('root'))