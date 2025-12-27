import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainSort from './Sorting/MainSSort'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSort />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
