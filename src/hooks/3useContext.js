import React, { useContext, useState }  from "react";
import ReactDOM from 'react-dom';
/**
 * useContext: 是类组件的的context的的hooks版，主要用于在父组件中公共数据和逻辑的抽离，方便子组件公用。
 */
// 1. 创建Context对象
const ThemeContext = React.createContext()
// 2. Provider 组件，发布数据，向所有的子组件提供数据
const App = props => {
  const [theme,setTheme] = useState('green')
  return (
    // Provider 发送数据，两个属性，用对象的形式
    <ThemeContext.Provider value={{theme,setTheme}}>
      <div>
        <Toolbar />
      </div>
    </ThemeContext.Provider>
  )
}
// 中间组件
const Toolbar = props => {
  return (
      <div>
          <ThemedButton />
      </div>
  )
}
// 3. 子孙组件使用useContext 接收收据
const ThemedButton = (props) => {
  // useContext接收顶层组件传递过来的context数据， 传递过来是对象，就用对象结构接收
  const { theme,setTheme }= useContext(ThemeContext)
  return (
    <div>
      {/* 可以直接使用接收到的数据和方法 */}
      <div style={{ 'color': theme }}>Theme: {theme}</div>
      <button onClick={() => setTheme('red')}>切换主题</button>
    </div>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);