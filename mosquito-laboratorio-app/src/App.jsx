import Routing from './router/router'
import 'rsuite/dist/rsuite.min.css'
import { Provider } from 'react-redux'
import store from './redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  )
}
