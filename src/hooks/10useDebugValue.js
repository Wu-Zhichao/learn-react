import React, { useDebugValue, useState,useEffect } from "react";
import ReactDOM from "react-dom";
/**
 * useDebugValue():
 * 作用： 在自定义hooks中使用向开发者工具输出一个调试值，方便我们调试
 */

 function useFriendStatus() {
   const [isOnline, setIsOnline] = useState(true);
   useEffect(() => {
     const interval = setInterval(() => {
       setIsOnline(isOnline => !isOnline);
     }, 1000);
     return () => clearInterval(interval);
   }, []);
   // 在React Developer Tools中hooks一栏显示：
   // e.g. "FriendStatus: Online"
   useDebugValue(isOnline ? "Online" : "Offline");
   return isOnline;
 }
function App() {
   const isOnline = useFriendStatus();
   useDebugValue(isOnline ? "Online" : "Offline");
   return <div className="App">用户: {isOnline ? '在线' : '离线'}</div>;
 }
ReactDOM.render(<App/>,document.getElementById('root') )