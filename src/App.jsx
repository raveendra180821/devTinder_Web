import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from "./Body"

function App() {

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<div>login page</div>} />
            <Route path='/profile' element={<div>Profile page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
