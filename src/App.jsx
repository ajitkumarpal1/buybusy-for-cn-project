import { useState } from 'react'
import { AppRout } from './component/routeHandlur/mainRoute'
import { Provider } from 'react-redux'
import { store } from './redux/store'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={store}>
      <AppRout />
    </Provider>
    </>
  )
}

export default App
