import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MainPage from './Pages/MainPage/MainPage.jsx'
import Cadastro from './Pages/Cadastro/Cadastro.jsx'
import Interesses from './Pages/Interesses/Interesses.jsx'
import CarteirinhaPage from './Pages/CarteirinhaPage/CarteirinhaPage.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="/interesses" element={<Interesses />} />
        <Route path="/carteirinha" element={<CarteirinhaPage />} />
      </Routes>
    </Router>
  )
}

export default App
