import React, { createRef, forwardRef, useCallback } from "react";
import ReactDOM from "react-dom";
/**
 * forwardRef:
 * 是React的一个高级特性，理解useRef之前需要先理解forwardRef
 * 作用：forwardRef是一个高阶组件，可以转发收到的ref给其子组件，使其外部可以获取对一个组件内部子组件的引用
 */
// forwardRef是一个高阶组件，它能将收到的ref转发给它的子组件
const FancyButton = forwardRef((props,ref) => (
  <div>
    <input ref={ref}/>
    <button>
      { props.children }
    </button>
  </div>
))
const App = () => {
  // 创建一个ref引用
  const ref = createRef()
  /**
   * ref本身是绑定到FancyButton上的引用，ref.current正常获取到的应该是FancyButton，但是在FancyButton内部通过forwardRef就将引用转发给了input，此时就将ref转发到了input上，所以ref.current获取到的就是input元素，因此才可以调用input元素的focus方法。
   */
  const handleClick = useCallback(() => ref.current.focus(),[])
  return (
    <div>
      {/* 将ref绑定引用到FancyButton上 */}
      <FancyButton ref={ref}>点击</FancyButton>
      <button onClick={handleClick}>获得焦点</button>
    </div>
  )
}
ReactDOM.render(<App/>,document.getElementById('root'))