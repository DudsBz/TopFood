import { useState } from 'react'
import Login from '.pages/Login'
import Cadastro from './pages/Cadastro'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Carrinho from './pages/Carrinho'
import Pedidos from './pages/Pedidos'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/home' element={<Home />} />
        <Route path='/carrinho' element={<Carrinho />} />
        <Route path='/pedidos' element={<Pedidos />} />
      </Routes>

    </BrowserRouter>
  )
}  

export default App
