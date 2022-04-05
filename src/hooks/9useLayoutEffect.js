import React, {useState,useLayoutEffect,useEffect} from "react";
import ReactDOM from "react-dom";

/**
 * useLayOutEffect(): 同步执行副作用
 * 作用：
 *    大部分情况下，使用 useEffect 就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，useLayoutEffect 中的副作用会在 DOM 更新之后同步执行。与useEffect类似，只是执行时间不一样,与类组件的componentDidMount 和 componentDidUpdate生命周期执行时机一致
 * 区别：
 *  1. useLayoutEffect总是比useEffect先执行
 *  2. useEffect在全部渲染完毕后才会执行（先渲染，后改变DOM），当改变屏幕内容时可能会产生闪烁
 *  3. useLayoutEffect是会在浏览器 layout之后，painting 之前执行（会推迟页面显示的事件，先改变DOM后渲染），不会产生闪烁
 * 注意：
 *   为了用户体验，优先使用useEffect。以避免阻塞视图更新，但如果涉及到同步调用一些副作用，比如操作dom，可以放在useLayoutEffect中
 */


 function App() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    // 会在render，dom更新之后就执行，不会等到渲染完
    const title = document.querySelector("#title");
    const titleWidth = title.getBoundingClientRect().width;
    console.log("useLayoutEffect"); // 先打印
    if (width !== titleWidth) {
      setWidth(titleWidth);
    }
  });
  useEffect(() => {
    //dom渲染完毕后执行
    console.log("useEffect");
  });
  return (
    <div>
      <h1 id="title">hello</h1>
      <h2>{width}</h2>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'))