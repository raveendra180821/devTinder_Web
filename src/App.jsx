import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Provider} from "react-redux"
import Body from "./components/Body"
import Login from './components/Login'
import appStore from './utils/appStore'

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<div>feed</div>} />
              <Route path="/login" element={<Login />} />
              <Route path='/profile' element={<div>Profile page</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App