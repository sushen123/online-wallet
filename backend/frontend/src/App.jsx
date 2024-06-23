import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './component/Header'
import { Description } from './component/Description'
import { Input } from './component/Input'
import { Button } from './component/Button'
import { WarningButton } from './component/WarningButton'
import { Singup } from './pages/signup'
import { Signin } from './pages/signin'

import { Balance } from './component/Balance'

import { Users } from './component/Users'
import { Dashboard } from './pages/dashboad'
import { Send } from './pages/send'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Statement } from './pages/statement'
import { Profile } from './pages/profile'
import { TransactionSuccess } from './pages/transfersuccess'


function App() {
  

  return (
    <Router>
    <Routes>
    <Route path='/' element={<Singup />} />
    <Route path='/send' element={<Send />} />
    <Route path='/signin' element={<Signin />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/statement' element={<Statement />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/success' element={<TransactionSuccess />} />
    </Routes>
     
    
    </Router>

    
  )
}

export default App
