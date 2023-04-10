// les routes vers les pages de l'app
import { Routes, Route } from 'react-router-dom'
// les pages
import Home from './pages/Home'
import Register from './pages/Register'
import LogIn from './pages/LogIn'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/inscription' element={<Register />} />
        <Route path='/connexion' element={<LogIn />} />
      </Routes>
    </>
  )
}
